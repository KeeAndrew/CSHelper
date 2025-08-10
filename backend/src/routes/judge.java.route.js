import express from "express";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { exec } from "child_process";

const router = express.Router();

/**
 * POST /api/judge-java/run
 * body: { code:string, functionName:string, tests:[{input, expected}] }
 * Assumes user defines:
 *   public class Solution { public static <ret> functionName(<params>) { ... } }
 * Returns: { results:[{input, expected, output, pass, error}], passed, total }
 */
router.post("/run", async (req, res) => {
    const { code, functionName, tests } = req.body || {};
    if (!code || !functionName || !Array.isArray(tests)) {
        return res.status(400).json({ message: "Invalid payload" });
    }

    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "judge-java-"));
    try {
        // Build Main.java to reflectively call Solution.functionName on each test
        const mainSrc = buildMainJava(functionName, tests);
        await fs.writeFile(path.join(tmp, "Solution.java"), code, "utf8");
        await fs.writeFile(path.join(tmp, "Main.java"), mainSrc, "utf8");

        const compile = await run(`javac Main.java Solution.java`, tmp);
        if (compile.status !== 0) {
            return res.status(200).json({ results: [], passed: 0, total: 0, compileError: compile.stderr || compile.stdout });
        }

        const runOut = await run(`java Main`, tmp);
        if (runOut.status !== 0) {
            return res.status(200).json({ results: [], passed: 0, total: 0, runtimeError: runOut.stderr || runOut.stdout });
        }

        try {
            const data = JSON.parse(runOut.stdout.trim());
            return res.json(data);
        } catch {
            return res.status(200).json({ results: [], passed: 0, total: 0, runtimeError: "Runner did not return JSON" });
        }
    } catch (e) {
        return res.status(500).json({ message: String(e?.message || e) });
    } finally {
        try { await fs.rm(tmp, { recursive: true, force: true }); } catch { }
    }
});

function run(cmd, cwd) {
    return new Promise((resolve) => {
        exec(cmd, { cwd, timeout: 7000 }, (err, stdout, stderr) => {
            if (err) return resolve({ status: err.code || 1, stdout, stderr });
            resolve({ status: 0, stdout, stderr });
        });
    });
}

function buildMainJava(functionName, tests) {
    const testsJava = tests.map(t => `new Test(${JSON.stringify(t.input)}, ${JSON.stringify(t.expected)})`).join(",\n      ");

    return `
import java.util.*;

public class Main {
  static class Test { String input; String expected; Test(String i, String e){input=i; expected=e;} }

  public static void main(String[] args) throws Exception {
    List<Test> tests = Arrays.asList(
      ${testsJava}
    );
    List<Map<String,Object>> results = new ArrayList<>();
    int passed = 0;

    for (Test t : tests) {
      Object in = Parser.parse(t.input);
      Object exp = Parser.parse(t.expected);
      Map<String,Object> row = new LinkedHashMap<>();
      row.put("input", in);
      row.put("expected", exp);

      try {
        Object out;
        if (in instanceof List) {
          List<?> L = (List<?>) in;
          Object[] argv = new Object[L.size()];
          for (int i=0;i<L.size();i++) argv[i] = L.get(i);
          out = Invoker.call("${functionName}", argv);
        } else {
          out = Invoker.call("${functionName}", new Object[]{ in });
        }
        row.put("output", Json.jsonable(out));
        boolean ok = Deep.eq(row.get("output"), exp);
        row.put("pass", ok);
        row.put("error", null);
        if (ok) passed++;
      } catch (Throwable e) {
        row.put("output", null);
        row.put("pass", false);
        row.put("error", e.getMessage());
      }
      results.add(row);
    }
    Map<String,Object> all = new LinkedHashMap<>();
    all.put("results", results);
    all.put("passed", passed);
    all.put("total", tests.size());
    System.out.println(Json.stringify(all));
  }
}

/* Reflection: call Solution.<functionName>(...) */
class Invoker {
  static Object call(String name, Object[] args) throws Exception {
    Class<?> S = Class.forName("Solution");
    for (java.lang.reflect.Method m : S.getDeclaredMethods()) {
      if (!java.lang.reflect.Modifier.isStatic(m.getModifiers())) continue;
      if (!m.getName().equals(name)) continue;
      if (m.getParameterCount() != args.length) continue;
      Object[] conv = convert(m.getParameterTypes(), args);
      if (conv != null) return m.invoke(null, conv);
    }
    throw new NoSuchMethodException("No suitable method for given args");
  }

  static Object[] convert(Class<?>[] ps, Object[] args) {
    Object[] out = new Object[args.length];
    try {
      for (int i=0;i<args.length;i++) {
        Object a = args[i];
        Class<?> p = ps[i];
        if (p == int[].class && a instanceof List) {
          List<?> L = (List<?>) a; int[] v = new int[L.size()];
          for (int k=0;k<L.size();k++) v[k] = ((Number)L.get(k)).intValue();
          out[i] = v; continue;
        }
        if ((p == int.class || p == Integer.class) && a instanceof Number) {
          out[i] = ((Number)a).intValue(); continue;
        }
        if (p == String.class && a instanceof String) { out[i] = a; continue; }
        if (p == boolean.class || p == Boolean.class) { out[i] = (Boolean)a; continue; }
        return null; // unsupported type combo
      }
      return out;
    } catch (Exception e) { return null; }
  }
}

/* Minimal parser for numbers/strings/arrays */
class Parser {
  static Object parse(String s){ s=s.trim();
    if (s.startsWith("[")) return arr(s);
    if (s.startsWith("\\"")) return str(s);
    if (s.equals("true")||s.equals("false")) return Boolean.valueOf(s);
    return Integer.valueOf(s);
  }
  static String str(String s){ return s.substring(1, s.length()-1); }
  static List<Object> arr(String s){
    List<Object> L=new ArrayList<>();
    int i=1, depth=0; StringBuilder cur=new StringBuilder();
    while(i<s.length()){
      char c=s.charAt(i);
      if (c=='[') depth++;
      if (c==']' && depth==0){ if (cur.toString().trim().length()>0) L.add(parse(cur.toString().trim())); break; }
      if (c==']') depth--;
      if (c==',' && depth==0){ L.add(parse(cur.toString().trim())); cur.setLength(0); i++; continue; }
      cur.append(c); i++;
    }
    return L;
  }
}

/* JSON helpers */
class Json {
  static Object jsonable(Object x){
    if (x == null) return null;
    if (x instanceof int[]) { int[] a=(int[])x; List<Object> L=new ArrayList<>(); for(int v:a)L.add(v); return L; }
    if (x instanceof Object[]) return Arrays.asList((Object[])x);
    return x;
  }
  static String stringify(Object o){
    if (o==null) return "null";
    if (o instanceof String) return q((String)o);
    if (o instanceof Number || o instanceof Boolean) return String.valueOf(o);
    if (o instanceof Map){
      StringBuilder sb=new StringBuilder(); sb.append("{"); boolean first=true;
      for (Object k: ((Map<?,?>)o).keySet()){
        if(!first) sb.append(","); first=false;
        sb.append(q(k.toString())).append(":").append(stringify(((Map<?,?>)o).get(k)));
      }
      sb.append("}"); return sb.toString();
    }
    if (o instanceof Iterable){
      StringBuilder sb=new StringBuilder(); sb.append("["); boolean first=true;
      for (Object v: (Iterable<?>)o){
        if(!first) sb.append(","); first=false; sb.append(stringify(v));
      }
      sb.append("]"); return sb.toString();
    }
    return q(o.toString());
  }
  static String q(String s){ return "\\""+s.replace("\\\\","\\\\\\\\").replace("\\"","\\\\\\"")+"\\""; }
}

/* Deep equality via JSON stringification */
class Deep {
  static boolean eq(Object a, Object b){ return Json.stringify(a).equals(Json.stringify(b)); }
}
`;
}

export default router;
