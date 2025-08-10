import express from "express";
import { VM } from "vm2";

const router = express.Router();

/**
 * POST /api/judge/run
 * body: { code:string, functionName:string, tests:[{input:string, expected:string}] }
 * returns: { results:[{input, expected, output, pass, error}], passed, total }
 */
router.post("/run", async (req, res) => {
    try {
        const { code, functionName, tests } = req.body;
        if (!code || !functionName || !Array.isArray(tests)) {
            return res.status(400).json({ message: "Invalid payload" });
        }

        // normalize tests: "input" may be "a,b" or JSON; convert to real JS values
        const parsedTests = tests.map(t => {
            // Accept either JSON (e.g. "[1,2]") or a CSV-ish of JSON chunks (e.g. "[2,7,11,15], 9")
            const tuple = splitArgs(t.input).map(s => JSON.parse(s));
            const expected = JSON.parse(t.expected);
            return { input: tuple.length === 1 ? tuple[0] : tuple, expected };
        });

        // build runner script (executed inside VM)
        const script = `
${code}
const __fn = typeof ${functionName} !== "undefined" ? ${functionName} : null;
if (!__fn) throw new Error("Function ${functionName} not found.");

function deepEqual(a,b){ try { return JSON.stringify(a) === JSON.stringify(b); } catch(e){ return false; } }

const __tests = ${JSON.stringify(parsedTests)};
const __results = [];
for (const t of __tests){
  let output, pass=false, error=null;
  try{
    output = Array.isArray(t.input) ? __fn(...t.input) : __fn(t.input);
    pass = deepEqual(output, t.expected);
  }catch(e){ error = String(e && e.message || e); }
  __results.push({ input:t.input, expected:t.expected, output, pass, error });
}
__results;
`;

        const vm = new VM({
            timeout: 1000, // ms
            eval: false,
            wasm: false,
            sandbox: {}    // no globals added
        });

        const results = vm.run(script);
        const passed = results.filter(r => r.pass).length;
        res.json({ results, passed, total: results.length });
    } catch (e) {
        res.status(500).json({ message: String(e && e.message || e) });
    }
});

// helper: split " [2,7,11,15], 9 " → ["[2,7,11,15]","9"] by top-level commas
function splitArgs(s) {
    let out = [], cur = "", depth = 0;
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === "[" || ch === "{") depth++;
        if (ch === "]" || ch === "}") depth--;
        if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; continue; }
        cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
}

export default router;
