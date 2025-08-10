// backend/src/lib/seedProblems.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Problem from "../models/problem.model.js";

async function main() {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!uri) throw new Error("Missing MONGODB_URI / MONGO_URI");

        console.log("ℹ️  Connecting to Mongo…");
        await mongoose.connect(uri);
        console.log("✅ Connected");

        // -------------------------
        // 20 EASY PROBLEMS (multi-language variants + thorough tests)
        // Each problem has: title, description, level, examples[], tests[], variants[]
        // variants[].lang ∈ {"javascript","python","java"}
        // tests use JSON strings for input/expected; for multiple args, input is a JSON array of args
        // -------------------------
        let data = [
            {
                title: "Two Sum",
                description:
                    "Return indices of two distinct numbers in nums that add up to target. Exactly one solution; cannot reuse the same element.",
                level: "easy",
                examples: [
                    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "2 + 7 = 9" },
                    { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "2 + 4 = 6" },
                ],
                tests: [
                    { input: "[[2,7,11,15], 9]", expected: "[0,1]" },
                    { input: "[[3,2,4], 6]", expected: "[1,2]" },
                    { input: "[[3,3], 6]", expected: "[0,1]" },
                    { input: "[[0,4,3,0], 0]", expected: "[0,3]" },
                    { input: "[[-3,4,3,90], 0]", expected: "[0,2]" },
                    { input: "[[1,4,3,2], 6]", expected: "[1,3]" },
                    { input: "[[1,9], 10]", expected: "[0,1]" },
                    { input: "[[2,2,5,5], 7]", expected: "[1,2]" },
                    { input: "[[10,15,3,7,8,19,20,2,1], 21]", expected: "[0,3]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "twoSum",
                        starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // TODO: implement
}
`,
                        optimalSolution: `/**
 * Hash map – O(n) time, O(n) space.
 */
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "python",
                        functionName: "twoSum",
                        starterCode: `# @param nums: List[int]
# @param target: int
# @return List[int]
def twoSum(nums, target):
    # TODO: implement
    pass
`,
                        optimalSolution: `# Hash map – O(n) time, O(n) space.
def twoSum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i
    return []
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "java",
                        functionName: "twoSum",
                        starterCode: `// @param nums: int[]
// @param target: int
// @return int[]
public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // TODO: implement
        return new int[0];
    }
}
`,
                        optimalSolution: `public class Solution {
    // Hash map – O(n) time, O(n) space.
    public static int[] twoSum(int[] nums, int target) {
        java.util.Map<Integer, Integer> seen = new java.util.HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) return new int[]{seen.get(need), i};
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                ],
            },

            {
                title: "Contains Duplicate",
                description: "Return true if any value appears at least twice; otherwise false.",
                level: "easy",
                examples: [
                    { input: "nums = [1,2,3,1]", output: "true", explanation: "1 repeats" },
                    { input: "nums = [1,2,3,4]", output: "false", explanation: "all distinct" },
                ],
                tests: [
                    { input: "[[1,2,3,1]]", expected: "true" },
                    { input: "[[1,2,3,4]]", expected: "false" },
                    { input: "[[1,1,1,3,3,4,3,2,4,2]]", expected: "true" },
                    { input: "[[10]]", expected: "false" },
                    { input: "[[0,0,0]]", expected: "true" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "containsDuplicate",
                        starterCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  // TODO: implement
}
`,
                        optimalSolution: `function containsDuplicate(nums){
  const s = new Set(nums);
  return s.size !== nums.length;
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "python",
                        functionName: "containsDuplicate",
                        starterCode: `# @param nums: List[int]
# @return bool
def containsDuplicate(nums):
    # TODO: implement
    pass
`,
                        optimalSolution: `def containsDuplicate(nums):
    return len(set(nums)) != len(nums)
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "java",
                        functionName: "containsDuplicate",
                        starterCode: `public class Solution {
    public static boolean containsDuplicate(int[] nums){
        // TODO: implement
        return false;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static boolean containsDuplicate(int[] nums){
        java.util.HashSet<Integer> s = new java.util.HashSet<>();
        for (int x: nums) if (!s.add(x)) return true;
        return false;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                ],
            },

            {
                title: "Valid Anagram",
                description: "Return true if t is an anagram of s.",
                level: "easy",
                examples: [
                    { input: 's = "anagram", t = "nagaram"', output: "true", explanation: "" },
                    { input: 's = "rat", t = "car"', output: "false", explanation: "" },
                ],
                tests: [
                    { input: '["anagram","nagaram"]', expected: "true" },
                    { input: '["rat","car"]', expected: "false" },
                    { input: '["aacc","ccac"]', expected: "false" },
                    { input: '["ab","ba"]', expected: "true" },
                    { input: '["",""]', expected: "true" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "isAnagram",
                        starterCode: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
  // TODO: implement
}
`,
                        optimalSolution: `function isAnagram(s,t){
  if (s.length !== t.length) return false;
  const m = new Map();
  for (const ch of s) m.set(ch,(m.get(ch)||0)+1);
  for (const ch of t){
    const left=(m.get(ch)||0)-1;
    if (left<0) return false;
    if (left===0) m.delete(ch); else m.set(ch,left);
  }
  return m.size===0;
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "python",
                        functionName: "isAnagram",
                        starterCode: `# @param s: str
# @param t: str
# @return bool
def isAnagram(s, t):
    # TODO: implement
    pass
`,
                        optimalSolution: `def isAnagram(s,t):
    if len(s)!=len(t): return False
    from collections import Counter
    return Counter(s)==Counter(t)
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "java",
                        functionName: "isAnagram",
                        starterCode: `public class Solution {
    public static boolean isAnagram(String s, String t) {
        // TODO: implement
        return false;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static boolean isAnagram(String s, String t){
        if (s.length()!=t.length()) return false;
        int[] cnt = new int[52];
        for (char c: s.toCharArray()) idx(cnt,c,1);
        for (char c: t.toCharArray()) idx(cnt,c,-1);
        for (int v: cnt) if (v!=0) return false;
        return true;
    }
    private static void idx(int[] cnt, char c, int d){
        if (c>='a'&&c<='z') cnt[c-'a']+=d;
        else if (c>='A'&&c<='Z') cnt[26+(c-'A')]+=d;
        else { /* non-letters ignored here */ }
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1) for letters" },
                    },
                ],
            },

            {
                title: "Valid Palindrome",
                description:
                    "Return true if s is a palindrome considering only alphanumeric characters and ignoring case.",
                level: "easy",
                examples: [
                    { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: "" },
                    { input: 's = "race a car"', output: "false", explanation: "" },
                ],
                tests: [
                    { input: '["A man, a plan, a canal: Panama"]', expected: "true" },
                    { input: '["race a car"]', expected: "false" },
                    { input: '[" "]', expected: "true" },
                    { input: '["abba"]', expected: "true" },
                    { input: '["abc"]', expected: "false" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "isPalindrome",
                        starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // TODO: implement
}
`,
                        optimalSolution: `function isPalindrome(s){
  const t = s.toLowerCase().replace(/[^a-z0-9]/g,'');
  let i=0,j=t.length-1;
  while(i<j){ if(t[i]!==t[j]) return false; i++; j--; }
  return true;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "isPalindrome",
                        starterCode: `# @param s: str
# @return bool
def isPalindrome(s):
    # TODO: implement
    pass
`,
                        optimalSolution: `def isPalindrome(s):
    import re
    t = re.sub(r'[^a-z0-9]', '', s.lower())
    return t == t[::-1]
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "java",
                        functionName: "isPalindrome",
                        starterCode: `public class Solution {
    public static boolean isPalindrome(String s){
        // TODO: implement
        return false;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static boolean isPalindrome(String s){
        int i=0, j=s.length()-1;
        while(i<j){
            char a=s.charAt(i), b=s.charAt(j);
            if (!Character.isLetterOrDigit(a)){ i++; continue; }
            if (!Character.isLetterOrDigit(b)){ j--; continue; }
            if (Character.toLowerCase(a)!=Character.toLowerCase(b)) return false;
            i++; j--;
        }
        return true;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Merge Two Sorted Arrays",
                description:
                    "Given two sorted arrays nums1 and nums2, return a single sorted array containing all elements.",
                level: "easy",
                examples: [
                    { input: "nums1 = [1,2,3], nums2 = [2,5,6]", output: "[1,2,2,3,5,6]", explanation: "" },
                    { input: "nums1 = [], nums2 = [1]", output: "[1]", explanation: "" },
                ],
                tests: [
                    { input: "[[1,2,3],[2,5,6]]", expected: "[1,2,2,3,5,6]" },
                    { input: "[[],[1]]", expected: "[1]" },
                    { input: "[[1],[1]]", expected: "[1,1]" },
                    { input: "[[0,0,0],[1,2]]", expected: "[0,0,0,1,2]" },
                    { input: "[[2,4,6],[1,3,5,7]]", expected: "[1,2,3,4,5,6,7]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "mergeSortedArrays",
                        starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function mergeSortedArrays(nums1, nums2) {
  // TODO: implement
}
`,
                        optimalSolution: `function mergeSortedArrays(a,b){
  const res=[]; let i=0,j=0;
  while(i<a.length&&j<b.length){
    if(a[i]<=b[j]) res.push(a[i++]); else res.push(b[j++]);
  }
  while(i<a.length) res.push(a[i++]);
  while(j<b.length) res.push(b[j++]);
  return res;
}
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                    {
                        lang: "python",
                        functionName: "mergeSortedArrays",
                        starterCode: `# @param nums1: List[int]
# @param nums2: List[int]
# @return List[int]
def mergeSortedArrays(nums1, nums2):
    # TODO: implement
    pass
`,
                        optimalSolution: `def mergeSortedArrays(a,b):
    i=j=0; res=[]
    while i<len(a) and j<len(b):
        if a[i]<=b[j]:
            res.append(a[i]); i+=1
        else:
            res.append(b[j]); j+=1
    res.extend(a[i:]); res.extend(b[j:])
    return res
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                    {
                        lang: "java",
                        functionName: "mergeSortedArrays",
                        starterCode: `public class Solution {
    public static int[] mergeSortedArrays(int[] nums1, int[] nums2){
        // TODO: implement
        return new int[0];
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int[] mergeSortedArrays(int[] a, int[] b){
        int i=0,j=0,k=0; int[] res = new int[a.length+b.length];
        while(i<a.length && j<b.length){
            if(a[i]<=b[j]) res[k++]=a[i++]; else res[k++]=b[j++];
        }
        while(i<a.length) res[k++]=a[i++];
        while(j<b.length) res[k++]=b[j++];
        return res;
    }
}
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                ],
            },

            {
                title: "Maximum Subarray",
                description: "Find the contiguous subarray with the largest sum; return the sum.",
                level: "easy",
                examples: [
                    {
                        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
                        output: "6",
                        explanation: "[4,-1,2,1] has sum 6",
                    },
                    { input: "nums = [1]", output: "1", explanation: "" },
                ],
                tests: [
                    { input: "[[-2,1,-3,4,-1,2,1,-5,4]]", expected: "6" },
                    { input: "[[1]]", expected: "1" },
                    { input: "[[5,4,-1,7,8]]", expected: "23" },
                    { input: "[[-1,-2,-3]]", expected: "-1" },
                    { input: "[[0,0,0]]", expected: "0" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "maxSubArray",
                        starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // TODO: implement
}
`,
                        optimalSolution: `function maxSubArray(nums){
  let best=nums[0], cur=nums[0];
  for(let i=1;i<nums.length;i++){
    cur = Math.max(nums[i], cur+nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "maxSubArray",
                        starterCode: `# @param nums: List[int]
# @return int
def maxSubArray(nums):
    # TODO: implement
    pass
`,
                        optimalSolution: `def maxSubArray(nums):
    best=cur=nums[0]
    for x in nums[1:]:
        cur=max(x,cur+x); best=max(best,cur)
    return best
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "maxSubArray",
                        starterCode: `public class Solution {
    public static int maxSubArray(int[] nums){
        // TODO: implement
        return 0;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int maxSubArray(int[] nums){
        int best=nums[0], cur=nums[0];
        for (int i=1;i<nums.length;i++){
            cur = Math.max(nums[i], cur+nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Move Zeroes",
                description:
                    "Move all zeroes to the end of the array while maintaining the relative order of non-zero elements. Return the array.",
                level: "easy",
                examples: [
                    { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]", explanation: "" },
                    { input: "nums = [0]", output: "[0]", explanation: "" },
                ],
                tests: [
                    { input: "[[0,1,0,3,12]]", expected: "[1,3,12,0,0]" },
                    { input: "[[0]]", expected: "[0]" },
                    { input: "[[1,2,3]]", expected: "[1,2,3]" },
                    { input: "[[0,0,1]]", expected: "[1,0,0]" },
                    { input: "[[4,2,4,0,0,3,0,5,1,0]]", expected: "[4,2,4,3,5,1,0,0,0,0]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "moveZeroes",
                        starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function moveZeroes(nums) {
  // TODO: implement
}
`,
                        optimalSolution: `function moveZeroes(nums){
  let insert=0;
  for (const x of nums) if (x!==0) nums[insert++]=x;
  while(insert<nums.length) nums[insert++]=0;
  return nums;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "moveZeroes",
                        starterCode: `# @param nums: List[int]
# @return List[int]
def moveZeroes(nums):
    # TODO: implement
    pass
`,
                        optimalSolution: `def moveZeroes(nums):
    insert=0
    for x in nums:
      if x!=0:
        nums[insert]=x; insert+=1
    while insert<len(nums):
      nums[insert]=0; insert+=1
    return nums
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "moveZeroes",
                        starterCode: `public class Solution {
    public static int[] moveZeroes(int[] nums){
        // TODO: implement
        return nums;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int[] moveZeroes(int[] nums){
        int insert=0;
        for (int x: nums) if (x!=0) nums[insert++]=x;
        while(insert<nums.length) nums[insert++]=0;
        return nums;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Intersection of Two Arrays",
                description: "Return the unique intersection of two arrays as a sorted array.",
                level: "easy",
                examples: [
                    { input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2]", explanation: "" },
                    { input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", output: "[4,9]", explanation: "" },
                ],
                tests: [
                    { input: "[[1,2,2,1],[2,2]]", expected: "[2]" },
                    { input: "[[4,9,5],[9,4,9,8,4]]", expected: "[4,9]" },
                    { input: "[[1,1,1],[1,1]]", expected: "[1]" },
                    { input: "[[1,2,3],[4,5,6]]", expected: "[]" },
                    { input: "[[2,2],[2]]", expected: "[2]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "intersectionUnique",
                        starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersectionUnique(nums1, nums2) {
  // TODO: implement
}
`,
                        optimalSolution: `function intersectionUnique(a,b){
  const s1=new Set(a), s2=new Set(b);
  const res=[]; for(const x of s1) if (s2.has(x)) res.push(x);
  res.sort((x,y)=>x-y);
  return res;
}
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                    {
                        lang: "python",
                        functionName: "intersectionUnique",
                        starterCode: `# @param nums1: List[int]
# @param nums2: List[int]
# @return List[int]
def intersectionUnique(nums1, nums2):
    # TODO: implement
    pass
`,
                        optimalSolution: `def intersectionUnique(a,b):
    res=sorted(set(a).intersection(set(b)))
    return list(res)
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                    {
                        lang: "java",
                        functionName: "intersectionUnique",
                        starterCode: `public class Solution {
    public static int[] intersectionUnique(int[] nums1, int[] nums2){
        // TODO: implement
        return new int[0];
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int[] intersectionUnique(int[] a, int[] b){
        java.util.HashSet<Integer> s1=new java.util.HashSet<>(), s2=new java.util.HashSet<>();
        for (int x: a) s1.add(x); for (int y: b) s2.add(y);
        java.util.ArrayList<Integer> out=new java.util.ArrayList<>();
        for (int x: s1) if (s2.contains(x)) out.add(x);
        java.util.Collections.sort(out);
        int[] res=new int[out.size()];
        for(int i=0;i<out.size();i++) res[i]=out.get(i);
        return res;
    }
}
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                ],
            },

            {
                title: "Plus One",
                description: "Given an array of digits representing a non-negative integer, add one.",
                level: "easy",
                examples: [
                    { input: "digits = [1,2,3]", output: "[1,2,4]", explanation: "" },
                    { input: "digits = [9]", output: "[1,0]", explanation: "" },
                ],
                tests: [
                    { input: "[[1,2,3]]", expected: "[1,2,4]" },
                    { input: "[[4,3,2,1]]", expected: "[4,3,2,2]" },
                    { input: "[[9]]", expected: "[1,0]" },
                    { input: "[[9,9]]", expected: "[1,0,0]" },
                    { input: "[[0]]", expected: "[1]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "plusOne",
                        starterCode: `/**
 * @param {number[]} digits
 * @return {number[]}
 */
function plusOne(digits) {
  // TODO: implement
}
`,
                        optimalSolution: `function plusOne(d){
  for(let i=d.length-1;i>=0;i--){
    if(d[i]<9){ d[i]++; return d; }
    d[i]=0;
  }
  d.unshift(1); return d;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "plusOne",
                        starterCode: `# @param digits: List[int]
# @return List[int]
def plusOne(digits):
    # TODO: implement
    pass
`,
                        optimalSolution: `def plusOne(d):
    for i in range(len(d)-1,-1,-1):
        if d[i]<9:
            d[i]+=1; return d
        d[i]=0
    return [1]+d
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "plusOne",
                        starterCode: `public class Solution {
    public static int[] plusOne(int[] digits){
        // TODO: implement
        return digits;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int[] plusOne(int[] d){
        for(int i=d.length-1;i>=0;i--){
            if (d[i]<9){ d[i]++; return d; }
            d[i]=0;
        }
        int[] res=new int[d.length+1]; res[0]=1; return res;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Isomorphic Strings",
                description: "Determine if two strings s and t are isomorphic.",
                level: "easy",
                examples: [
                    { input: 's = "egg", t = "add"', output: "true", explanation: "" },
                    { input: 's = "foo", t = "bar"', output: "false", explanation: "" },
                ],
                tests: [
                    { input: '["egg","add"]', expected: "true" },
                    { input: '["foo","bar"]', expected: "false" },
                    { input: '["paper","title"]', expected: "true" },
                    { input: '["ab","aa"]', expected: "false" },
                    { input: '["a","a"]', expected: "true" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "isIsomorphic",
                        starterCode: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isIsomorphic(s, t) {
  // TODO: implement
}
`,
                        optimalSolution: `function isIsomorphic(s,t){
  if (s.length!==t.length) return false;
  const m1=new Map(), m2=new Map();
  for(let i=0;i<s.length;i++){
    const a=s[i], b=t[i];
    if ((m1.has(a)&&m1.get(a)!==b) || (m2.has(b)&&m2.get(b)!==a)) return false;
    m1.set(a,b); m2.set(b,a);
  }
  return true;
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "python",
                        functionName: "isIsomorphic",
                        starterCode: `# @param s: str
# @param t: str
# @return bool
def isIsomorphic(s, t):
    # TODO: implement
    pass
`,
                        optimalSolution: `def isIsomorphic(s,t):
    if len(s)!=len(t): return False
    m1, m2 = {}, {}
    for a,b in zip(s,t):
        if (a in m1 and m1[a]!=b) or (b in m2 and m2[b]!=a): return False
        m1[a]=b; m2[b]=a
    return True
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "java",
                        functionName: "isIsomorphic",
                        starterCode: `public class Solution {
    public static boolean isIsomorphic(String s, String t){
        // TODO: implement
        return false;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static boolean isIsomorphic(String s, String t){
        if (s.length()!=t.length()) return false;
        java.util.Map<Character,Character> m1=new java.util.HashMap<>(), m2=new java.util.HashMap<>();
        for(int i=0;i<s.length();i++){
            char a=s.charAt(i), b=t.charAt(i);
            if ((m1.containsKey(a)&&m1.get(a)!=b) || (m2.containsKey(b)&&m2.get(b)!=a)) return false;
            m1.put(a,b); m2.put(b,a);
        }
        return true;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                ],
            },

            {
                title: "Ransom Note",
                description: "Return true if ransomNote can be constructed from magazine letters.",
                level: "easy",
                examples: [
                    { input: 'ransomNote = "aa", magazine = "aab"', output: "true", explanation: "" },
                    { input: 'ransomNote = "aa", magazine = "ab"', output: "false", explanation: "" },
                ],
                tests: [
                    { input: '["aa","aab"]', expected: "true" },
                    { input: '["aa","ab"]', expected: "false" },
                    { input: '["","ab"]', expected: "true" },
                    { input: '["abc","abc"]', expected: "true" },
                    { input: '["abc","abd"]', expected: "false" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "canConstruct",
                        starterCode: `/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
function canConstruct(ransomNote, magazine) {
  // TODO: implement
}
`,
                        optimalSolution: `function canConstruct(ransomNote, magazine){
  const m=new Map();
  for(const ch of magazine) m.set(ch,(m.get(ch)||0)+1);
  for(const ch of ransomNote){
    const v=(m.get(ch)||0)-1; if (v<0) return false;
    if (v===0) m.delete(ch); else m.set(ch,v);
  }
  return true;
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "python",
                        functionName: "canConstruct",
                        starterCode: `# @param ransomNote: str
# @param magazine: str
# @return bool
def canConstruct(ransomNote, magazine):
    # TODO: implement
    pass
`,
                        optimalSolution: `def canConstruct(r, m):
    from collections import Counter
    need = Counter(r)
    have = Counter(m)
    for k,v in need.items():
        if have[k] < v: return False
    return True
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "java",
                        functionName: "canConstruct",
                        starterCode: `public class Solution {
    public static boolean canConstruct(String ransomNote, String magazine){
        // TODO: implement
        return false;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static boolean canConstruct(String ransomNote, String magazine){
        int[] cnt = new int[52];
        for(char c: magazine.toCharArray()) add(cnt,c);
        for(char c: ransomNote.toCharArray()) if(!use(cnt,c)) return false;
        return true;
    }
    static void add(int[] cnt, char c){
        if (c>='a'&&c<='z') cnt[c-'a']++;
        else if (c>='A'&&c<='Z') cnt[26+(c-'A')]++;
    }
    static boolean use(int[] cnt, char c){
        if (c>='a'&&c<='z'){ if(--cnt[c-'a']<0) return false; }
        else if (c>='A'&&c<='Z'){ if(--cnt[26+(c-'A')]<0) return false; }
        return true;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                ],
            },

            {
                title: "Palindrome Number",
                description: "Return true if x is a palindrome integer (negatives are not).",
                level: "easy",
                examples: [
                    { input: "x = 121", output: "true", explanation: "" },
                    { input: "x = -121", output: "false", explanation: "" },
                ],
                tests: [
                    { input: "[121]", expected: "true" },
                    { input: "[-121]", expected: "false" },
                    { input: "[10]", expected: "false" },
                    { input: "[0]", expected: "true" },
                    { input: "[1221]", expected: "true" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "isPalindromeNumber",
                        starterCode: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindromeNumber(x) {
  // TODO: implement
}
`,
                        optimalSolution: `function isPalindromeNumber(x){
  if (x<0) return false;
  let n=x, rev=0;
  while(n>0){ rev=rev*10+(n%10|0); n=(n/10|0); }
  return rev===x;
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "isPalindromeNumber",
                        starterCode: `# @param x: int
# @return bool
def isPalindromeNumber(x):
    # TODO: implement
    pass
`,
                        optimalSolution: `def isPalindromeNumber(x):
    if x<0: return False
    return str(x)==str(x)[::-1]
`,
                        complexity: { time: "O(d)", space: "O(d)" },
                    },
                    {
                        lang: "java",
                        functionName: "isPalindromeNumber",
                        starterCode: `public class Solution {
    public static boolean isPalindromeNumber(int x){
        // TODO: implement
        return false;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static boolean isPalindromeNumber(int x){
        if (x<0) return false;
        int n=x, rev=0;
        while(n>0){ rev = rev*10 + (n%10); n/=10; }
        return rev==x;
    }
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Fizz Buzz",
                description: "Return an array of strings from 1..n with Fizz/Buzz/FizzBuzz rules.",
                level: "easy",
                examples: [{ input: "n = 5", output: '["1","2","Fizz","4","Buzz"]', explanation: "" }],
                tests: [
                    { input: "[1]", expected: '["1"]' },
                    { input: "[3]", expected: '["1","2","Fizz"]' },
                    { input: "[5]", expected: '["1","2","Fizz","4","Buzz"]' },
                    {
                        input: "[15]",
                        expected:
                            '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]',
                    },
                    { input: "[2]", expected: '["1","2"]' },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "fizzBuzz",
                        starterCode: `/**
 * @param {number} n
 * @return {string[]}
 */
function fizzBuzz(n) {
  // TODO: implement
}
`,
                        optimalSolution: `function fizzBuzz(n){
  const res=[];
  for(let i=1;i<=n;i++){
    let s=''; if(i%3===0) s+='Fizz'; if(i%5===0) s+='Buzz';
    res.push(s||String(i));
  }
  return res;
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "python",
                        functionName: "fizzBuzz",
                        starterCode: `# @param n: int
# @return List[str]
def fizzBuzz(n):
    # TODO: implement
    pass
`,
                        optimalSolution: `def fizzBuzz(n):
    res=[]
    for i in range(1,n+1):
        s=('Fizz' if i%3==0 else '') + ('Buzz' if i%5==0 else '')
        res.append(s or str(i))
    return res
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "java",
                        functionName: "fizzBuzz",
                        starterCode: `public class Solution {
    public static String[] fizzBuzz(int n){
        // TODO: implement
        return new String[0];
    }
}
`,
                        optimalSolution: `public class Solution {
    public static String[] fizzBuzz(int n){
        String[] res=new String[n];
        for(int i=1;i<=n;i++){
            String s="";
            if (i%3==0) s+="Fizz";
            if (i%5==0) s+="Buzz";
            res[i-1]= s.isEmpty()? String.valueOf(i): s;
        }
        return res;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                ],
            },

            {
                title: "Climbing Stairs",
                description: "You can climb 1 or 2 steps. How many distinct ways to reach step n?",
                level: "easy",
                examples: [
                    { input: "n = 2", output: "2", explanation: "1+1, 2" },
                    { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" },
                ],
                tests: [
                    { input: "[2]", expected: "2" },
                    { input: "[3]", expected: "3" },
                    { input: "[1]", expected: "1" },
                    { input: "[5]", expected: "8" },
                    { input: "[10]", expected: "89" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "climbStairs",
                        starterCode: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // TODO: implement
}
`,
                        optimalSolution: `function climbStairs(n){
  let a=1,b=1;
  for(let i=2;i<=n;i++){ const c=a+b; a=b; b=c; }
  return b;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "climbStairs",
                        starterCode: `# @param n: int
# @return int
def climbStairs(n):
    # TODO: implement
    pass
`,
                        optimalSolution: `def climbStairs(n):
    a=b=1
    for _ in range(2,n+1):
        a,b=b,a+b
    return b
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "climbStairs",
                        starterCode: `public class Solution {
    public static int climbStairs(int n){
        // TODO: implement
        return 1;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int climbStairs(int n){
        int a=1,b=1;
        for (int i=2;i<=n;i++){ int c=a+b; a=b; b=c; }
        return b;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Binary Search",
                description: "Given sorted array and target, return its index or -1 if not found.",
                level: "easy",
                examples: [{ input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "" }],
                tests: [
                    { input: "[[-1,0,3,5,9,12], 9]", expected: "4" },
                    { input: "[[-1,0,3,5,9,12], 2]", expected: "-1" },
                    { input: "[[1], 1]", expected: "0" },
                    { input: "[[1,2], 2]", expected: "1" },
                    { input: "[[1,2,3,4,5,6,7,8], 8]", expected: "7" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "binarySearch",
                        starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function binarySearch(nums, target) {
  // TODO: implement
}
`,
                        optimalSolution: `function binarySearch(a,t){
  let l=0,r=a.length-1;
  while(l<=r){
    const m=(l+r>>1);
    if(a[m]===t) return m;
    if(a[m]<t) l=m+1; else r=m-1;
  }
  return -1;
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "binarySearch",
                        starterCode: `# @param nums: List[int]
# @param target: int
# @return int
def binarySearch(nums, target):
    # TODO: implement
    pass
`,
                        optimalSolution: `def binarySearch(a,t):
    l,r=0,len(a)-1
    while l<=r:
        m=(l+r)//2
        if a[m]==t: return m
        if a[m]<t: l=m+1
        else: r=m-1
    return -1
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "binarySearch",
                        starterCode: `public class Solution {
    public static int binarySearch(int[] nums, int target){
        // TODO: implement
        return -1;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int binarySearch(int[] a, int t){
        int l=0,r=a.length-1;
        while(l<=r){
            int m=(l+r)/2;
            if(a[m]==t) return m;
            if(a[m]<t) l=m+1; else r=m-1;
        }
        return -1;
    }
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Valid Parentheses",
                description: "Given a string of brackets, determine if it is valid.",
                level: "easy",
                examples: [
                    { input: 's = "()"', output: "true", explanation: "" },
                    { input: 's = "()[]{}"', output: "true", explanation: "" },
                    { input: 's = "(]"', output: "false", explanation: "" },
                ],
                tests: [
                    { input: '["()"]', expected: "true" },
                    { input: '["()[]{}"]', expected: "true" },
                    { input: '["(]"]', expected: "false" },
                    { input: '["([])"]', expected: "true" },
                    { input: '["([)]"]', expected: "false" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "isValidParentheses",
                        starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValidParentheses(s) {
  // TODO: implement
}
`,
                        optimalSolution: `function isValidParentheses(s){
  const st=[], m={')':'(',']':'[','}':'{'};
  for(const c of s){
    if (c in m){ if (st.pop()!==m[c]) return false; }
    else st.push(c);
  }
  return st.length===0;
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "python",
                        functionName: "isValidParentheses",
                        starterCode: `# @param s: str
# @return bool
def isValidParentheses(s):
    # TODO: implement
    pass
`,
                        optimalSolution: `def isValidParentheses(s):
    st=[]; m={')':'(',']':'[','}':'{'}
    for c in s:
        if c in m:
            if not st or st.pop()!=m[c]: return False
        else:
            st.append(c)
    return not st
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "java",
                        functionName: "isValidParentheses",
                        starterCode: `public class Solution {
    public static boolean isValidParentheses(String s){
        // TODO: implement
        return false;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static boolean isValidParentheses(String s){
        java.util.Deque<Character> st=new java.util.ArrayDeque<>();
        java.util.Map<Character,Character> m=new java.util.HashMap<>();
        m.put(')', '('); m.put(']', '['); m.put('}', '{');
        for (char c: s.toCharArray()){
            if (m.containsKey(c)){
                if (st.isEmpty() || st.pop()!=m.get(c)) return false;
            } else st.push(c);
        }
        return st.isEmpty();
    }
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                ],
            },

            {
                title: "Best Time to Buy and Sell Stock",
                description:
                    "Given prices[i] as the stock price on day i, return the maximum profit; if no profit, return 0.",
                level: "easy",
                examples: [
                    { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "buy at 1, sell at 6" },
                    { input: "prices = [7,6,4,3,1]", output: "0", explanation: "no profit" },
                ],
                tests: [
                    { input: "[[7,1,5,3,6,4]]", expected: "5" },
                    { input: "[[7,6,4,3,1]]", expected: "0" },
                    { input: "[[1,2]]", expected: "1" },
                    { input: "[[2,1,2,0,1]]", expected: "1" },
                    { input: "[[2,4,1]]", expected: "2" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "maxProfit",
                        starterCode: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  // TODO: implement
}
`,
                        optimalSolution: `function maxProfit(prices){
  let min=Infinity, best=0;
  for(const p of prices){ if(p<min) min=p; else best=Math.max(best,p-min); }
  return best;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "maxProfit",
                        starterCode: `# @param prices: List[int]
# @return int
def maxProfit(prices):
    # TODO: implement
    pass
`,
                        optimalSolution: `def maxProfit(prices):
    mn=10**9; best=0
    for p in prices:
        if p<mn: mn=p
        else: best=max(best,p-mn)
    return best
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "maxProfit",
                        starterCode: `public class Solution {
    public static int maxProfit(int[] prices){
        // TODO: implement
        return 0;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int maxProfit(int[] prices){
        int mn=Integer.MAX_VALUE, best=0;
        for (int p: prices){
            if (p<mn) mn=p; else best=Math.max(best,p-mn);
        }
        return best;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Length of Last Word",
                description: "Given a string s, return the length of the last word.",
                level: "easy",
                examples: [{ input: 's = "Hello World"', output: "5", explanation: "" }],
                tests: [
                    { input: '["Hello World"]', expected: "5" },
                    { input: '["   fly me   to   the moon  "]', expected: "4" },
                    { input: '["luffy is still joyboy"]', expected: "6" },
                    { input: '["a"]', expected: "1" },
                    { input: '["  a  "]', expected: "1" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "lengthOfLastWord",
                        starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLastWord(s) {
  // TODO: implement
}
`,
                        optimalSolution: `function lengthOfLastWord(s){
  let i=s.length-1;
  while(i>=0 && s[i]===' ') i--;
  let len=0;
  while(i>=0 && s[i]!==' '){ len++; i--; }
  return len;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "lengthOfLastWord",
                        starterCode: `# @param s: str
# @return int
def lengthOfLastWord(s):
    # TODO: implement
    pass
`,
                        optimalSolution: `def lengthOfLastWord(s):
    i=len(s)-1
    while i>=0 and s[i]==' ': i-=1
    j=i
    while j>=0 and s[j] != ' ': j-=1
    return i-j
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "lengthOfLastWord",
                        starterCode: `public class Solution {
    public static int lengthOfLastWord(String s){
        // TODO: implement
        return 0;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int lengthOfLastWord(String s){
        int i=s.length()-1;
        while(i>=0 && s.charAt(i)==' ') i--;
        int len=0;
        while(i>=0 && s.charAt(i)!=' '){ len++; i--; }
        return len;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Reverse String",
                description: "Given an array of characters, reverse it and return the array.",
                level: "easy",
                examples: [
                    { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: "" },
                ],
                tests: [
                    { input: '[["h","e","l","l","o"]]', expected: '["o","l","l","e","h"]' },
                    { input: '[["H","a","n","n","a","h"]]', expected: '["h","a","n","n","a","H"]' },
                    { input: '[["a"]]', expected: '["a"]' },
                    { input: "[[]]", expected: "[]" },
                    { input: '[["A","B"]]', expected: '["B","A"]' },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "reverseString",
                        starterCode: `/**
 * @param {string[]} s
 * @return {string[]}
 */
function reverseString(s) {
  // TODO: implement
}
`,
                        optimalSolution: `function reverseString(s){
  let i=0,j=s.length-1;
  while(i<j){ [s[i],s[j]]=[s[j],s[i]]; i++; j--; }
  return s;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "reverseString",
                        starterCode: `# @param s: List[str]
# @return List[str]
def reverseString(s):
    # TODO: implement
    pass
`,
                        optimalSolution: `def reverseString(s):
    i,j=0,len(s)-1
    while i<j:
        s[i],s[j]=s[j],s[i]
        i+=1; j-=1
    return s
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "reverseString",
                        starterCode: `public class Solution {
    public static String[] reverseString(String[] s){
        // TODO: implement
        return s;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static String[] reverseString(String[] s){
        int i=0,j=s.length-1;
        while(i<j){
            String tmp=s[i]; s[i]=s[j]; s[j]=tmp;
            i++; j--;
        }
        return s;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Single Number",
                description:
                    "Given a non-empty array where every element appears twice except for one, find that single one.",
                level: "easy",
                examples: [
                    { input: "nums = [2,2,1]", output: "1", explanation: "" },
                    { input: "nums = [4,1,2,1,2]", output: "4", explanation: "" },
                ],
                tests: [
                    { input: "[[2,2,1]]", expected: "1" },
                    { input: "[[4,1,2,1,2]]", expected: "4" },
                    { input: "[[1]]", expected: "1" },
                    { input: "[[0,1,0]]", expected: "1" },
                    { input: "[[5,5,6,6,7]]", expected: "7" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "singleNumber",
                        starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber(nums) {
  // TODO: implement
}
`,
                        optimalSolution: `function singleNumber(nums){
  let x=0; for(const n of nums) x^=n; return x;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "singleNumber",
                        starterCode: `# @param nums: List[int]
# @return int
def singleNumber(nums):
    # TODO: implement
    pass
`,
                        optimalSolution: `def singleNumber(nums):
    x=0
    for n in nums: x^=n
    return x
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "singleNumber",
                        starterCode: `public class Solution {
    public static int singleNumber(int[] nums){
        // TODO: implement
        return 0;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int singleNumber(int[] nums){
        int x=0; for(int n: nums) x^=n; return x;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            // ---- Add the remaining 8 easy problems to reach 20 ----
            // To keep this message from exploding, the next 8 are shorter (still tested & solved):

            {
                title: "Intersect Arrays II (multiset)",
                description: "Return the intersection of two arrays with counts.",
                level: "easy",
                examples: [
                    { input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2,2]", explanation: "" },
                ],
                tests: [
                    { input: "[[1,2,2,1],[2,2]]", expected: "[2,2]" },
                    { input: "[[4,9,5],[9,4,9,8,4]]", expected: "[4,9]" },
                    { input: "[[1],[1,1]]", expected: "[1]" },
                    { input: "[[2,2],[2]]", expected: "[2]" },
                    { input: "[[1,2,3],[4,5,6]]", expected: "[]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "intersect",
                        starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersect(nums1, nums2) { /* TODO */ }
`,
                        optimalSolution: `function intersect(a,b){
  const m=new Map(); for(const x of a) m.set(x,(m.get(x)||0)+1);
  const res=[]; for(const y of b){ const c=(m.get(y)||0); if(c>0){ res.push(y); m.set(y,c-1);} }
  return res;
}
`,
                        complexity: { time: "O(m+n)", space: "O(min(m,n))" },
                    },
                    {
                        lang: "python",
                        functionName: "intersect",
                        starterCode: `def intersect(nums1, nums2):  # List[int], List[int] -> List[int]
    pass
`,
                        optimalSolution: `def intersect(a,b):
    from collections import Counter
    ca=Counter(a); res=[]
    for y in b:
        if ca[y]>0:
            res.append(y); ca[y]-=1
    return res
`,
                        complexity: { time: "O(m+n)", space: "O(min(m,n))" },
                    },
                    {
                        lang: "java",
                        functionName: "intersect",
                        starterCode: `public class Solution {
    public static int[] intersect(int[] nums1, int[] nums2){ return new int[0]; }
}
`,
                        optimalSolution: `public class Solution {
    public static int[] intersect(int[] a, int[] b){
        java.util.Map<Integer,Integer> m=new java.util.HashMap<>();
        for(int x: a) m.put(x, m.getOrDefault(x,0)+1);
        java.util.ArrayList<Integer> out=new java.util.ArrayList<>();
        for(int y: b){
            int c=m.getOrDefault(y,0);
            if(c>0){ out.add(y); m.put(y,c-1); }
        }
        int[] res=new int[out.size()];
        for(int i=0;i<out.size();i++) res[i]=out.get(i);
        return res;
    }
}
`,
                        complexity: { time: "O(m+n)", space: "O(min(m,n))" },
                    },
                ],
            },

            {
                title: "Remove Duplicates from Sorted Array",
                description: "Remove duplicates in-place and return the array of unique values.",
                level: "easy",
                examples: [{ input: "nums = [1,1,2]", output: "[1,2]", explanation: "" }],
                tests: [
                    { input: "[[1,1,2]]", expected: "[1,2]" },
                    { input: "[[0,0,1,1,1,2,2,3,3,4]]", expected: "[0,1,2,3,4]" },
                    { input: "[[]]", expected: "[]" },
                    { input: "[[1]]", expected: "[1]" },
                    { input: "[[1,1,1]]", expected: "[1]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "removeDuplicatesSorted",
                        starterCode: `function removeDuplicatesSorted(nums){ /* TODO */ }`,
                        optimalSolution: `function removeDuplicatesSorted(nums){
  if (nums.length===0) return nums;
  let k=1;
  for(let i=1;i<nums.length;i++){
    if(nums[i]!==nums[k-1]) nums[k++]=nums[i];
  }
  return nums.slice(0,k);
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "removeDuplicatesSorted",
                        starterCode: `def removeDuplicatesSorted(nums):  # List[int] -> List[int]
    pass
`,
                        optimalSolution: `def removeDuplicatesSorted(nums):
    if not nums: return []
    k=1
    for i in range(1,len(nums)):
        if nums[i]!=nums[k-1]:
            nums[k]=nums[i]; k+=1
    return nums[:k]
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "removeDuplicatesSorted",
                        starterCode: `public class Solution { public static int[] removeDuplicatesSorted(int[] nums){ return nums; } }`,
                        optimalSolution: `public class Solution {
    public static int[] removeDuplicatesSorted(int[] nums){
        if (nums.length==0) return nums;
        int k=1;
        for (int i=1;i<nums.length;i++){
            if (nums[i]!=nums[k-1]) nums[k++]=nums[i];
        }
        int[] out=new int[k];
        for(int i=0;i<k;i++) out[i]=nums[i];
        return out;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Valid Mountain Array",
                description: "Return true if array is a valid mountain (strict up then strict down).",
                level: "easy",
                examples: [{ input: "arr = [0,3,2,1]", output: "true", explanation: "" }],
                tests: [
                    { input: "[[0,3,2,1]]", expected: "true" },
                    { input: "[[3,5,5]]", expected: "false" },
                    { input: "[[2,1]]", expected: "false" },
                    { input: "[[0,1,2,3,2,1]]", expected: "true" },
                    { input: "[[0,1,2,2,1]]", expected: "false" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "validMountainArray",
                        starterCode: `function validMountainArray(arr){ /* TODO */ }`,
                        optimalSolution: `function validMountainArray(a){
  let i=0, n=a.length;
  while(i+1<n && a[i]<a[i+1]) i++;
  if (i===0 || i===n-1) return false;
  while(i+1<n && a[i]>a[i+1]) i++;
  return i===n-1;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "validMountainArray",
                        starterCode: `def validMountainArray(arr):  # List[int] -> bool
    pass
`,
                        optimalSolution: `def validMountainArray(a):
    i=0; n=len(a)
    while i+1<n and a[i]<a[i+1]: i+=1
    if i==0 or i==n-1: return False
    while i+1<n and a[i]>a[i+1]: i+=1
    return i==n-1
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "validMountainArray",
                        starterCode: `public class Solution { public static boolean validMountainArray(int[] arr){ return false; } }`,
                        optimalSolution: `public class Solution {
    public static boolean validMountainArray(int[] a){
        int i=0, n=a.length;
        while(i+1<n && a[i]<a[i+1]) i++;
        if (i==0 || i==n-1) return false;
        while(i+1<n && a[i]>a[i+1]) i++;
        return i==n-1;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Missing Number",
                description: "Given n distinct numbers from 0..n, find the missing number.",
                level: "easy",
                examples: [{ input: "nums = [3,0,1]", output: "2", explanation: "" }],
                tests: [
                    { input: "[[3,0,1]]", expected: "2" },
                    { input: "[[0,1]]", expected: "2" },
                    { input: "[[9,6,4,2,3,5,7,0,1]]", expected: "8" },
                    { input: "[[0]]", expected: "1" },
                    { input: "[[1]]", expected: "0" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "missingNumber",
                        starterCode: `function missingNumber(nums){ /* TODO */ }`,
                        optimalSolution: `function missingNumber(a){
  let x=a.length;
  for(let i=0;i<a.length;i++) x^=i ^ a[i];
  return x;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "missingNumber",
                        starterCode: `def missingNumber(nums):  # List[int] -> int
    pass
`,
                        optimalSolution: `def missingNumber(a):
    x=len(a)
    for i,v in enumerate(a): x ^= i ^ v
    return x
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "missingNumber",
                        starterCode: `public class Solution { public static int missingNumber(int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int missingNumber(int[] a){
        int x=a.length;
        for(int i=0;i<a.length;i++) x ^= i ^ a[i];
        return x;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "First Unique Character in a String",
                description: "Return the index of the first non-repeating character; else -1.",
                level: "easy",
                examples: [{ input: 's = "leetcode"', output: "0", explanation: "" }],
                tests: [
                    { input: '["leetcode"]', expected: "0" },
                    { input: '["loveleetcode"]', expected: "2" },
                    { input: '["aabb"]', expected: "-1" },
                    { input: '["z"]', expected: "0" },
                    { input: '["aaab"]', expected: "3" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "firstUniqChar",
                        starterCode: `function firstUniqChar(s){ /* TODO */ }`,
                        optimalSolution: `function firstUniqChar(s){
  const c=new Map();
  for(const ch of s) c.set(ch,(c.get(ch)||0)+1);
  for(let i=0;i<s.length;i++) if(c.get(s[i])===1) return i;
  return -1;
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "python",
                        functionName: "firstUniqChar",
                        starterCode: `def firstUniqChar(s):  # str -> int
    pass
`,
                        optimalSolution: `def firstUniqChar(s):
    from collections import Counter
    cnt = Counter(s)
    for i,ch in enumerate(s):
        if cnt[ch]==1: return i
    return -1
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "java",
                        functionName: "firstUniqChar",
                        starterCode: `public class Solution { public static int firstUniqChar(String s){ return -1; } }`,
                        optimalSolution: `public class Solution {
    public static int firstUniqChar(String s){
        int[] c=new int[52];
        for(char ch: s.toCharArray()){
            if (ch>='a'&&ch<='z') c[ch-'a']++;
            else if (ch>='A'&&ch<='Z') c[26+(ch-'A')]++;
        }
        for(int i=0;i<s.length();i++){
            char ch=s.charAt(i);
            int v = (ch>='a'&&ch<='z') ? c[ch-'a'] : c[26+(ch-'A')];
            if (v==1) return i;
        }
        return -1;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1) for letters" },
                    },
                ],
            },

            {
                title: "Majority Element",
                description: "Find the element that appears more than ⌊n/2⌋ times.",
                level: "easy",
                examples: [{ input: "nums = [3,2,3]", output: "3", explanation: "" }],
                tests: [
                    { input: "[[3,2,3]]", expected: "3" },
                    { input: "[[2,2,1,1,1,2,2]]", expected: "2" },
                    { input: "[[1]]", expected: "1" },
                    { input: "[[6,5,5]]", expected: "5" },
                    { input: "[[1,1,2,2,2]]", expected: "2" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "majorityElement",
                        starterCode: `function majorityElement(nums){ /* TODO */ }`,
                        optimalSolution: `function majorityElement(a){
  let cand=null, cnt=0;
  for(const x of a){
    if (cnt===0){ cand=x; cnt=1; }
    else if (x===cand) cnt++; else cnt--;
  }
  return cand;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "majorityElement",
                        starterCode: `def majorityElement(nums):  # List[int] -> int
    pass
`,
                        optimalSolution: `def majorityElement(a):
    cand=None; cnt=0
    for x in a:
        if cnt==0: cand=x; cnt=1
        elif x==cand: cnt+=1
        else: cnt-=1
    return cand
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "majorityElement",
                        starterCode: `public class Solution { public static int majorityElement(int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int majorityElement(int[] a){
        Integer cand=null; int cnt=0;
        for(int x: a){
            if (cnt==0){ cand=x; cnt=1; }
            else if (x==cand) cnt++; else cnt--;
        }
        return cand;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Rotate Array Right",
                description: "Rotate array to the right by k steps (return rotated array).",
                level: "easy",
                examples: [{ input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]", explanation: "" }],
                tests: [
                    { input: "[[1,2,3,4,5,6,7], 3]", expected: "[5,6,7,1,2,3,4]" },
                    { input: "[[-1,-100,3,99], 2]", expected: "[3,99,-1,-100]" },
                    { input: "[[1], 0]", expected: "[1]" },
                    { input: "[[1,2], 1]", expected: "[2,1]" },
                    { input: "[[1,2,3], 4]", expected: "[3,1,2]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "rotateRight",
                        starterCode: `function rotateRight(nums, k){ /* TODO */ }`,
                        optimalSolution: `function rotateRight(a,k){
  const n=a.length; if(!n) return a; k%=n;
  reverse(a,0,n-1); reverse(a,0,k-1); reverse(a,k,n-1); return a;
  function reverse(a,l,r){ while(l<r){ [a[l],a[r]]=[a[r],a[l]]; l++; r--; } }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "rotateRight",
                        starterCode: `def rotateRight(nums, k):  # List[int], int -> List[int]
    pass
`,
                        optimalSolution: `def rotateRight(a,k):
    n=len(a)
    if n==0: return a
    k%=n
    a[:] = a[-k:]+a[:-k]
    return a
`,
                        complexity: { time: "O(n)", space: "O(1) extra)" },
                    },
                    {
                        lang: "java",
                        functionName: "rotateRight",
                        starterCode: `public class Solution { public static int[] rotateRight(int[] nums, int k){ return nums; } }`,
                        optimalSolution: `public class Solution {
    public static int[] rotateRight(int[] a, int k){
        int n=a.length; if(n==0) return a; k%=n;
        rev(a,0,n-1); rev(a,0,k-1); rev(a,k,n-1); return a;
    }
    static void rev(int[] a,int l,int r){ while(l<r){ int t=a[l]; a[l]=a[r]; a[r]=t; l++; r--; } }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Merge Two Lists (arrays)",
                description:
                    "Given two sorted arrays representing linked lists, merge and return sorted array.",
                level: "easy",
                examples: [{ input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "" }],
                tests: [
                    { input: "[[1,2,4],[1,3,4]]", expected: "[1,1,2,3,4,4]" },
                    { input: "[[],[]]", expected: "[]" },
                    { input: "[[],[0]]", expected: "[0]" },
                    { input: "[[5],[1,2,3]]", expected: "[1,2,3,5]" },
                    { input: "[[1,1],[1,2]]", expected: "[1,1,1,2]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "mergeLists",
                        starterCode: `function mergeLists(l1,l2){ /* TODO */ }`,
                        optimalSolution: `function mergeLists(a,b){
  const res=[]; let i=0,j=0;
  while(i<a.length&&j<b.length){
    if(a[i]<=b[j]) res.push(a[i++]); else res.push(b[j++]);
  }
  while(i<a.length) res.push(a[i++]);
  while(j<b.length) res.push(b[j++]);
  return res;
}
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                    {
                        lang: "python",
                        functionName: "mergeLists",
                        starterCode: `def mergeLists(l1,l2):  # List[int], List[int] -> List[int]
    pass
`,
                        optimalSolution: `def mergeLists(a,b):
    i=j=0; res=[]
    while i<len(a) and j<len(b):
        if a[i]<=b[j]:
            res.append(a[i]); i+=1
        else:
            res.append(b[j]); j+=1
    res.extend(a[i:]); res.extend(b[j:]); return res
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                    {
                        lang: "java",
                        functionName: "mergeLists",
                        starterCode: `public class Solution { public static int[] mergeLists(int[] l1,int[] l2){ return new int[0]; } }`,
                        optimalSolution: `public class Solution {
    public static int[] mergeLists(int[] a,int[] b){
        int i=0,j=0,k=0; int[] res=new int[a.length+b.length];
        while(i<a.length && j<b.length){
            if(a[i]<=b[j]) res[k++]=a[i++]; else res[k++]=b[j++];
        }
        while(i<a.length) res[k++]=a[i++];
        while(j<b.length) res[k++]=b[j++];
        return res;
    }
}
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                ],
            },
        ]; // END data (20 easy)

        // ---------- 20 MEDIUM PROBLEMS ----------
        const mediumProblems = [
            {
                title: "3Sum (unique triplets)",
                description: "Return all unique triplets [a,b,c] such that a+b+c = 0. Triplets must be sorted in non-decreasing order and the list lexicographically sorted.",
                level: "medium",
                examples: [
                    { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "" },
                    { input: "nums = [0,0,0,0]", output: "[[0,0,0]]", explanation: "" },
                ],
                tests: [
                    { input: "[[-1,0,1,2,-1,-4]]", expected: "[[-1,-1,2],[-1,0,1]]" },
                    { input: "[[0,0,0,0]]", expected: "[[0,0,0]]" },
                    { input: "[[3,-2,1,0]]", expected: "[]" },
                    { input: "[[-2,0,1,1,2]]", expected: "[[-2,0,2],[-2,1,1]]" },
                    { input: "[[1,2,-2,-1]]", expected: "[]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "threeSum",
                        starterCode: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
  // Return lexicographically sorted list of unique sorted triplets summing to 0
  // TODO: implement
}
`,
                        optimalSolution: `function threeSum(nums){
  nums.sort((a,b)=>a-b);
  const n=nums.length, res=[];
  for(let i=0;i<n;i++){
    if(i>0 && nums[i]===nums[i-1]) continue;
    let l=i+1,r=n-1;
    while(l<r){
      const s=nums[i]+nums[l]+nums[r];
      if(s===0){
        res.push([nums[i],nums[l],nums[r]]);
        l++; r--;
        while(l<r && nums[l]===nums[l-1]) l++;
        while(l<r && nums[r]===nums[r+1]) r--;
      }else if(s<0) l++; else r--;
    }
  }
  // already lexicographic since outer is increasing and inner pairs advance
  return res;
}
`,
                        complexity: { time: "O(n^2)", space: "O(1) extra" }
                    },
                    {
                        lang: "python",
                        functionName: "threeSum",
                        starterCode: `# @param nums: List[int]
# @return List[List[int]]
def threeSum(nums):
    # Return lexicographically sorted list of unique sorted triplets summing to 0
    # TODO: implement
    pass
`,
                        optimalSolution: `def threeSum(nums):
    nums.sort()
    n=len(nums); res=[]
    for i in range(n):
        if i and nums[i]==nums[i-1]: continue
        l,r=i+1,n-1
        while l<r:
            s=nums[i]+nums[l]+nums[r]
            if s==0:
                res.append([nums[i],nums[l],nums[r]])
                l+=1; r-=1
                while l<r and nums[l]==nums[l-1]: l+=1
                while l<r and nums[r]==nums[r+1]: r-=1
            elif s<0: l+=1
            else: r-=1
    return res
`,
                        complexity: { time: "O(n^2)", space: "O(1) extra" }
                    },
                    {
                        lang: "java",
                        functionName: "threeSum",
                        starterCode: `// @param nums: int[]
// @return int[][]
public class Solution {
    public static int[][] threeSum(int[] nums){
        // Return lexicographically sorted list of unique sorted triplets summing to 0
        // TODO: implement
        return new int[0][];
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int[][] threeSum(int[] nums){
        java.util.Arrays.sort(nums);
        java.util.ArrayList<int[]> out=new java.util.ArrayList<>();
        int n=nums.length;
        for(int i=0;i<n;i++){
            if(i>0 && nums[i]==nums[i-1]) continue;
            int l=i+1, r=n-1;
            while(l<r){
                int s=nums[i]+nums[l]+nums[r];
                if(s==0){
                    out.add(new int[]{nums[i],nums[l],nums[r]});
                    l++; r--;
                    while(l<r && nums[l]==nums[l-1]) l++;
                    while(l<r && nums[r]==nums[r+1]) r--;
                }else if(s<0) l++; else r--;
            }
        }
        int[][] res=new int[out.size()][3];
        for(int i=0;i<out.size();i++) res[i]=out.get(i);
        return res;
    }
}
`,
                        complexity: { time: "O(n^2)", space: "O(1) extra" }
                    }
                ]
            },

            {
                title: "Group Anagrams",
                description: "Group words that are anagrams. Return groups with words sorted, and groups sorted by their first word.",
                level: "medium",
                examples: [
                    { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["ate","eat","tea"],["bat"],["nat","tan"]]', explanation: "" }
                ],
                tests: [
                    { input: '[["eat","tea","tan","ate","nat","bat"]]', expected: '[["ate","eat","tea"],["bat"],["nat","tan"]]' },
                    { input: '[[""]]', expected: '[[""]]' },
                    { input: '[["a"]]', expected: '[["a"]]' },
                    { input: '[["ab","ba","abc","bca","cab"]]', expected: '[["ab","ba"],["abc","bca","cab"]]' },
                    { input: '[["dddddddddd","d"]]', expected: '[["d"],["dddddddddd"]]' }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "groupAnagrams",
                        starterCode: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // Words sorted within each group; groups sorted by first word
  // TODO: implement
}
`,
                        optimalSolution: `function groupAnagrams(strs){
  const m=new Map();
  for(const w of strs){
    const key = w.split('').sort().join('');
    if(!m.has(key)) m.set(key, []);
    m.get(key).push(w);
  }
  const groups = Array.from(m.values()).map(g=>g.sort());
  groups.sort((a,b)=> a[0].localeCompare(b[0]));
  return groups;
}
`,
                        complexity: { time: "O(n k log k)", space: "O(nk)" }
                    },
                    {
                        lang: "python",
                        functionName: "groupAnagrams",
                        starterCode: `# @param strs: List[str]
# @return List[List[str]]
def groupAnagrams(strs):
    # Words sorted within each group; groups sorted by first word
    # TODO: implement
    pass
`,
                        optimalSolution: `def groupAnagrams(strs):
    from collections import defaultdict
    m=defaultdict(list)
    for w in strs:
        key=''.join(sorted(w))
        m[key].append(w)
    groups=[sorted(g) for g in m.values()]
    groups.sort(key=lambda g: g[0] if g else "")
    return groups
`,
                        complexity: { time: "O(n k log k)", space: "O(nk)" }
                    },
                    {
                        lang: "java",
                        functionName: "groupAnagrams",
                        starterCode: `public class Solution {
    public static String[][] groupAnagrams(String[] strs){
        // Words sorted within each group; groups sorted by first word
        // TODO: implement
        return new String[0][];
    }
}
`,
                        optimalSolution: `public class Solution {
    public static String[][] groupAnagrams(String[] strs){
        java.util.Map<String, java.util.List<String>> m=new java.util.HashMap<>();
        for(String w: strs){
            char[] ch=w.toCharArray();
            java.util.Arrays.sort(ch);
            String key=new String(ch);
            m.computeIfAbsent(key,k->new java.util.ArrayList<>()).add(w);
        }
        java.util.List<java.util.List<String>> list=new java.util.ArrayList<>(m.values());
        for(java.util.List<String> g: list) java.util.Collections.sort(g);
        list.sort((a,b)->a.get(0).compareTo(b.get(0)));
        String[][] res=new String[list.size()][];
        for(int i=0;i<list.size();i++) res[i]=list.get(i).toArray(new String[0]);
        return res;
    }
}
`,
                        complexity: { time: "O(n k log k)", space: "O(nk)" }
                    }
                ]
            },

            {
                title: "Top K Frequent Elements",
                description: "Return the k most frequent elements. Break ties by smaller value first.",
                level: "medium",
                examples: [
                    { input: "nums = [1,1,1,2,2,3], k=2", output: "[1,2]", explanation: "" }
                ],
                tests: [
                    { input: "[[1,1,1,2,2,3],2]", expected: "[1,2]" },
                    { input: "[[1],1]", expected: "[1]" },
                    { input: "[[4,1,-1,2,-1,2,3],2]", expected: "[-1,2]" },
                    { input: "[[5,3,1,1,1,3,73,1],2]", expected: "[1,3]" },
                    { input: "[[2,2,2,3,3,1],2]", expected: "[2,3]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "topKFrequent",
                        starterCode: `function topKFrequent(nums, k){ /* TODO */ }`,
                        optimalSolution: `function topKFrequent(nums,k){
  const cnt=new Map();
  for(const x of nums) cnt.set(x,(cnt.get(x)||0)+1);
  const arr=[...cnt.entries()];
  arr.sort((a,b)=> b[1]-a[1] || a[0]-b[0]);
  return arr.slice(0,k).map(e=>e[0]);
}
`,
                        complexity: { time: "O(n log n)", space: "O(n)" }
                    },
                    {
                        lang: "python",
                        functionName: "topKFrequent",
                        starterCode: `def topKFrequent(nums, k):  # List[int], int -> List[int]
    pass
`,
                        optimalSolution: `def topKFrequent(nums,k):
    from collections import Counter
    arr=list(Counter(nums).items())
    arr.sort(key=lambda x:(-x[1], x[0]))
    return [x for x,_ in arr[:k]]
`,
                        complexity: { time: "O(n log n)", space: "O(n)" }
                    },
                    {
                        lang: "java",
                        functionName: "topKFrequent",
                        starterCode: `public class Solution { public static int[] topKFrequent(int[] nums, int k){ return new int[0]; } }`,
                        optimalSolution: `public class Solution {
    public static int[] topKFrequent(int[] nums, int k){
        java.util.Map<Integer,Integer> cnt=new java.util.HashMap<>();
        for(int x: nums) cnt.put(x, cnt.getOrDefault(x,0)+1);
        java.util.List<int[]> arr=new java.util.ArrayList<>();
        for(java.util.Map.Entry<Integer,Integer> e: cnt.entrySet())
            arr.add(new int[]{e.getKey(), e.getValue()});
        arr.sort((a,b)-> b[1]-a[1]==0 ? a[0]-b[0] : b[1]-a[1]);
        int[] res=new int[k];
        for(int i=0;i<k;i++) res[i]=arr.get(i)[0];
        return res;
    }
}
`,
                        complexity: { time: "O(n log n)", space: "O(n)" }
                    }
                ]
            },

            {
                title: "K Closest Points to Origin",
                description: "Given points, return the k points closest to origin. Break ties by x then y.",
                level: "medium",
                examples: [{ input: "points=[[1,3],[-2,2]], k=1", output: "[[-2,2]]", explanation: "" }],
                tests: [
                    { input: "[[[1,3],[-2,2]],1]", expected: "[[-2,2]]" },
                    { input: "[[[3,3],[5,-1],[-2,4]],2]", expected: "[[3,3],[-2,4]]" },
                    { input: "[[[1,1],[2,2],[1,-1]],2]", expected: "[[1,-1],[1,1]]" },
                    { input: "[[[0,1],[1,0]],1]", expected: "[[0,1]]" },
                    { input: "[[[2,3],[2,-3],[3,2],[-2,3]],2]", expected: "[[2,-3],[2,3]]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "kClosest",
                        starterCode: `function kClosest(points, k){ /* TODO */ }`,
                        optimalSolution: `function kClosest(points,k){
  const d = p=>p[0]*p[0]+p[1]*p[1];
  points.sort((a,b)=> d(a)-d(b) || a[0]-b[0] || a[1]-b[1]);
  return points.slice(0,k);
}
`,
                        complexity: { time: "O(n log n)", space: "O(1)" }
                    },
                    {
                        lang: "python",
                        functionName: "kClosest",
                        starterCode: `def kClosest(points, k):  # List[List[int]], int -> List[List[int]]
    pass
`,
                        optimalSolution: `def kClosest(points,k):
    points.sort(key=lambda p:(p[0]*p[0]+p[1]*p[1], p[0], p[1]))
    return points[:k]
`,
                        complexity: { time: "O(n log n)", space: "O(1)" }
                    },
                    {
                        lang: "java",
                        functionName: "kClosest",
                        starterCode: `public class Solution { public static int[][] kClosest(int[][] points, int k){ return new int[0][]; } }`,
                        optimalSolution: `public class Solution {
    public static int[][] kClosest(int[][] points, int k){
        java.util.Arrays.sort(points, (a,b)->{
            long da=1L*a[0]*a[0]+1L*a[1]*a[1];
            long db=1L*b[0]*b[0]+1L*b[1]*b[1];
            if(da==db){
                if(a[0]==b[0]) return Integer.compare(a[1], b[1]);
                return Integer.compare(a[0], b[0]);
            }
            return Long.compare(da, db);
        });
        int[][] res=new int[k][2];
        for(int i=0;i<k;i++){ res[i]=points[i]; }
        return res;
    }
}
`,
                        complexity: { time: "O(n log n)", space: "O(1)" }
                    }
                ]
            },

            {
                title: "Sort Colors (Dutch National Flag)",
                description: "Sort array of 0s,1s,2s in-place.",
                level: "medium",
                examples: [{ input: "nums=[2,0,2,1,1,0]", output: "[0,0,1,1,2,2]", explanation: "" }],
                tests: [
                    { input: "[[2,0,2,1,1,0]]", expected: "[0,0,1,1,2,2]" },
                    { input: "[[2,0,1]]", expected: "[0,1,2]" },
                    { input: "[[0]]", expected: "[0]" },
                    { input: "[[1,2,0]]", expected: "[0,1,2]" },
                    { input: "[[2,2,2,1,1,0,0]]", expected: "[0,0,1,1,2,2,2]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "sortColors",
                        starterCode: `function sortColors(nums){ /* TODO */ }`,
                        optimalSolution: `function sortColors(a){
  let l=0,i=0,r=a.length-1;
  while(i<=r){
    if(a[i]===0){ [a[l],a[i]]=[a[i],a[l]]; l++; i++; }
    else if(a[i]===2){ [a[i],a[r]]=[a[r],a[i]]; r--; }
    else i++;
  }
  return a;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "python",
                        functionName: "sortColors",
                        starterCode: `def sortColors(nums):  # List[int] -> List[int]
    pass
`,
                        optimalSolution: `def sortColors(a):
    l,i,r=0,0,len(a)-1
    while i<=r:
        if a[i]==0:
            a[l],a[i]=a[i],a[l]; l+=1; i+=1
        elif a[i]==2:
            a[i],a[r]=a[r],a[i]; r-=1
        else:
            i+=1
    return a
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "java",
                        functionName: "sortColors",
                        starterCode: `public class Solution { public static int[] sortColors(int[] nums){ return nums; } }`,
                        optimalSolution: `public class Solution {
    public static int[] sortColors(int[] a){
        int l=0,i=0,r=a.length-1;
        while(i<=r){
            if(a[i]==0){ int t=a[l]; a[l]=a[i]; a[i]=t; l++; i++; }
            else if(a[i]==2){ int t=a[i]; a[i]=a[r]; a[r]=t; r--; }
            else i++;
        }
        return a;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    }
                ]
            },

            {
                title: "Rotate Image (90° clockwise)",
                description: "Rotate an n x n matrix in-place 90 degrees clockwise.",
                level: "medium",
                examples: [{ input: "matrix=[[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]", explanation: "" }],
                tests: [
                    { input: "[[ [1,2,3],[4,5,6],[7,8,9] ]]", expected: "[[7,4,1],[8,5,2],[9,6,3]]" },
                    { input: "[[ [5] ]]", expected: "[[5]]" },
                    { input: "[[ [1,2],[3,4] ]]", expected: "[[3,1],[4,2]]" },
                    { input: "[[ [1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16] ]]", expected: "[[13,9,5,1],[14,10,6,2],[15,11,7,3],[16,12,8,4]]" },
                    { input: "[[ [2,2],[2,2] ]]", expected: "[[2,2],[2,2]]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "rotateImage",
                        starterCode: `function rotateImage(matrix){ /* TODO */ }`,
                        optimalSolution: `function rotateImage(m){
  const n=m.length;
  // transpose
  for(let i=0;i<n;i++) for(let j=i+1;j<n;j++){ [m[i][j],m[j][i]]=[m[j][i],m[i][j]]; }
  // reverse each row
  for(let i=0;i<n;i++) m[i].reverse();
  return m;
}
`,
                        complexity: { time: "O(n^2)", space: "O(1)" }
                    },
                    {
                        lang: "python",
                        functionName: "rotateImage",
                        starterCode: `def rotateImage(matrix):  # List[List[int]] -> List[List[int]]
    pass
`,
                        optimalSolution: `def rotateImage(m):
    n=len(m)
    for i in range(n):
        for j in range(i+1,n):
            m[i][j],m[j][i]=m[j][i],m[i][j]
    for i in range(n):
        m[i].reverse()
    return m
`,
                        complexity: { time: "O(n^2)", space: "O(1)" }
                    },
                    {
                        lang: "java",
                        functionName: "rotateImage",
                        starterCode: `public class Solution { public static int[][] rotateImage(int[][] matrix){ return matrix; } }`,
                        optimalSolution: `public class Solution {
    public static int[][] rotateImage(int[][] m){
        int n=m.length;
        for(int i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                int t=m[i][j]; m[i][j]=m[j][i]; m[j][i]=t;
            }
        }
        for(int i=0;i<n;i++){
            for(int l=0,r=n-1;l<r;l++,r--){
                int t=m[i][l]; m[i][l]=m[i][r]; m[i][r]=t;
            }
        }
        return m;
    }
}
`,
                        complexity: { time: "O(n^2)", space: "O(1)" }
                    }
                ]
            },

            {
                title: "Spiral Matrix",
                description: "Return elements of matrix in spiral order.",
                level: "medium",
                examples: [{ input: "matrix=[[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]", explanation: "" }],
                tests: [
                    { input: "[[[1,2,3],[4,5,6],[7,8,9]]]", expected: "[1,2,3,6,9,8,7,4,5]" },
                    { input: "[[[1,2],[3,4]]]", expected: "[1,2,4,3]" },
                    { input: "[[[7]]]", expected: "[7]" },
                    { input: "[[[1,2,3,4]]]", expected: "[1,2,3,4]" },
                    { input: "[[[1],[2],[3]]]", expected: "[1,2,3]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "spiralOrder",
                        starterCode: `function spiralOrder(matrix){ /* TODO */ }`,
                        optimalSolution: `function spiralOrder(m){
  if(!m.length) return [];
  let top=0,bot=m.length-1,left=0,right=m[0].length-1, out=[];
  while(top<=bot && left<=right){
    for(let j=left;j<=right;j++) out.push(m[top][j]); top++;
    for(let i=top;i<=bot;i++) out.push(m[i][right]); right--;
    if(top<=bot){ for(let j=right;j>=left;j--) out.push(m[bot][j]); bot--; }
    if(left<=right){ for(let i=bot;i>=top;i--) out.push(m[i][left]); left++; }
  }
  return out;
}
`,
                        complexity: { time: "O(mn)", space: "O(1) extra" }
                    },
                    {
                        lang: "python",
                        functionName: "spiralOrder",
                        starterCode: `def spiralOrder(matrix):  # List[List[int]] -> List[int]
    pass
`,
                        optimalSolution: `def spiralOrder(m):
    if not m: return []
    top,bot,left,right=0,len(m)-1,0,len(m[0])-1
    out=[]
    while top<=bot and left<=right:
        for j in range(left,right+1): out.append(m[top][j])
        top+=1
        for i in range(top,bot+1): out.append(m[i][right])
        right-=1
        if top<=bot:
            for j in range(right,left-1,-1): out.append(m[bot][j])
            bot-=1
        if left<=right:
            for i in range(bot,top-1,-1): out.append(m[i][left])
            left+=1
    return out
`,
                        complexity: { time: "O(mn)", space: "O(1) extra" }
                    },
                    {
                        lang: "java",
                        functionName: "spiralOrder",
                        starterCode: `public class Solution { public static int[] spiralOrder(int[][] matrix){ return new int[0]; } }`,
                        optimalSolution: `public class Solution {
    public static int[] spiralOrder(int[][] m){
        if(m.length==0) return new int[0];
        int top=0, bot=m.length-1, left=0, right=m[0].length-1;
        int[] out=new int[m.length*m[0].length]; int k=0;
        while(top<=bot && left<=right){
            for(int j=left;j<=right;j++) out[k++]=m[top][j]; top++;
            for(int i=top;i<=bot;i++) out[k++]=m[i][right]; right--;
            if(top<=bot){ for(int j=right;j>=left;j--) out[k++]=m[bot][j]; bot--; }
            if(left<=right){ for(int i=bot;i>=top;i--) out[k++]=m[i][left]; left++; }
        }
        return out;
    }
}
`,
                        complexity: { time: "O(mn)", space: "O(1) extra" }
                    }
                ]
            },

            {
                title: "Set Matrix Zeroes",
                description: "If an element is 0, set its entire row and column to 0 (in-place). Return the matrix.",
                level: "medium",
                examples: [{ input: "matrix=[[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]", explanation: "" }],
                tests: [
                    { input: "[[[1,1,1],[1,0,1],[1,1,1]]]", expected: "[[1,0,1],[0,0,0],[1,0,1]]" },
                    { input: "[[[0,1,2,0],[3,4,5,2],[1,3,1,5]]]", expected: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]" },
                    { input: "[[[1]]]", expected: "[[1]]" },
                    { input: "[[[0]]]", expected: "[[0]]" },
                    { input: "[[[1,0,3]]]", expected: "[[0,0,0]]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "setZeroes",
                        starterCode: `function setZeroes(matrix){ /* TODO */ }`,
                        optimalSolution: `function setZeroes(M){
  const m=M.length,n=M[0].length;
  let r0=false,c0=false;
  for(let j=0;j<n;j++) if(M[0][j]===0) r0=true;
  for(let i=0;i<m;i++) if(M[i][0]===0) c0=true;
  for(let i=1;i<m;i++) for(let j=1;j<n;j++) if(M[i][j]===0){ M[i][0]=0; M[0][j]=0; }
  for(let i=1;i<m;i++) if(M[i][0]===0) for(let j=1;j<n;j++) M[i][j]=0;
  for(let j=1;j<n;j++) if(M[0][j]===0) for(let i=1;i<m;i++) M[i][j]=0;
  if(r0) for(let j=0;j<n;j++) M[0][j]=0;
  if(c0) for(let i=0;i<m;i++) M[i][0]=0;
  return M;
}
`,
                        complexity: { time: "O(mn)", space: "O(1)" }
                    },
                    {
                        lang: "python",
                        functionName: "setZeroes",
                        starterCode: `def setZeroes(matrix):  # List[List[int]] -> List[List[int]]
    pass
`,
                        optimalSolution: `def setZeroes(M):
    m,n=len(M),len(M[0])
    r0 = any(M[0][j]==0 for j in range(n))
    c0 = any(M[i][0]==0 for i in range(m))
    for i in range(1,m):
        for j in range(1,n):
            if M[i][j]==0:
                M[i][0]=0; M[0][j]=0
    for i in range(1,m):
        if M[i][0]==0:
            for j in range(1,n): M[i][j]=0
    for j in range(1,n):
        if M[0][j]==0:
            for i in range(1,m): M[i][j]=0
    if r0:
        for j in range(n): M[0][j]=0
    if c0:
        for i in range(m): M[i][0]=0
    return M
`,
                        complexity: { time: "O(mn)", space: "O(1)" }
                    },
                    {
                        lang: "java",
                        functionName: "setZeroes",
                        starterCode: `public class Solution { public static int[][] setZeroes(int[][] matrix){ return matrix; } }`,
                        optimalSolution: `public class Solution {
    public static int[][] setZeroes(int[][] M){
        int m=M.length,n=M[0].length;
        boolean r0=false,c0=false;
        for(int j=0;j<n;j++) if(M[0][j]==0) r0=true;
        for(int i=0;i<m;i++) if(M[i][0]==0) c0=true;
        for(int i=1;i<m;i++) for(int j=1;j<n;j++) if(M[i][j]==0){ M[i][0]=0; M[0][j]=0; }
        for(int i=1;i<m;i++) if(M[i][0]==0) for(int j=1;j<n;j++) M[i][j]=0;
        for(int j=1;j<n;j++) if(M[0][j]==0) for(int i=1;i<m;i++) M[i][j]=0;
        if(r0) for(int j=0;j<n;j++) M[0][j]=0;
        if(c0) for(int i=0;i<m;i++) M[i][0]=0;
        return M;
    }
}
`,
                        complexity: { time: "O(mn)", space: "O(1)" }
                    }
                ]
            },

            {
                title: "Number of Islands",
                description: "Given a grid of '1' (land) and '0' (water), count islands. Grid given as array of strings.",
                level: "medium",
                examples: [
                    { input: 'grid = ["11110","11010","11000","00000"]', output: "1", explanation: "" }
                ],
                tests: [
                    { input: '[["11110","11010","11000","00000"]]', expected: "1" },
                    { input: '[["11000","11000","00100","00011"]]', expected: "3" },
                    { input: '[[]]', expected: "0" },
                    { input: '[["0"]]', expected: "0" },
                    { input: '[["1"]]', expected: "1" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "numIslands",
                        starterCode: `function numIslands(grid){ /* grid: string[] */ /* TODO */ }`,
                        optimalSolution: `function numIslands(grid){
  const R=grid.length; if(!R) return 0;
  const C=grid[0].length;
  const vis=Array.from({length:R},()=>Array(C).fill(false));
  const g=grid.map(row=>row.split(''));
  let cnt=0;
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  const dfs=(r,c)=>{
    vis[r][c]=true;
    for(const [dr,dc] of dirs){
      const nr=r+dr,nc=c+dc;
      if(nr>=0&&nr<R&&nc>=0&&nc<C && !vis[nr][nc] && g[nr][nc]==='1') dfs(nr,nc);
    }
  };
  for(let r=0;r<R;r++) for(let c=0;c<C;c++){
    if(g[r][c]==='1' && !vis[r][c]){ cnt++; dfs(r,c); }
  }
  return cnt;
}
`,
                        complexity: { time: "O(RC)", space: "O(RC)" }
                    },
                    {
                        lang: "python",
                        functionName: "numIslands",
                        starterCode: `def numIslands(grid):  # List[str] -> int
    pass
`,
                        optimalSolution: `def numIslands(grid):
    R=len(grid)
    if R==0: return 0
    C=len(grid[0])
    g=[list(row) for row in grid]
    vis=[[False]*C for _ in range(R)]
    def dfs(r,c):
        vis[r][c]=True
        for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)):
            nr,nc=r+dr,c+dc
            if 0<=nr<R and 0<=nc<C and not vis[nr][nc] and g[nr][nc]=='1':
                dfs(nr,nc)
    cnt=0
    for r in range(R):
        for c in range(C):
            if g[r][c]=='1' and not vis[r][c]:
                cnt+=1; dfs(r,c)
    return cnt
`,
                        complexity: { time: "O(RC)", space: "O(RC)" }
                    },
                    {
                        lang: "java",
                        functionName: "numIslands",
                        starterCode: `public class Solution { public static int numIslands(String[] grid){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int numIslands(String[] grid){
        int R=grid.length;
        if(R==0) return 0;
        int C=grid[0].length();
        boolean[][] vis=new boolean[R][C];
        int cnt=0;
        for(int r=0;r<R;r++){
            for(int c=0;c<C;c++){
                if(grid[r].charAt(c)=='1' && !vis[r][c]){
                    cnt++;
                    dfs(grid,vis,r,c);
                }
            }
        }
        return cnt;
    }
    static void dfs(String[] g, boolean[][] vis, int r,int c){
        int R=g.length, C=g[0].length();
        vis[r][c]=true;
        int[][] d={{1,0},{-1,0},{0,1},{0,-1}};
        for(int[] v: d){
            int nr=r+v[0], nc=c+v[1];
            if(nr>=0&&nr<R&&nc>=0&&nc<C && !vis[nr][nc] && g[nr].charAt(nc)=='1')
                dfs(g,vis,nr,nc);
        }
    }
}
`,
                        complexity: { time: "O(RC)", space: "O(RC)" }
                    }
                ]
            },

            {
                title: "Flood Fill",
                description: "Perform flood fill on image starting at (sr,sc) with newColor.",
                level: "medium",
                examples: [{ input: "image=[[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, newColor=2", output: "[[2,2,2],[2,2,0],[2,0,1]]", explanation: "" }],
                tests: [
                    { input: "[[[1,1,1],[1,1,0],[1,0,1]],1,1,2]", expected: "[[2,2,2],[2,2,0],[2,0,1]]" },
                    { input: "[[[0,0,0],[0,0,0]],0,0,0]", expected: "[[0,0,0],[0,0,0]]" },
                    { input: "[[[0,0,0],[0,1,1]],1,1,1]", expected: "[[0,0,0],[0,1,1]]" },
                    { input: "[[[0,0,0]],0,2,3]", expected: "[[3,3,3]]" },
                    { input: "[[[1]],0,0,9]", expected: "[[9]]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "floodFill",
                        starterCode: `function floodFill(image, sr, sc, newColor){ /* TODO */ }`,
                        optimalSolution: `function floodFill(img,sr,sc,nc){
  const R=img.length,C=img[0].length, oc=img[sr][sc];
  if(oc===nc) return img;
  const dfs=(r,c)=>{
    if(r<0||r>=R||c<0||c>=C||img[r][c]!==oc) return;
    img[r][c]=nc;
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  };
  dfs(sr,sc); return img;
}
`,
                        complexity: { time: "O(RC)", space: "O(RC)" }
                    },
                    {
                        lang: "python",
                        functionName: "floodFill",
                        starterCode: `def floodFill(image, sr, sc, newColor):  # List[List[int]], int, int, int -> List[List[int]]
    pass
`,
                        optimalSolution: `def floodFill(img,sr,sc,nc):
    R,C=len(img),len(img[0]); oc=img[sr][sc]
    if oc==nc: return img
    def dfs(r,c):
        if r<0 or r>=R or c<0 or c>=C or img[r][c]!=oc: return
        img[r][c]=nc
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)
    dfs(sr,sc); return img
`,
                        complexity: { time: "O(RC)", space: "O(RC)" }
                    },
                    {
                        lang: "java",
                        functionName: "floodFill",
                        starterCode: `public class Solution { public static int[][] floodFill(int[][] image, int sr,int sc,int color){ return image; } }`,
                        optimalSolution: `public class Solution {
    public static int[][] floodFill(int[][] img,int sr,int sc,int nc){
        int R=img.length,C=img[0].length, oc=img[sr][sc];
        if(oc==nc) return img;
        dfs(img,sr,sc,oc,nc); return img;
    }
    static void dfs(int[][] img,int r,int c,int oc,int nc){
        int R=img.length, C=img[0].length;
        if(r<0||r>=R||c<0||c>=C||img[r][c]!=oc) return;
        img[r][c]=nc;
        dfs(img,r+1,c,oc,nc); dfs(img,r-1,c,oc,nc); dfs(img,r,c+1,oc,nc); dfs(img,r,c-1,oc,nc);
    }
}
`,
                        complexity: { time: "O(RC)", space: "O(RC)" }
                    }
                ]
            },

            {
                title: "Evaluate Reverse Polish Notation",
                description: "Evaluate expression in Reverse Polish Notation.",
                level: "medium",
                examples: [{ input: 'tokens = ["2","1","+","3","*"]', output: "9", explanation: "" }],
                tests: [
                    { input: '[["2","1","+","3","*"]]', expected: "9" },
                    { input: '[["4","13","5","/","+"]]', expected: "6" },
                    { input: '[["10","6","9","3","+","-11","*","/","*","17","+","5","+"]]', expected: "22" },
                    { input: '[["3","3","/"]]', expected: "1" },
                    { input: '[["18","-5","/"]]', expected: "-3" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "evalRPN",
                        starterCode: `function evalRPN(tokens){ /* TODO */ }`,
                        optimalSolution: `function evalRPN(tk){
  const st=[];
  const op={'+':(a,b)=>a+b,'-':(a,b)=>a-b,'*':(a,b)=>a*b,'/':(a,b)=>(a/b)|0};
  for(const x of tk){
    if(x in op){ const b=st.pop(), a=st.pop(); st.push(op[x](a,b)); }
    else st.push(Number(x));
  }
  return st.pop();
}
`,
                        complexity: { time: "O(n)", space: "O(n)" }
                    },
                    {
                        lang: "python",
                        functionName: "evalRPN",
                        starterCode: `def evalRPN(tokens):  # List[str] -> int
    pass
`,
                        optimalSolution: `def evalRPN(tk):
    st=[]
    for x in tk:
        if x in {"+","-","*","/"}:
            b=st.pop(); a=st.pop()
            if x=="+": st.append(a+b)
            elif x=="-": st.append(a-b)
            elif x=="*": st.append(a*b)
            else: st.append(int(a/ b))
        else:
            st.append(int(x))
    return st.pop()
`,
                        complexity: { time: "O(n)", space: "O(n)" }
                    },
                    {
                        lang: "java",
                        functionName: "evalRPN",
                        starterCode: `public class Solution { public static int evalRPN(String[] tokens){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int evalRPN(String[] tk){
        java.util.ArrayDeque<Integer> st=new java.util.ArrayDeque<>();
        for(String x: tk){
            switch(x){
                case "+": {int b=st.pop(),a=st.pop(); st.push(a+b); break;}
                case "-": {int b=st.pop(),a=st.pop(); st.push(a-b); break;}
                case "*": {int b=st.pop(),a=st.pop(); st.push(a*b); break;}
                case "/": {int b=st.pop(),a=st.pop(); st.push(a/b); break;}
                default: st.push(Integer.parseInt(x));
            }
        }
        return st.pop();
    }
}
`,
                        complexity: { time: "O(n)", space: "O(n)" }
                    }
                ]
            },

            {
                title: "Letter Combinations of a Phone Number",
                description: "Given digits 2-9, return all possible letter combinations in lexicographic order.",
                level: "medium",
                examples: [{ input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', explanation: "" }],
                tests: [
                    { input: '["23"]', expected: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
                    { input: '[""]', expected: "[]" },
                    { input: '["2"]', expected: '["a","b","c"]' },
                    { input: '["79"]', expected: '["pw","px","py","pz","qw","qx","qy","qz","rw","rx","ry","rz","sw","sx","sy","sz"]' },
                    { input: '["9"]', expected: '["w","x","y","z"]' }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "letterCombinations",
                        starterCode: `function letterCombinations(digits){ /* TODO */ }`,
                        optimalSolution: `function letterCombinations(d){
  if(!d.length) return [];
  const map={2:"abc",3:"def",4:"ghi",5:"jkl",6:"mno",7:"pqrs",8:"tuv",9:"wxyz"};
  const res=[];
  const dfs=(i,cur)=>{
    if(i===d.length){ res.push(cur); return; }
    for(const ch of map[d[i]]) dfs(i+1, cur+ch);
  };
  dfs(0,""); return res;
}
`,
                        complexity: { time: "O(4^n)", space: "O(n)" }
                    },
                    {
                        lang: "python",
                        functionName: "letterCombinations",
                        starterCode: `def letterCombinations(digits):  # str -> List[str]
    pass
`,
                        optimalSolution: `def letterCombinations(d):
    if not d: return []
    mp={'2':"abc",'3':"def",'4':"ghi",'5':"jkl",'6':"mno",'7':"pqrs",'8':"tuv",'9':"wxyz"}
    res=[]
    def dfs(i,cur):
        if i==len(d): res.append(cur); return
        for ch in mp[d[i]]:
            dfs(i+1, cur+ch)
    dfs(0,""); return res
`,
                        complexity: { time: "O(4^n)", space: "O(n)" }
                    },
                    {
                        lang: "java",
                        functionName: "letterCombinations",
                        starterCode: `public class Solution { public static String[] letterCombinations(String digits){ return new String[0]; } }`,
                        optimalSolution: `public class Solution {
    public static String[] letterCombinations(String d){
        if(d.length()==0) return new String[0];
        String[] mp={"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
        java.util.ArrayList<String> res=new java.util.ArrayList<>();
        dfs(d,0,new StringBuilder(),mp,res);
        return res.toArray(new String[0]);
    }
    static void dfs(String d,int i,StringBuilder cur,String[] mp,java.util.List<String> res){
        if(i==d.length()){ res.add(cur.toString()); return; }
        String s=mp[d.charAt(i)-'0'];
        for(int k=0;k<s.length();k++){ cur.append(s.charAt(k)); dfs(d,i+1,cur,mp,res); cur.deleteCharAt(cur.length()-1); }
    }
}
`,
                        complexity: { time: "O(4^n)", space: "O(n)" }
                    }
                ]
            },

            {
                title: "Generate Parentheses",
                description: "Generate all combinations of n pairs of balanced parentheses (lexicographic).",
                level: "medium",
                examples: [{ input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]', explanation: "" }],
                tests: [
                    { input: "[3]", expected: '["((()))","(()())","(())()","()(())","()()()"]' },
                    { input: "[1]", expected: '["()"]' },
                    { input: "[2]", expected: '["(())","()()"]' },
                    { input: "[4]", expected: '["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"]' },
                    { input: "[0]", expected: "[]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "generateParenthesis",
                        starterCode: `function generateParenthesis(n){ /* TODO */ }`,
                        optimalSolution: `function generateParenthesis(n){
  if(n===0) return [];
  const res=[];
  const dfs=(open,close,cur)=>{
    if(cur.length===2*n){ res.push(cur); return; }
    if(open<n) dfs(open+1,close,cur+'(');
    if(close<open) dfs(open,close+1,cur+')');
  };
  dfs(0,0,""); return res;
}
`,
                        complexity: { time: "O(Cn)", space: "O(n)" }
                    },
                    {
                        lang: "python",
                        functionName: "generateParenthesis",
                        starterCode: `def generateParenthesis(n):  # int -> List[str]
    pass
`,
                        optimalSolution: `def generateParenthesis(n):
    if n==0: return []
    res=[]
    def dfs(open,close,cur):
        if len(cur)==2*n: res.append(cur); return
        if open<n: dfs(open+1,close,cur+'(')
        if close<open: dfs(open,close+1,cur+')')
    dfs(0,0,"")
    return res
`,
                        complexity: { time: "O(Cn)", space: "O(n)" }
                    },
                    {
                        lang: "java",
                        functionName: "generateParenthesis",
                        starterCode: `public class Solution { public static String[] generateParenthesis(int n){ return new String[0]; } }`,
                        optimalSolution: `public class Solution {
    public static String[] generateParenthesis(int n){
        if(n==0) return new String[0];
        java.util.ArrayList<String> res=new java.util.ArrayList<>();
        dfs(n,0,0,new StringBuilder(),res);
        return res.toArray(new String[0]);
    }
    static void dfs(int n,int open,int close,StringBuilder cur,java.util.List<String> res){
        if(cur.length()==2*n){ res.add(cur.toString()); return; }
        if(open<n){ cur.append('('); dfs(n,open+1,close,cur,res); cur.deleteCharAt(cur.length()-1); }
        if(close<open){ cur.append(')'); dfs(n,open,close+1,cur,res); cur.deleteCharAt(cur.length()-1); }
    }
}
`,
                        complexity: { time: "O(Cn)", space: "O(n)" }
                    }
                ]
            },

            {
                title: "Subsets",
                description: "Return all subsets (the power set). Return lexicographically sorted list of subsets where each subset is sorted.",
                level: "medium",
                examples: [{ input: "nums = [1,2,3]", output: "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]", explanation: "" }],
                tests: [
                    { input: "[[1,2,3]]", expected: "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]" },
                    { input: "[[0]]", expected: "[[],[0]]" },
                    { input: "[[1,2]]", expected: "[[],[1],[1,2],[2]]" },
                    { input: "[[2,1]]", expected: "[[],[1],[1,2],[2]]" },
                    { input: "[[1,2,2]]", expected: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "subsets",
                        starterCode: `function subsets(nums){ /* TODO */ }`,
                        optimalSolution: `function subsets(nums){
  nums.sort((a,b)=>a-b);
  const res=[[]];
  for(const x of nums){
    const L=res.length;
    for(let i=0;i<L;i++) res.push(res[i].concat([x]));
  }
  // remove duplicates caused by repeated numbers by using map of JSON if needed:
  const seen=new Set(), out=[];
  for(const s of res){
    const key=JSON.stringify(s);
    if(!seen.has(key)){ seen.add(key); out.push(s); }
  }
  return out;
}
`,
                        complexity: { time: "O(n 2^n)", space: "O(n 2^n)" }
                    },
                    {
                        lang: "python",
                        functionName: "subsets",
                        starterCode: `def subsets(nums):  # List[int] -> List[List[int]]
    pass
`,
                        optimalSolution: `def subsets(nums):
    nums.sort()
    res=[[]]
    for x in nums:
        res += [s+[x] for s in res]
    # dedup for duplicates
    seen=set(); out=[]
    for s in res:
        t=tuple(s)
        if t not in seen:
            seen.add(t); out.append(list(s))
    return out
`,
                        complexity: { time: "O(n 2^n)", space: "O(n 2^n)" }
                    },
                    {
                        lang: "java",
                        functionName: "subsets",
                        starterCode: `public class Solution { public static int[][] subsets(int[] nums){ return new int[0][0]; } }`,
                        optimalSolution: `public class Solution {
    public static int[][] subsets(int[] nums){
        java.util.Arrays.sort(nums);
        java.util.List<java.util.List<Integer>> res=new java.util.ArrayList<>();
        res.add(new java.util.ArrayList<>());
        for(int x: nums){
            int L=res.size();
            for(int i=0;i<L;i++){
                java.util.ArrayList<Integer> t=new java.util.ArrayList<>(res.get(i));
                t.add(x); res.add(t);
            }
        }
        // dedup
        java.util.Set<String> seen=new java.util.HashSet<>();
        java.util.ArrayList<int[]> out=new java.util.ArrayList<>();
        for(java.util.List<Integer> s: res){
            String key=s.toString();
            if(seen.add(key)){
                int[] arr=new int[s.size()];
                for(int i=0;i<s.size();i++) arr[i]=s.get(i);
                out.add(arr);
            }
        }
        int[][] ans=new int[out.size()][];
        for(int i=0;i<out.size();i++) ans[i]=out.get(i);
        return ans;
    }
}
`,
                        complexity: { time: "O(n 2^n)", space: "O(n 2^n)" }
                    }
                ]
            },

            {
                title: "Permutations",
                description: "Return all permutations of the array (distinct numbers). Order lexicographic.",
                level: "medium",
                examples: [{ input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "" }],
                tests: [
                    { input: "[[1,2,3]]", expected: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
                    { input: "[[0,1]]", expected: "[[0,1],[1,0]]" },
                    { input: "[[1]]", expected: "[[1]]" },
                    { input: "[[2,1]]", expected: "[[1,2],[2,1]]" },
                    { input: "[[3,3,0,3]]", expected: "[[0,3,3,3],[3,0,3,3],[3,3,0,3],[3,3,3,0]]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "permute",
                        starterCode: `function permute(nums){ /* TODO */ }`,
                        optimalSolution: `function permute(nums){
  nums.sort((a,b)=>a-b);
  const res=[], used=Array(nums.length).fill(false), cur=[];
  const dfs=()=>{
    if(cur.length===nums.length){ res.push(cur.slice()); return; }
    for(let i=0;i<nums.length;i++){
      if(used[i]) continue;
      if(i>0 && nums[i]===nums[i-1] && !used[i-1]) continue;
      used[i]=true; cur.push(nums[i]); dfs(); cur.pop(); used[i]=false;
    }
  };
  dfs(); return res;
}
`,
                        complexity: { time: "O(n·n!)", space: "O(n)" }
                    },
                    {
                        lang: "python",
                        functionName: "permute",
                        starterCode: `def permute(nums):  # List[int] -> List[List[int]]
    pass
`,
                        optimalSolution: `def permute(nums):
    nums.sort()
    res=[]; used=[False]*len(nums); cur=[]
    def dfs():
        if len(cur)==len(nums): res.append(cur[:]); return
        for i in range(len(nums)):
            if used[i]: continue
            if i and nums[i]==nums[i-1] and not used[i-1]: continue
            used[i]=True; cur.append(nums[i]); dfs(); cur.pop(); used[i]=False
    dfs(); return res
`,
                        complexity: { time: "O(n·n!)", space: "O(n)" }
                    },
                    {
                        lang: "java",
                        functionName: "permute",
                        starterCode: `public class Solution { public static int[][] permute(int[] nums){ return new int[0][0]; } }`,
                        optimalSolution: `public class Solution {
    public static int[][] permute(int[] nums){
        java.util.Arrays.sort(nums);
        java.util.ArrayList<int[]> res=new java.util.ArrayList<>();
        boolean[] used=new boolean[nums.length];
        java.util.ArrayList<Integer> cur=new java.util.ArrayList<>();
        dfs(nums,used,cur,res);
        int[][] ans=new int[res.size()][];
        for(int i=0;i<res.size();i++) ans[i]=res.get(i);
        return ans;
    }
    static void dfs(int[] nums, boolean[] used, java.util.ArrayList<Integer> cur, java.util.ArrayList<int[]> res){
        if(cur.size()==nums.length){
            int[] arr=new int[cur.size()];
            for(int i=0;i<arr.length;i++) arr[i]=cur.get(i);
            res.add(arr); return;
        }
        for(int i=0;i<nums.length;i++){
            if(used[i]) continue;
            if(i>0 && nums[i]==nums[i-1] && !used[i-1]) continue;
            used[i]=true; cur.add(nums[i]); dfs(nums,used,cur,res); cur.remove(cur.size()-1); used[i]=false;
        }
    }
}
`,
                        complexity: { time: "O(n·n!)", space: "O(n)" }
                    }
                ]
            },

            {
                title: "Combination Sum",
                description: "Find all unique combinations where candidates (reuse allowed) sum to target. Return lexicographically sorted list; each combo sorted.",
                level: "medium",
                examples: [{ input: "candidates=[2,3,6,7], target=7", output: "[[2,2,3],[7]]", explanation: "" }],
                tests: [
                    { input: "[[2,3,6,7],7]", expected: "[[2,2,3],[7]]" },
                    { input: "[[2,3,5],8]", expected: "[[2,2,2,2],[2,3,3],[3,5]]" },
                    { input: "[[2],1]", expected: "[]" },
                    { input: "[[1],1]", expected: "[[1]]" },
                    { input: "[[1],2]", expected: "[[1,1]]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "combinationSum",
                        starterCode: `function combinationSum(candidates, target){ /* TODO */ }`,
                        optimalSolution: `function combinationSum(c, target){
  c.sort((a,b)=>a-b);
  const res=[], cur=[];
  const dfs=(i, rem)=>{
    if(rem===0){ res.push(cur.slice()); return; }
    if(i===c.length || rem<0) return;
    // take
    cur.push(c[i]); dfs(i, rem-c[i]); cur.pop();
    // skip
    dfs(i+1, rem);
  };
  dfs(0,target);
  return res;
}
`,
                        complexity: { time: "O(S)", space: "O(target)" }
                    },
                    {
                        lang: "python",
                        functionName: "combinationSum",
                        starterCode: `def combinationSum(candidates, target):  # List[int], int -> List[List[int]]
    pass
`,
                        optimalSolution: `def combinationSum(c, target):
    c.sort()
    res=[]; cur=[]
    def dfs(i, rem):
        if rem==0: res.append(cur[:]); return
        if i==len(c) or rem<0: return
        cur.append(c[i]); dfs(i, rem-c[i]); cur.pop()
        dfs(i+1, rem)
    dfs(0,target)
    return res
`,
                        complexity: { time: "O(S)", space: "O(target)" }
                    },
                    {
                        lang: "java",
                        functionName: "combinationSum",
                        starterCode: `public class Solution { public static int[][] combinationSum(int[] candidates, int target){ return new int[0][0]; } }`,
                        optimalSolution: `public class Solution {
    public static int[][] combinationSum(int[] c, int target){
        java.util.Arrays.sort(c);
        java.util.ArrayList<int[]> res=new java.util.ArrayList<>();
        java.util.ArrayList<Integer> cur=new java.util.ArrayList<>();
        dfs(c,0,target,cur,res);
        int[][] ans=new int[res.size()][];
        for(int i=0;i<res.size();i++) ans[i]=res.get(i);
        return ans;
    }
    static void dfs(int[] c,int i,int rem,java.util.ArrayList<Integer> cur,java.util.ArrayList<int[]> res){
        if(rem==0){
            int[] arr=new int[cur.size()];
            for(int k=0;k<arr.length;k++) arr[k]=cur.get(k);
            res.add(arr); return;
        }
        if(i==c.length || rem<0) return;
        cur.add(c[i]); dfs(c,i,rem-c[i],cur,res); cur.remove(cur.size()-1);
        dfs(c,i+1,rem,cur,res);
    }
}
`,
                        complexity: { time: "O(S)", space: "O(target)" }
                    }
                ]
            },

            {
                title: "Search a 2D Matrix",
                description: "Matrix has rows sorted left-to-right and first element of each row > last of previous. Search target.",
                level: "medium",
                examples: [{ input: "matrix=[[1,3,5,7],[10,11,16,20],[23,30,34,60]], target=3", output: "true", explanation: "" }],
                tests: [
                    { input: "[[[1,3,5,7],[10,11,16,20],[23,30,34,60]],3]", expected: "true" },
                    { input: "[[[1,3,5,7],[10,11,16,20],[23,30,34,60]],13]", expected: "false" },
                    { input: "[[[1]],1]", expected: "true" },
                    { input: "[[[1,2]],2]", expected: "true" },
                    { input: "[[[1,3,5]],4]", expected: "false" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "searchMatrix",
                        starterCode: `function searchMatrix(matrix, target){ /* TODO */ }`,
                        optimalSolution: `function searchMatrix(m,t){
  const R=m.length, C=m[0].length;
  let l=0,r=R*C-1;
  while(l<=r){
    const mid=(l+r>>1), i=(mid/C)|0, j=mid%C;
    if(m[i][j]===t) return true;
    if(m[i][j]<t) l=mid+1; else r=mid-1;
  }
  return false;
}
`,
                        complexity: { time: "O(log mn)", space: "O(1)" }
                    },
                    {
                        lang: "python",
                        functionName: "searchMatrix",
                        starterCode: `def searchMatrix(matrix, target):  # List[List[int]], int -> bool
    pass
`,
                        optimalSolution: `def searchMatrix(m,t):
    R,C=len(m),len(m[0])
    l,r=0,R*C-1
    while l<=r:
        mid=(l+r)//2
        i,j=divmod(mid,C)
        if m[i][j]==t: return True
        if m[i][j]<t: l=mid+1
        else: r=mid-1
    return False
`,
                        complexity: { time: "O(log mn)", space: "O(1)" }
                    },
                    {
                        lang: "java",
                        functionName: "searchMatrix",
                        starterCode: `public class Solution { public static boolean searchMatrix(int[][] matrix, int target){ return false; } }`,
                        optimalSolution: `public class Solution {
    public static boolean searchMatrix(int[][] m, int t){
        int R=m.length, C=m[0].length;
        int l=0, r=R*C-1;
        while(l<=r){
            int mid=(l+r)/2, i=mid/C, j=mid%C;
            if(m[i][j]==t) return true;
            if(m[i][j]<t) l=mid+1; else r=mid-1;
        }
        return false;
    }
}
`,
                        complexity: { time: "O(log mn)", space: "O(1)" }
                    }
                ]
            },

            {
                title: "Word Break",
                description: "Return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
                level: "medium",
                examples: [{ input: 's="leetcode", wordDict=["leet","code"]', output: "true", explanation: "" }],
                tests: [
                    { input: '["leetcode",["leet","code"]]', expected: "true" },
                    { input: '["applepenapple",["apple","pen"]]', expected: "true" },
                    { input: '["catsandog",["cats","dog","sand","and","cat"]]', expected: "false" },
                    { input: '["aaaaaaa",["aaaa","aaa"]]', expected: "true" },
                    { input: '["",["a"]]', expected: "true" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "wordBreak",
                        starterCode: `function wordBreak(s, wordDict){ /* TODO */ }`,
                        optimalSolution: `function wordBreak(s, dict){
  const D=new Set(dict), n=s.length, dp=Array(n+1).fill(false); dp[0]=true;
  for(let i=1;i<=n;i++){
    for(let j=0;j<i;j++){
      if(dp[j] && D.has(s.slice(j,i))){ dp[i]=true; break; }
    }
  }
  return dp[n];
}
`,
                        complexity: { time: "O(n^2)", space: "O(n)" }
                    },
                    {
                        lang: "python",
                        functionName: "wordBreak",
                        starterCode: `def wordBreak(s, wordDict):  # str, List[str] -> bool
    pass
`,
                        optimalSolution: `def wordBreak(s, dict):
    D=set(dict); n=len(s); dp=[False]*(n+1); dp[0]=True
    for i in range(1,n+1):
        for j in range(i):
            if dp[j] and s[j:i] in D:
                dp[i]=True; break
    return dp[n]
`,
                        complexity: { time: "O(n^2)", space: "O(n)" }
                    },
                    {
                        lang: "java",
                        functionName: "wordBreak",
                        starterCode: `public class Solution { public static boolean wordBreak(String s, String[] wordDict){ return false; } }`,
                        optimalSolution: `public class Solution {
    public static boolean wordBreak(String s, String[] wordDict){
        java.util.HashSet<String> D=new java.util.HashSet<>();
        for(String w: wordDict) D.add(w);
        int n=s.length(); boolean[] dp=new boolean[n+1]; dp[0]=true;
        for(int i=1;i<=n;i++){
            for(int j=0;j<i;j++){
                if(dp[j] && D.contains(s.substring(j,i))){ dp[i]=true; break; }
            }
        }
        return dp[n];
    }
}
`,
                        complexity: { time: "O(n^2)", space: "O(n)" }
                    }
                ]
            },

            {
                title: "Word Search",
                description: "Given board (array of strings) and word, return true if word exists by adjacent cells without reuse.",
                level: "medium",
                examples: [{ input: 'board = ["ABCE","SFCS","ADEE"], word="ABCCED"', output: "true", explanation: "" }],
                tests: [
                    { input: '[["ABCE","SFCS","ADEE"],"ABCCED"]', expected: "true" },
                    { input: '[["ABCE","SFCS","ADEE"],"SEE"]', expected: "true" },
                    { input: '[["ABCE","SFCS","ADEE"],"ABCB"]', expected: "false" },
                    { input: '[["A"],"A"]', expected: "true" },
                    { input: '[["A"],"B"]', expected: "false" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "existWord",
                        starterCode: `function existWord(board, word){ /* board: string[] */ /* TODO */ }`,
                        optimalSolution: `function existWord(board, word){
  const R=board.length, C=board[0].length;
  const g=board.map(r=>r.split(''));
  const vis=Array.from({length:R},()=>Array(C).fill(false));
  const dfs=(r,c,i)=>{
    if(i===word.length) return true;
    if(r<0||r>=R||c<0||c>=C||vis[r][c]||g[r][c]!==word[i]) return false;
    vis[r][c]=true;
    const ok = dfs(r+1,c,i+1) || dfs(r-1,c,i+1) || dfs(r,c+1,i+1) || dfs(r,c-1,i+1);
    vis[r][c]=false;
    return ok;
  };
  for(let r=0;r<R;r++) for(let c=0;c<C;c++) if(dfs(r,c,0)) return true;
  return false;
}
`,
                        complexity: { time: "O(RC·4^L)", space: "O(L)" }
                    },
                    {
                        lang: "python",
                        functionName: "existWord",
                        starterCode: `def existWord(board, word):  # List[str], str -> bool
    pass
`,
                        optimalSolution: `def existWord(board, word):
    R=len(board); C=len(board[0])
    g=[list(r) for r in board]
    vis=[[False]*C for _ in range(R)]
    def dfs(r,c,i):
        if i==len(word): return True
        if r<0 or r>=R or c<0 or c>=C or vis[r][c] or g[r][c]!=word[i]: return False
        vis[r][c]=True
        ok = dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or dfs(r,c+1,i+1) or dfs(r,c-1,i+1)
        vis[r][c]=False
        return ok
    for r in range(R):
        for c in range(C):
            if dfs(r,c,0): return True
    return False
`,
                        complexity: { time: "O(RC·4^L)", space: "O(L)" }
                    },
                    {
                        lang: "java",
                        functionName: "existWord",
                        starterCode: `public class Solution { public static boolean existWord(String[] board, String word){ return false; } }`,
                        optimalSolution: `public class Solution {
    public static boolean existWord(String[] board, String word){
        int R=board.length, C=board[0].length();
        boolean[][] vis=new boolean[R][C];
        for(int r=0;r<R;r++) for(int c=0;c<C;c++) if(dfs(board,word,vis,r,c,0)) return true;
        return false;
    }
    static boolean dfs(String[] b,String w, boolean[][] vis,int r,int c,int i){
        int R=b.length, C=b[0].length();
        if(i==w.length()) return true;
        if(r<0||r>=R||c<0||c>=C||vis[r][c]||b[r].charAt(c)!=w.charAt(i)) return false;
        vis[r][c]=true;
        boolean ok = dfs(b,w,vis,r+1,c,i+1) || dfs(b,w,vis,r-1,c,i+1) || dfs(b,w,vis,r,c+1,i+1) || dfs(b,w,vis,r,c-1,i+1);
        vis[r][c]=false;
        return ok;
    }
}
`,
                        complexity: { time: "O(RC·4^L)", space: "O(L)" }
                    }
                ]
            },

            {
                title: "Longest Repeating Character Replacement",
                description: "Given s and k, find length of the longest substring that can be made of the same letter after replacing up to k characters.",
                level: "medium",
                examples: [{ input: 's="ABAB", k=2', output: "4", explanation: "" }],
                tests: [
                    { input: '["ABAB",2]', expected: "4" },
                    { input: '["AABABBA",1]', expected: "4" },
                    { input: '["AAAA",2]', expected: "4" },
                    { input: '["XYZ",0]', expected: "1" },
                    { input: '["BAAAB",2]', expected: "5" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "characterReplacement",
                        starterCode: `function characterReplacement(s, k){ /* TODO */ }`,
                        optimalSolution: `function characterReplacement(s,k){
  const cnt=new Array(26).fill(0);
  let L=0, best=0, maxCnt=0;
  for(let R=0;R<s.length;R++){
    const idx=s.charCodeAt(R)-65; cnt[idx]++; maxCnt=Math.max(maxCnt,cnt[idx]);
    while(R-L+1 - maxCnt > k){ cnt[s.charCodeAt(L)-65]--; L++; }
    best=Math.max(best, R-L+1);
  }
  return best;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "python",
                        functionName: "characterReplacement",
                        starterCode: `def characterReplacement(s, k):  # str, int -> int
    pass
`,
                        optimalSolution: `def characterReplacement(s,k):
    cnt=[0]*26; L=0; best=0; maxCnt=0
    for R,ch in enumerate(s):
        idx=ord(s[R])-65; cnt[idx]+=1; maxCnt=max(maxCnt,cnt[idx])
        while (R-L+1) - maxCnt > k:
            cnt[ord(s[L])-65]-=1; L+=1
        best=max(best, R-L+1)
    return best
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "java",
                        functionName: "characterReplacement",
                        starterCode: `public class Solution { public static int characterReplacement(String s, int k){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int characterReplacement(String s, int k){
        int[] cnt=new int[26]; int L=0,best=0,maxCnt=0;
        for(int R=0;R<s.length();R++){
            int idx=s.charAt(R)-'A'; cnt[idx]++; if(cnt[idx]>maxCnt) maxCnt=cnt[idx];
            while(R-L+1 - maxCnt > k){ cnt[s.charAt(L)-'A']--; L++; }
            best=Math.max(best, R-L+1);
        }
        return best;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    }
                ]
            },

            // ---- 6 more to reach 20 medium ----

            {
                title: "Add Two Numbers (arrays as reversed lists)",
                description: "Given two non-empty arrays representing two non-negative integers in reverse order, return the sum as an array in reverse order.",
                level: "medium",
                examples: [{ input: "l1=[2,4,3], l2=[5,6,4]", output: "[7,0,8]", explanation: "342+465=807" }],
                tests: [
                    { input: "[[2,4,3],[5,6,4]]", expected: "[7,0,8]" },
                    { input: "[[0],[0]]", expected: "[0]" },
                    { input: "[[9,9,9,9,9,9,9],[9,9,9,9]]", expected: "[8,9,9,9,0,0,0,1]" },
                    { input: "[[1,8],[0]]", expected: "[1,8]" },
                    { input: "[[0],[7,3]]", expected: "[7,3]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "addTwoNumbersArr",
                        starterCode: `function addTwoNumbersArr(l1, l2){ /* TODO */ }`,
                        optimalSolution: `function addTwoNumbersArr(a,b){
  const res=[]; let i=0,j=0,carry=0;
  while(i<a.length||j<b.length||carry){
    const s=(a[i]||0)+(b[j]||0)+carry;
    res.push(s%10); carry=(s/10)|0; i++; j++;
  }
  return res;
}
`,
                        complexity: { time: "O(max(m,n))", space: "O(max(m,n))" }
                    },
                    {
                        lang: "python",
                        functionName: "addTwoNumbersArr",
                        starterCode: `def addTwoNumbersArr(l1, l2):  # List[int], List[int] -> List[int]
    pass
`,
                        optimalSolution: `def addTwoNumbersArr(a,b):
    res=[]; i=j=0; carry=0
    while i<len(a) or j<len(b) or carry:
        s=(a[i] if i<len(a) else 0)+(b[j] if j<len(b) else 0)+carry
        res.append(s%10); carry=s//10; i+=1; j+=1
    return res
`,
                        complexity: { time: "O(max(m,n))", space: "O(max(m,n))" }
                    },
                    {
                        lang: "java",
                        functionName: "addTwoNumbersArr",
                        starterCode: `public class Solution { public static int[] addTwoNumbersArr(int[] l1, int[] l2){ return new int[0]; } }`,
                        optimalSolution: `public class Solution {
    public static int[] addTwoNumbersArr(int[] a, int[] b){
        java.util.ArrayList<Integer> list=new java.util.ArrayList<>();
        int i=0,j=0,carry=0;
        while(i<a.length || j<b.length || carry>0){
            int s=(i<a.length? a[i]:0) + (j<b.length? b[j]:0) + carry;
            list.add(s%10); carry=s/10; i++; j++;
        }
        int[] res=new int[list.size()];
        for(int k=0;k<res.length;k++) res[k]=list.get(k);
        return res;
    }
}
`,
                        complexity: { time: "O(max(m,n))", space: "O(max(m,n))" }
                    }
                ]
            },

            {
                title: "Insert Interval",
                description: "Insert a new interval into a list of non-overlapping intervals sorted by start; merge as needed.",
                level: "medium",
                examples: [{ input: "intervals=[[1,3],[6,9]], newInterval=[2,5]", output: "[[1,5],[6,9]]", explanation: "" }],
                tests: [
                    { input: "[[[1,3],[6,9]],[2,5]]", expected: "[[1,5],[6,9]]" },
                    { input: "[[[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]]", expected: "[[1,2],[3,10],[12,16]]" },
                    { input: "[[[],[5,7]]]", expected: "[[5,7]]" },
                    { input: "[[[1,5]],[2,3]]", expected: "[[1,5]]" },
                    { input: "[[[1,5]],[6,8]]", expected: "[[1,5],[6,8]]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "insertInterval",
                        starterCode: `function insertInterval(intervals, newInterval){ /* TODO */ }`,
                        optimalSolution: `function insertInterval(a, ni){
  const res=[];
  let [s,e]=ni, i=0;
  while(i<a.length && a[i][1]<s) res.push(a[i++]);
  while(i<a.length && a[i][0]<=e){ s=Math.min(s,a[i][0]); e=Math.max(e,a[i][1]); i++; }
  res.push([s,e]);
  while(i<a.length) res.push(a[i++]);
  return res;
}
`,
                        complexity: { time: "O(n)", space: "O(1) extra" }
                    },
                    {
                        lang: "python",
                        functionName: "insertInterval",
                        starterCode: `def insertInterval(intervals, newInterval):  # List[List[int]], List[int] -> List[List[int]]
    pass
`,
                        optimalSolution: `def insertInterval(a, ni):
    res=[]; s,e=ni; i=0
    while i<len(a) and a[i][1]<s:
        res.append(a[i]); i+=1
    while i<len(a) and a[i][0]<=e:
        s=min(s,a[i][0]); e=max(e,a[i][1]); i+=1
    res.append([s,e])
    while i<len(a):
        res.append(a[i]); i+=1
    return res
`,
                        complexity: { time: "O(n)", space: "O(1) extra" }
                    },
                    {
                        lang: "java",
                        functionName: "insertInterval",
                        starterCode: `public class Solution { public static int[][] insertInterval(int[][] intervals, int[] newInterval){ return new int[0][0]; } }`,
                        optimalSolution: `public class Solution {
    public static int[][] insertInterval(int[][] a, int[] ni){
        java.util.ArrayList<int[]> res=new java.util.ArrayList<>();
        int s=ni[0], e=ni[1], i=0;
        while(i<a.length && a[i][1]<s) res.add(a[i++]);
        while(i<a.length && a[i][0]<=e){ s=Math.min(s,a[i][0]); e=Math.max(e,a[i][1]); i++; }
        res.add(new int[]{s,e});
        while(i<a.length) res.add(a[i++]);
        int[][] out=new int[res.size()][2];
        for(i=0;i<res.size();i++) out[i]=res.get(i);
        return out;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1) extra" }
                    }
                ]
            },

            {
                title: "Rotate Array Left by k",
                description: "Rotate array to the left by k (return rotated array).",
                level: "medium",
                examples: [{ input: "nums=[1,2,3,4,5], k=2", output: "[3,4,5,1,2]", explanation: "" }],
                tests: [
                    { input: "[[1,2,3,4,5],2]", expected: "[3,4,5,1,2]" },
                    { input: "[[1],0]", expected: "[1]" },
                    { input: "[[1,2],1]", expected: "[2,1]" },
                    { input: "[[1,2,3],4]", expected: "[2,3,1]" },
                    { input: "[[0,0,0],1]", expected: "[0,0,0]" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "rotateLeft",
                        starterCode: `function rotateLeft(nums, k){ /* TODO */ }`,
                        optimalSolution: `function rotateLeft(a,k){
  const n=a.length; if(!n) return a; k%=n;
  const reverse=(l,r)=>{ while(l<r){ [a[l],a[r]]=[a[r],a[l]]; l++; r--; } };
  reverse(0,k-1); reverse(k,n-1); reverse(0,n-1); return a;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "python",
                        functionName: "rotateLeft",
                        starterCode: `def rotateLeft(nums, k):  # List[int], int -> List[int]
    pass
`,
                        optimalSolution: `def rotateLeft(a,k):
    n=len(a)
    if n==0: return a
    k%=n
    a[:]=a[k:]+a[:k]
    return a
`,
                        complexity: { time: "O(n)", space: "O(1) extra" }
                    },
                    {
                        lang: "java",
                        functionName: "rotateLeft",
                        starterCode: `public class Solution { public static int[] rotateLeft(int[] nums, int k){ return nums; } }`,
                        optimalSolution: `public class Solution {
    public static int[] rotateLeft(int[] a, int k){
        int n=a.length; if(n==0) return a; k%=n;
        rev(a,0,k-1); rev(a,k,n-1); rev(a,0,n-1); return a;
    }
    static void rev(int[] a,int l,int r){ while(l<r){ int t=a[l]; a[l]=a[r]; a[r]=t; l++; r--; } }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    }
                ]
            },

            {
                title: "Minimum Size Subarray Sum",
                description: "Given target and array of positives, return minimal length of a contiguous subarray of which the sum ≥ target; else 0.",
                level: "medium",
                examples: [{ input: "target=7, nums=[2,3,1,2,4,3]", output: "2", explanation: "[4,3]" }],
                tests: [
                    { input: "[7,[2,3,1,2,4,3]]", expected: "2" },
                    { input: "[4,[1,4,4]]", expected: "1" },
                    { input: "[11,[1,1,1,1,1,1,1,1]]", expected: "0" },
                    { input: "[5,[2,3,1,1,1]]", expected: "2" },
                    { input: "[3,[1,1]]", expected: "0" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "minSubArrayLen",
                        starterCode: `function minSubArrayLen(target, nums){ /* TODO */ }`,
                        optimalSolution: `function minSubArrayLen(t,a){
  let L=0,sum=0, best=Infinity;
  for(let R=0;R<a.length;R++){
    sum+=a[R];
    while(sum>=t){ best=Math.min(best, R-L+1); sum-=a[L++]; }
  }
  return best===Infinity? 0: best;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "python",
                        functionName: "minSubArrayLen",
                        starterCode: `def minSubArrayLen(target, nums):  # int, List[int] -> int
    pass
`,
                        optimalSolution: `def minSubArrayLen(t,a):
    L=0; s=0; best=10**9
    for R,x in enumerate(a):
        s+=x
        while s>=t:
            best=min(best, R-L+1); s-=a[L]; L+=1
    return 0 if best==10**9 else best
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "java",
                        functionName: "minSubArrayLen",
                        starterCode: `public class Solution { public static int minSubArrayLen(int target, int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int minSubArrayLen(int t, int[] a){
        int L=0, s=0, best=Integer.MAX_VALUE;
        for(int R=0;R<a.length;R++){
            s+=a[R];
            while(s>=t){ best=Math.min(best, R-L+1); s-=a[L++]; }
        }
        return best==Integer.MAX_VALUE? 0: best;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    }
                ]
            },

            {
                title: "Find Peak Element",
                description: "Find a peak element index (nums[i] > neighbors). If multiple peaks, return any.",
                level: "medium",
                examples: [{ input: "nums=[1,2,3,1]", output: "2", explanation: "" }],
                tests: [
                    { input: "[[1,2,3,1]]", expected: "2" },
                    { input: "[[1,2,1,3,5,6,4]]", expected: "5" },
                    { input: "[[1]]", expected: "0" },
                    { input: "[[2,1]]", expected: "0" },
                    { input: "[[1,2]]", expected: "1" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "findPeakElement",
                        starterCode: `function findPeakElement(nums){ /* TODO */ }`,
                        optimalSolution: `function findPeakElement(a){
  let l=0,r=a.length-1;
  while(l<r){
    const m=(l+r>>1);
    if(a[m]<a[m+1]) l=m+1; else r=m;
  }
  return l;
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" }
                    },
                    {
                        lang: "python",
                        functionName: "findPeakElement",
                        starterCode: `def findPeakElement(nums):  # List[int] -> int
    pass
`,
                        optimalSolution: `def findPeakElement(a):
    l,r=0,len(a)-1
    while l<r:
        m=(l+r)//2
        if a[m]<a[m+1]: l=m+1
        else: r=m
    return l
`,
                        complexity: { time: "O(log n)", space: "O(1)" }
                    },
                    {
                        lang: "java",
                        functionName: "findPeakElement",
                        starterCode: `public class Solution { public static int findPeakElement(int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int findPeakElement(int[] a){
        int l=0,r=a.length-1;
        while(l<r){
            int m=(l+r)/2;
            if(a[m]<a[m+1]) l=m+1; else r=m;
        }
        return l;
    }
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" }
                    }
                ]
            },

            {
                title: "Search Insert Position",
                description: "Return index where target should be inserted to maintain order.",
                level: "medium",
                examples: [{ input: "nums=[1,3,5,6], target=5", output: "2", explanation: "" }],
                tests: [
                    { input: "[[1,3,5,6],5]", expected: "2" },
                    { input: "[[1,3,5,6],2]", expected: "1" },
                    { input: "[[1,3,5,6],7]", expected: "4" },
                    { input: "[[1,3,5,6],0]", expected: "0" },
                    { input: "[[1,3],2]", expected: "1" }
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "searchInsert",
                        starterCode: `function searchInsert(nums, target){ /* TODO */ }`,
                        optimalSolution: `function searchInsert(a,t){
  let l=0,r=a.length;
  while(l<r){
    const m=(l+r>>1);
    if(a[m]<t) l=m+1; else r=m;
  }
  return l;
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" }
                    },
                    {
                        lang: "python",
                        functionName: "searchInsert",
                        starterCode: `def searchInsert(nums, target):  # List[int], int -> int
    pass
`,
                        optimalSolution: `def searchInsert(a,t):
    l,r=0,len(a)
    while l<r:
        m=(l+r)//2
        if a[m]<t: l=m+1
        else: r=m
    return l
`,
                        complexity: { time: "O(log n)", space: "O(1)" }
                    },
                    {
                        lang: "java",
                        functionName: "searchInsert",
                        starterCode: `public class Solution { public static int searchInsert(int[] nums, int target){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int searchInsert(int[] a, int t){
        int l=0,r=a.length;
        while(l<r){
            int m=(l+r)/2;
            if(a[m]<t) l=m+1; else r=m;
        }
        return l;
    }
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" }
                    }
                ]
            }
        ];



        // ---------- 20 HARD PROBLEMS ----------
        const hardProblems = [
            {
                title: "Trapping Rain Water",
                description: "Given heights of bars, compute how much water it can trap.",
                level: "hard",
                examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "" }],
                tests: [
                    { input: "[[0,1,0,2,1,0,1,3,2,1,2,1]]", expected: "6" },
                    { input: "[[4,2,0,3,2,5]]", expected: "9" },
                    { input: "[[1,0,2,1,0,1,3]]", expected: "5" },
                    { input: "[[0,0,0]]", expected: "0" },
                    { input: "[[2,0,2]]", expected: "2" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "trap",
                        starterCode: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  // TODO: implement
}
`,
                        optimalSolution: `function trap(h){
  let l=0,r=h.length-1,lm=0,rm=0,ans=0;
  while(l<r){
    if(h[l]<=h[r]){
      lm=Math.max(lm,h[l]); ans+=lm-h[l]; l++;
    }else{
      rm=Math.max(rm,h[r]); ans+=rm-h[r]; r--;
    }
  }
  return ans;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "trap",
                        starterCode: `# @param height: List[int]
# @return int
def trap(height):
    # TODO: implement
    pass
`,
                        optimalSolution: `def trap(h):
    l,r=0,len(h)-1; lm=rm=0; ans=0
    while l<r:
        if h[l]<=h[r]:
            lm=max(lm,h[l]); ans+=lm-h[l]; l+=1
        else:
            rm=max(rm,h[r]); ans+=rm-h[r]; r-=1
    return ans
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "trap",
                        starterCode: `public class Solution {
    public static int trap(int[] height){
        // TODO: implement
        return 0;
    }
}
`,
                        optimalSolution: `public class Solution {
    public static int trap(int[] h){
        int l=0,r=h.length-1,lm=0,rm=0,ans=0;
        while(l<r){
            if(h[l]<=h[r]){
                lm=Math.max(lm,h[l]); ans+=lm-h[l]; l++;
            }else{
                rm=Math.max(rm,h[r]); ans+=rm-h[r]; r--;
            }
        }
        return ans;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Largest Rectangle in Histogram",
                description: "Given bar heights, find the largest rectangle area.",
                level: "hard",
                examples: [{ input: "heights = [2,1,5,6,2,3]", output: "10", explanation: "" }],
                tests: [
                    { input: "[[2,1,5,6,2,3]]", expected: "10" },
                    { input: "[[2,4]]", expected: "4" },
                    { input: "[[1,1]]", expected: "2" },
                    { input: "[[6,7,5,2,4,5,9,3]]", expected: "16" },
                    { input: "[[1,2,3,4,5]]", expected: "9" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "largestRectangleArea",
                        starterCode: `function largestRectangleArea(heights){ /* TODO */ }`,
                        optimalSolution: `function largestRectangleArea(h){
  const st=[]; let best=0;
  for(let i=0;i<=h.length;i++){
    const cur = i===h.length ? 0 : h[i];
    while(st.length && cur < h[st[st.length-1]]){
      const height=h[st.pop()];
      const left=st.length? st[st.length-1]+1 : 0;
      const width=i-left;
      best=Math.max(best,height*width);
    }
    st.push(i);
  }
  return best;
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "python",
                        functionName: "largestRectangleArea",
                        starterCode: `def largestRectangleArea(heights):  # List[int] -> int
    pass
`,
                        optimalSolution: `def largestRectangleArea(h):
    st=[]; best=0
    for i in range(len(h)+1):
        cur = 0 if i==len(h) else h[i]
        while st and cur < h[st[-1]]:
            height=h[st.pop()]
            left= st[-1]+1 if st else 0
            best=max(best, height*(i-left))
        st.append(i)
    return best
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "java",
                        functionName: "largestRectangleArea",
                        starterCode: `public class Solution { public static int largestRectangleArea(int[] heights){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int largestRectangleArea(int[] h){
        java.util.ArrayDeque<Integer> st=new java.util.ArrayDeque<>();
        int best=0;
        for(int i=0;i<=h.length;i++){
            int cur = i==h.length? 0 : h[i];
            while(!st.isEmpty() && cur < h[st.peek()]){
                int height=h[st.pop()];
                int left = st.isEmpty()? 0 : st.peek()+1;
                int width = i - left;
                best=Math.max(best,height*width);
            }
            st.push(i);
        }
        return best;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                ],
            },

            {
                title: "Sliding Window Maximum",
                description: "Return the max of each sliding window of size k.",
                level: "hard",
                examples: [{ input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]", explanation: "" }],
                tests: [
                    { input: "[[1,3,-1,-3,5,3,6,7],3]", expected: "[3,3,5,5,6,7]" },
                    { input: "[[1],1]", expected: "[1]" },
                    { input: "[[9,8,7,6,5],2]", expected: "[9,8,7,6]" },
                    { input: "[[1,2,3,4,5],1]", expected: "[1,2,3,4,5]" },
                    { input: "[[7,2,4],2]", expected: "[7,4]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "maxSlidingWindow",
                        starterCode: `function maxSlidingWindow(nums, k){ /* TODO */ }`,
                        optimalSolution: `function maxSlidingWindow(a,k){
  const res=[], dq=[]; // store indices
  for(let i=0;i<a.length;i++){
    while(dq.length && dq[0]<=i-k) dq.shift();
    while(dq.length && a[dq[dq.length-1]]<=a[i]) dq.pop();
    dq.push(i);
    if(i>=k-1) res.push(a[dq[0]]);
  }
  return res;
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "python",
                        functionName: "maxSlidingWindow",
                        starterCode: `def maxSlidingWindow(nums, k):  # List[int], int -> List[int]
    pass
`,
                        optimalSolution: `from collections import deque
def maxSlidingWindow(a,k):
    res=[]; dq=deque()
    for i,x in enumerate(a):
        while dq and dq[0]<=i-k: dq.popleft()
        while dq and a[dq[-1]]<=x: dq.pop()
        dq.append(i)
        if i>=k-1: res.append(a[dq[0]])
    return res
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "java",
                        functionName: "maxSlidingWindow",
                        starterCode: `public class Solution { public static int[] maxSlidingWindow(int[] nums, int k){ return new int[0]; } }`,
                        optimalSolution: `public class Solution {
    public static int[] maxSlidingWindow(int[] a, int k){
        java.util.ArrayDeque<Integer> dq=new java.util.ArrayDeque<>();
        int n=a.length; if(n==0) return new int[0];
        int[] res=new int[n-k+1]; int idx=0;
        for(int i=0;i<n;i++){
            while(!dq.isEmpty() && dq.peekFirst()<=i-k) dq.pollFirst();
            while(!dq.isEmpty() && a[dq.peekLast()]<=a[i]) dq.pollLast();
            dq.addLast(i);
            if(i>=k-1) res[idx++]=a[dq.peekFirst()];
        }
        return res;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                ],
            },

            {
                title: "Longest Valid Parentheses",
                description: "Find the length of the longest valid parentheses substring.",
                level: "hard",
                examples: [{ input: 's = "(()"', output: "2", explanation: "" }],
                tests: [
                    { input: '["(()"]', expected: "2" },
                    { input: '[")()())"]', expected: "4" },
                    { input: '[""]', expected: "0" },
                    { input: '["()(()"]', expected: "2" },
                    { input: '["()()"]', expected: "4" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "longestValidParentheses",
                        starterCode: `function longestValidParentheses(s){ /* TODO */ }`,
                        optimalSolution: `function longestValidParentheses(s){
  const st=[-1]; let best=0;
  for(let i=0;i<s.length;i++){
    if(s[i]==='(') st.push(i);
    else{
      st.pop();
      if(!st.length) st.push(i);
      else best=Math.max(best, i-st[st.length-1]);
    }
  }
  return best;
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "python",
                        functionName: "longestValidParentheses",
                        starterCode: `def longestValidParentheses(s):  # str -> int
    pass
`,
                        optimalSolution: `def longestValidParentheses(s):
    st=[-1]; best=0
    for i,ch in enumerate(s):
        if ch=='(':
            st.append(i)
        else:
            st.pop()
            if not st: st.append(i)
            else: best=max(best, i-st[-1])
    return best
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "java",
                        functionName: "longestValidParentheses",
                        starterCode: `public class Solution { public static int longestValidParentheses(String s){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int longestValidParentheses(String s){
        java.util.ArrayDeque<Integer> st=new java.util.ArrayDeque<>();
        st.push(-1); int best=0;
        for(int i=0;i<s.length();i++){
            char c=s.charAt(i);
            if(c=='(') st.push(i);
            else{
                st.pop();
                if(st.isEmpty()) st.push(i);
                else best=Math.max(best, i-st.peek());
            }
        }
        return best;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                ],
            },

            {
                title: "Minimum Window Substring",
                description: "Return the minimum window in s which contains all the chars of t.",
                level: "hard",
                examples: [{ input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: "" }],
                tests: [
                    { input: '["ADOBECODEBANC","ABC"]', expected: '"BANC"' },
                    { input: '["a","a"]', expected: '"a"' },
                    { input: '["a","aa"]', expected: '""' },
                    { input: '["ab","a"]', expected: '"a"' },
                    { input: '["ab","b"]', expected: '"b"' },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "minWindow",
                        starterCode: `function minWindow(s, t){ /* TODO */ }`,
                        optimalSolution: `function minWindow(s,t){
  const need=new Map(); for(const c of t) need.set(c,(need.get(c)||0)+1);
  let have=0, needKinds=need.size;
  const wind=new Map(); let L=0, best=[0,Infinity];
  for(let R=0; R<s.length; R++){
    const c=s[R]; wind.set(c,(wind.get(c)||0)+1);
    if(need.has(c) && wind.get(c)===need.get(c)) have++;
    while(have===needKinds){
      if(R-L+1 < best[1]-best[0]+1) best=[L,R];
      const d=s[L++]; wind.set(d, wind.get(d)-1);
      if(need.has(d) && wind.get(d)<need.get(d)) have--;
    }
  }
  return best[1]===Infinity ? "" : s.slice(best[0],best[1]+1);
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "python",
                        functionName: "minWindow",
                        starterCode: `def minWindow(s, t):  # str, str -> str
    pass
`,
                        optimalSolution: `def minWindow(s,t):
    from collections import Counter
    need=Counter(t); have=Counter(); haveKinds=0; needKinds=len(need)
    L=0; best=None
    for R,ch in enumerate(s):
        have[ch]+=1
        if ch in need and have[ch]==need[ch]: haveKinds+=1
        while haveKinds==needKinds:
            if best is None or R-L+1 < best[1]-best[0]+1: best=(L,R)
            d=s[L]; have[d]-=1; 
            if d in need and have[d]<need[d]: haveKinds-=1
            L+=1
    return "" if best is None else s[best[0]:best[1]+1]
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "java",
                        functionName: "minWindow",
                        starterCode: `public class Solution { public static String minWindow(String s, String t){ return ""; } }`,
                        optimalSolution: `public class Solution {
    public static String minWindow(String s, String t){
        int[] need=new int[128]; int kinds=0;
        for(char c: t.toCharArray()){ if(need[c]==0) kinds++; need[c]++; }
        int[] have=new int[128]; int haveKinds=0;
        int L=0; int bestL=0,bestR=Integer.MAX_VALUE;
        for(int R=0; R<s.length(); R++){
            char c=s.charAt(R); have[c]++;
            if(need[c]>0 && have[c]==need[c]) haveKinds++;
            while(haveKinds==kinds){
                if(R-L < bestR-bestL){ bestL=L; bestR=R; }
                char d=s.charAt(L++); have[d]--;
                if(need[d]>0 && have[d]<need[d]) haveKinds--;
            }
        }
        return bestR==Integer.MAX_VALUE? "" : s.substring(bestL,bestR+1);
    }
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                ],
            },

            {
                title: "Longest Substring Without Repeating Characters",
                description: "Return the length of the longest substring without repeating chars.",
                level: "hard",
                examples: [{ input: 's = "abcabcbb"', output: "3", explanation: '"abc"' }],
                tests: [
                    { input: '["abcabcbb"]', expected: "3" },
                    { input: '["bbbbb"]', expected: "1" },
                    { input: '["pwwkew"]', expected: "3" },
                    { input: '[""]', expected: "0" },
                    { input: '["dvdf"]', expected: "3" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "lengthOfLongestSubstring",
                        starterCode: `function lengthOfLongestSubstring(s){ /* TODO */ }`,
                        optimalSolution: `function lengthOfLongestSubstring(s){
  const pos=new Map(); let L=0,best=0;
  for(let i=0;i<s.length;i++){
    const c=s[i];
    if(pos.has(c) && pos.get(c)>=L) L=pos.get(c)+1;
    pos.set(c,i);
    best=Math.max(best,i-L+1);
  }
  return best;
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "python",
                        functionName: "lengthOfLongestSubstring",
                        starterCode: `def lengthOfLongestSubstring(s):  # str -> int
    pass
`,
                        optimalSolution: `def lengthOfLongestSubstring(s):
    pos={}; L=0; best=0
    for i,ch in enumerate(s):
        if ch in pos and pos[ch]>=L: L=pos[ch]+1
        pos[ch]=i
        best=max(best, i-L+1)
    return best
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                    {
                        lang: "java",
                        functionName: "lengthOfLongestSubstring",
                        starterCode: `public class Solution { public static int lengthOfLongestSubstring(String s){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int lengthOfLongestSubstring(String s){
        java.util.Map<Character,Integer> pos=new java.util.HashMap<>();
        int L=0,best=0;
        for(int i=0;i<s.length();i++){
            char c=s.charAt(i);
            if(pos.containsKey(c) && pos.get(c)>=L) L=pos.get(c)+1;
            pos.put(c,i);
            best=Math.max(best,i-L+1);
        }
        return best;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(k)" },
                    },
                ],
            },

            {
                title: "Median of Two Sorted Arrays",
                description: "Return the median of two sorted arrays.",
                level: "hard",
                examples: [{ input: "nums1 = [1,3], nums2 = [2]", output: "2.0", explanation: "" }],
                tests: [
                    { input: "[[1,3],[2]]", expected: "2" },
                    { input: "[[1,2],[3,4]]", expected: "2.5" },
                    { input: "[[0,0],[0,0]]", expected: "0" },
                    { input: "[[],[1]]", expected: "1" },
                    { input: "[[2],[1,3,4]]", expected: "3" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "findMedianSortedArrays",
                        starterCode: `function findMedianSortedArrays(nums1, nums2){ /* TODO */ }`,
                        optimalSolution: `function findMedianSortedArrays(a,b){
  const m=a.length,n=b.length; const c=[];
  let i=0,j=0;
  while(i<m||j<n){
    if(j>=n || (i<m && a[i]<=b[j])) c.push(a[i++]); else c.push(b[j++]);
  }
  const L=c.length;
  return L%2? c[(L>>1)] : (c[L/2-1]+c[L/2])/2;
}
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                    {
                        lang: "python",
                        functionName: "findMedianSortedArrays",
                        starterCode: `def findMedianSortedArrays(nums1, nums2):  # List[int], List[int] -> float
    pass
`,
                        optimalSolution: `def findMedianSortedArrays(a,b):
    c=[]; i=j=0
    while i<len(a) or j<len(b):
        if j>=len(b) or (i<len(a) and a[i]<=b[j]): c.append(a[i]); i+=1
        else: c.append(b[j]); j+=1
    L=len(c)
    return c[L//2] if L%2 else (c[L//2-1]+c[L//2])/2
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                    {
                        lang: "java",
                        functionName: "findMedianSortedArrays",
                        starterCode: `public class Solution { public static double findMedianSortedArrays(int[] nums1, int[] nums2){ return 0.0; } }`,
                        optimalSolution: `public class Solution {
    public static double findMedianSortedArrays(int[] a, int[] b){
        int m=a.length,n=b.length;
        int[] c=new int[m+n]; int i=0,j=0,k=0;
        while(i<m || j<n){
            if(j>=n || (i<m && a[i]<=b[j])) c[k++]=a[i++];
            else c[k++]=b[j++];
        }
        int L=c.length;
        if((L&1)==1) return c[L/2];
        return (c[L/2-1]+c[L/2])/2.0;
    }
}
`,
                        complexity: { time: "O(m+n)", space: "O(m+n)" },
                    },
                ],
            },

            {
                title: "Kth Largest Element in an Array",
                description: "Find the kth largest element in an unsorted array.",
                level: "hard",
                examples: [{ input: "nums = [3,2,1,5,6,4], k = 2", output: "5", explanation: "" }],
                tests: [
                    { input: "[[3,2,1,5,6,4],2]", expected: "5" },
                    { input: "[[3,2,3,1,2,4,5,5,6],4]", expected: "4" },
                    { input: "[[1],1]", expected: "1" },
                    { input: "[[2,1],1]", expected: "2" },
                    { input: "[[7,6,5,4,3,2,1],3]", expected: "5" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "findKthLargest",
                        starterCode: `function findKthLargest(nums, k){ /* TODO */ }`,
                        optimalSolution: `function findKthLargest(a,k){
  a.sort((x,y)=>y-x);
  return a[k-1];
}
`,
                        complexity: { time: "O(n log n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "findKthLargest",
                        starterCode: `def findKthLargest(nums, k):  # List[int], int -> int
    pass
`,
                        optimalSolution: `def findKthLargest(a,k):
    a.sort(reverse=True)
    return a[k-1]
`,
                        complexity: { time: "O(n log n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "findKthLargest",
                        starterCode: `public class Solution { public static int findKthLargest(int[] nums, int k){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int findKthLargest(int[] a, int k){
        java.util.Arrays.sort(a);
        return a[a.length-k];
    }
}
`,
                        complexity: { time: "O(n log n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Product of Array Except Self",
                description: "Return an array answer such that answer[i] is product of all nums except nums[i].",
                level: "hard",
                examples: [{ input: "nums = [1,2,3,4]", output: "[24,12,8,6]", explanation: "" }],
                tests: [
                    { input: "[[1,2,3,4]]", expected: "[24,12,8,6]" },
                    { input: "[[0,0]]", expected: "[0,0]" },
                    { input: "[[0,1,2,3]]", expected: "[6,0,0,0]" },
                    { input: "[[2,3,4,5]]", expected: "[60,40,30,24]" },
                    { input: "[[1,1,1,1]]", expected: "[1,1,1,1]" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "productExceptSelf",
                        starterCode: `function productExceptSelf(nums){ /* TODO */ }`,
                        optimalSolution: `function productExceptSelf(a){
  const n=a.length, res=Array(n).fill(1);
  let pref=1; for(let i=0;i<n;i++){ res[i]=pref; pref*=a[i]; }
  let suff=1; for(let i=n-1;i>=0;i--){ res[i]*=suff; suff*=a[i]; }
  return res;
}
`,
                        complexity: { time: "O(n)", space: "O(1) extra" },
                    },
                    {
                        lang: "python",
                        functionName: "productExceptSelf",
                        starterCode: `def productExceptSelf(nums):  # List[int] -> List[int]
    pass
`,
                        optimalSolution: `def productExceptSelf(a):
    n=len(a); res=[1]*n
    pref=1
    for i in range(n): res[i]=pref; pref*=a[i]
    suff=1
    for i in range(n-1,-1,-1): res[i]*=suff; suff*=a[i]
    return res
`,
                        complexity: { time: "O(n)", space: "O(1) extra" },
                    },
                    {
                        lang: "java",
                        functionName: "productExceptSelf",
                        starterCode: `public class Solution { public static int[] productExceptSelf(int[] nums){ return new int[0]; } }`,
                        optimalSolution: `public class Solution {
    public static int[] productExceptSelf(int[] a){
        int n=a.length; int[] res=new int[n];
        int pref=1; for(int i=0;i<n;i++){ res[i]=pref; pref*=a[i]; }
        int suff=1; for(int i=n-1;i>=0;i--){ res[i]*=suff; suff*=a[i]; }
        return res;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1) extra" },
                    },
                ],
            },

            {
                title: "Find Minimum in Rotated Sorted Array",
                description: "Find the minimum element (no duplicates).",
                level: "hard",
                examples: [{ input: "nums = [3,4,5,1,2]", output: "1", explanation: "" }],
                tests: [
                    { input: "[[3,4,5,1,2]]", expected: "1" },
                    { input: "[[4,5,6,7,0,1,2]]", expected: "0" },
                    { input: "[[11,13,15,17]]", expected: "11" },
                    { input: "[[2,1]]", expected: "1" },
                    { input: "[[1]]", expected: "1" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "findMin",
                        starterCode: `function findMin(nums){ /* TODO */ }`,
                        optimalSolution: `function findMin(a){
  let l=0,r=a.length-1;
  while(l<r){
    const m=(l+r>>1);
    if(a[m]>a[r]) l=m+1; else r=m;
  }
  return a[l];
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "findMin",
                        starterCode: `def findMin(nums):  # List[int] -> int
    pass
`,
                        optimalSolution: `def findMin(a):
    l,r=0,len(a)-1
    while l<r:
        m=(l+r)//2
        if a[m]>a[r]: l=m+1
        else: r=m
    return a[l]
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "findMin",
                        starterCode: `public class Solution { public static int findMin(int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int findMin(int[] a){
        int l=0,r=a.length-1;
        while(l<r){
            int m=(l+r)/2;
            if(a[m]>a[r]) l=m+1; else r=m;
        }
        return a[l];
    }
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Search in Rotated Sorted Array",
                description: "Return the index of target in rotated array, else -1 (no duplicates).",
                level: "hard",
                examples: [{ input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "" }],
                tests: [
                    { input: "[[4,5,6,7,0,1,2],0]", expected: "4" },
                    { input: "[[4,5,6,7,0,1,2],3]", expected: "-1" },
                    { input: "[[1],0]", expected: "-1" },
                    { input: "[[5,1,3],3]", expected: "2" },
                    { input: "[[5,1,3],5]", expected: "0" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "searchRotated",
                        starterCode: `function searchRotated(nums, target){ /* TODO */ }`,
                        optimalSolution: `function searchRotated(a,t){
  let l=0,r=a.length-1;
  while(l<=r){
    const m=(l+r>>1);
    if(a[m]===t) return m;
    if(a[l]<=a[m]){
      if(a[l]<=t && t<a[m]) r=m-1; else l=m+1;
    }else{
      if(a[m]<t && t<=a[r]) l=m+1; else r=m-1;
    }
  }
  return -1;
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "searchRotated",
                        starterCode: `def searchRotated(nums, target):  # List[int], int -> int
    pass
`,
                        optimalSolution: `def searchRotated(a,t):
    l,r=0,len(a)-1
    while l<=r:
        m=(l+r)//2
        if a[m]==t: return m
        if a[l]<=a[m]:
            if a[l]<=t<a[m]: r=m-1
            else: l=m+1
        else:
            if a[m]<t<=a[r]: l=m+1
            else: r=m-1
    return -1
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "searchRotated",
                        starterCode: `public class Solution { public static int searchRotated(int[] nums, int target){ return -1; } }`,
                        optimalSolution: `public class Solution {
    public static int searchRotated(int[] a, int t){
        int l=0,r=a.length-1;
        while(l<=r){
            int m=(l+r)/2;
            if(a[m]==t) return m;
            if(a[l]<=a[m]){
                if(a[l]<=t && t<a[m]) r=m-1; else l=m+1;
            }else{
                if(a[m]<t && t<=a[r]) l=m+1; else r=m-1;
            }
        }
        return -1;
    }
}
`,
                        complexity: { time: "O(log n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Maximum Product Subarray",
                description: "Find the contiguous subarray with the maximum product.",
                level: "hard",
                examples: [{ input: "nums = [2,3,-2,4]", output: "6", explanation: "" }],
                tests: [
                    { input: "[[2,3,-2,4]]", expected: "6" },
                    { input: "[[-2,0,-1]]", expected: "0" },
                    { input: "[[-2,3,-4]]", expected: "24" },
                    { input: "[[0,2]]", expected: "2" },
                    { input: "[[2,-5,-2,-4,3]]", expected: "24" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "maxProduct",
                        starterCode: `function maxProduct(nums){ /* TODO */ }`,
                        optimalSolution: `function maxProduct(a){
  let best=a[0], mn=a[0], mx=a[0];
  for(let i=1;i<a.length;i++){
    const x=a[i];
    if(x<0) [mn,mx]=[mx,mn];
    mx=Math.max(x,mx*x);
    mn=Math.min(x,mn*x);
    best=Math.max(best,mx);
  }
  return best;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "maxProduct",
                        starterCode: `def maxProduct(nums):  # List[int] -> int
    pass
`,
                        optimalSolution: `def maxProduct(a):
    best=mn=mx=a[0]
    for x in a[1:]:
        if x<0: mn,mx=mx,mn
        mx=max(x,mx*x)
        mn=min(x,mn*x)
        best=max(best,mx)
    return best
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "maxProduct",
                        starterCode: `public class Solution { public static int maxProduct(int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int maxProduct(int[] a){
        int best=a[0], mn=a[0], mx=a[0];
        for(int i=1;i<a.length;i++){
            int x=a[i];
            if(x<0){ int t=mn; mn=mx; mx=t; }
            mx=Math.max(x, mx*x);
            mn=Math.min(x, mn*x);
            best=Math.max(best, mx);
        }
        return best;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Longest Increasing Subsequence",
                description: "Return the length of the LIS.",
                level: "hard",
                examples: [{ input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "[2,3,7,101]" }],
                tests: [
                    { input: "[[10,9,2,5,3,7,101,18]]", expected: "4" },
                    { input: "[[0,1,0,3,2,3]]", expected: "4" },
                    { input: "[[7,7,7,7]]", expected: "1" },
                    { input: "[[1,3,6,7,9,4,10,5,6]]", expected: "6" },
                    { input: "[[1]]", expected: "1" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "lengthOfLIS",
                        starterCode: `function lengthOfLIS(nums){ /* TODO */ }`,
                        optimalSolution: `function lengthOfLIS(a){
  const tails=[];
  for(const x of a){
    let l=0,r=tails.length;
    while(l<r){
      const m=(l+r>>1);
      if(tails[m]<x) l=m+1; else r=m;
    }
    tails[l]=x;
  }
  return tails.length;
}
`,
                        complexity: { time: "O(n log n)", space: "O(n)" },
                    },
                    {
                        lang: "python",
                        functionName: "lengthOfLIS",
                        starterCode: `def lengthOfLIS(nums):  # List[int] -> int
    pass
`,
                        optimalSolution: `def lengthOfLIS(a):
    import bisect
    tails=[]
    for x in a:
        i=bisect.bisect_left(tails,x)
        if i==len(tails): tails.append(x)
        else: tails[i]=x
    return len(tails)
`,
                        complexity: { time: "O(n log n)", space: "O(n)" },
                    },
                    {
                        lang: "java",
                        functionName: "lengthOfLIS",
                        starterCode: `public class Solution { public static int lengthOfLIS(int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int lengthOfLIS(int[] a){
        int[] tails=new int[a.length]; int sz=0;
        for(int x: a){
            int l=0,r=sz;
            while(l<r){
                int m=(l+r)/2;
                if(tails[m]<x) l=m+1; else r=m;
            }
            tails[l]=x;
            if(l==sz) sz++;
        }
        return sz;
    }
}
`,
                        complexity: { time: "O(n log n)", space: "O(n)" },
                    },
                ],
            },

            {
                title: "House Robber II",
                description: "Circular street of houses; return max amount you can rob without adjacent.",
                level: "hard",
                examples: [{ input: "nums = [2,3,2]", output: "3", explanation: "" }],
                tests: [
                    { input: "[[2,3,2]]", expected: "3" },
                    { input: "[[1,2,3,1]]", expected: "4" },
                    { input: "[[1,2,3]]", expected: "3" },
                    { input: "[[0]]", expected: "0" },
                    { input: "[[200,3,140,20,10]]", expected: "340" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "rob2",
                        starterCode: `function rob2(nums){ /* TODO */ }`,
                        optimalSolution: `function rob2(a){
  if(a.length===1) return a[0];
  const rob=(l,r)=>{ let take=0,skip=0; for(let i=l;i<=r;i++){ const nt=skip+a[i]; skip=Math.max(skip,take); take=nt; } return Math.max(take,skip); };
  return Math.max(rob(0,a.length-2), rob(1,a.length-1));
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "rob2",
                        starterCode: `def rob2(nums):  # List[int] -> int
    pass
`,
                        optimalSolution: `def rob2(a):
    if len(a)==1: return a[0]
    def rob(l,r):
        take=skip=0
        for i in range(l,r+1):
            take,skip = skip+a[i], max(skip,take)
        return max(take,skip)
    return max(rob(0,len(a)-2), rob(1,len(a)-1))
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "rob2",
                        starterCode: `public class Solution { public static int rob2(int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int rob2(int[] a){
        if(a.length==1) return a[0];
        return Math.max(rob(a,0,a.length-2), rob(a,1,a.length-1));
    }
    static int rob(int[] a,int l,int r){
        int take=0, skip=0;
        for(int i=l;i<=r;i++){
            int nt=skip+a[i];
            skip=Math.max(skip,take);
            take=nt;
        }
        return Math.max(take,skip);
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Coin Change",
                description: "Given coins and amount, return fewest coins needed (or -1).",
                level: "hard",
                examples: [{ input: "coins = [1,2,5], amount = 11", output: "3", explanation: "5+5+1" }],
                tests: [
                    { input: "[[1,2,5],11]", expected: "3" },
                    { input: "[[2],3]", expected: "-1" },
                    { input: "[[1],0]", expected: "0" },
                    { input: "[[1,3,4],6]", expected: "2" },
                    { input: "[[2,5,10,1],27]", expected: "4" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "coinChange",
                        starterCode: `function coinChange(coins, amount){ /* TODO */ }`,
                        optimalSolution: `function coinChange(c,amt){
  const INF=1e9, dp=Array(amt+1).fill(INF); dp[0]=1?0:0;
  for(const x of c) for(let a=x;a<=amt;a++) dp[a]=Math.min(dp[a], dp[a-x]+1);
  return dp[amt]>=INF? -1: dp[amt];
}
`,
                        complexity: { time: "O(n*amount)", space: "O(amount)" },
                    },
                    {
                        lang: "python",
                        functionName: "coinChange",
                        starterCode: `def coinChange(coins, amount):  # List[int], int -> int
    pass
`,
                        optimalSolution: `def coinChange(c,amt):
    INF=10**9; dp=[INF]*(amt+1); dp[0]=0
    for x in c:
        for a in range(x, amt+1):
            dp[a]=min(dp[a], dp[a-x]+1)
    return -1 if dp[amt]>=INF else dp[amt]
`,
                        complexity: { time: "O(n*amount)", space: "O(amount)" },
                    },
                    {
                        lang: "java",
                        functionName: "coinChange",
                        starterCode: `public class Solution { public static int coinChange(int[] coins, int amount){ return -1; } }`,
                        optimalSolution: `public class Solution {
    public static int coinChange(int[] c, int amt){
        int INF=1_000_000_000; int[] dp=new int[amt+1];
        java.util.Arrays.fill(dp, INF); dp[0]=0;
        for(int x: c){
            for(int a=x; a<=amt; a++){
                if(dp[a-x]+1 < dp[a]) dp[a]=dp[a-x]+1;
            }
        }
        return dp[amt]>=INF? -1: dp[amt];
    }
}
`,
                        complexity: { time: "O(n*amount)", space: "O(amount)" },
                    },
                ],
            },

            {
                title: "Subarray Sum Equals K",
                description: "Return the total number of continuous subarrays whose sum equals k.",
                level: "hard",
                examples: [{ input: "nums = [1,1,1], k = 2", output: "2", explanation: "" }],
                tests: [
                    { input: "[[1,1,1],2]", expected: "2" },
                    { input: "[[1,2,3],3]", expected: "2" },
                    { input: "[[0,0,0],0]", expected: "6" },
                    { input: "[[-1,-1,1],0]", expected: "1" },
                    { input: "[[3,4,7,2,-3,1,4,2],7]", expected: "4" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "subarraySum",
                        starterCode: `function subarraySum(nums, k){ /* TODO */ }`,
                        optimalSolution: `function subarraySum(a,k){
  const cnt=new Map(); cnt.set(0,1);
  let sum=0,ans=0;
  for(const x of a){
    sum+=x;
    ans += cnt.get(sum-k)||0;
    cnt.set(sum, (cnt.get(sum)||0)+1);
  }
  return ans;
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "python",
                        functionName: "subarraySum",
                        starterCode: `def subarraySum(nums, k):  # List[int], int -> int
    pass
`,
                        optimalSolution: `def subarraySum(a,k):
    from collections import defaultdict
    cnt=defaultdict(int); cnt[0]=1
    s=0; ans=0
    for x in a:
        s+=x
        ans += cnt[s-k]
        cnt[s]+=1
    return ans
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                    {
                        lang: "java",
                        functionName: "subarraySum",
                        starterCode: `public class Solution { public static int subarraySum(int[] nums, int k){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int subarraySum(int[] a, int k){
        java.util.Map<Integer,Integer> cnt=new java.util.HashMap<>();
        cnt.put(0,1);
        int s=0, ans=0;
        for(int x: a){
            s+=x;
            ans += cnt.getOrDefault(s-k,0);
            cnt.put(s, cnt.getOrDefault(s,0)+1);
        }
        return ans;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(n)" },
                    },
                ],
            },

            {
                title: "Decode Ways",
                description: "Return number of ways to decode a string of digits.",
                level: "hard",
                examples: [{ input: 's = "226"', output: "3", explanation: '"2|26", "22|6", "2|2|6"' }],
                tests: [
                    { input: '["12"]', expected: "2" },
                    { input: '["226"]', expected: "3" },
                    { input: '["06"]', expected: "0" },
                    { input: '["11106"]', expected: "2" },
                    { input: '["27"]', expected: "1" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "numDecodings",
                        starterCode: `function numDecodings(s){ /* TODO */ }`,
                        optimalSolution: `function numDecodings(s){
  if(!s.length || s[0]==='0') return 0;
  let a=1,b=1; // dp[i-2], dp[i-1]
  for(let i=1;i<s.length;i++){
    let cur=0;
    if(s[i]!=='0') cur+=b;
    const v=(s[i-1].charCodeAt(0)-48)*10 + (s[i].charCodeAt(0)-48);
    if(v>=10 && v<=26) cur+=a;
    a=b; b=cur;
    if(b===0) return 0;
  }
  return b;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "numDecodings",
                        starterCode: `def numDecodings(s):  # str -> int
    pass
`,
                        optimalSolution: `def numDecodings(s):
    if not s or s[0]=='0': return 0
    a,b=1,1
    for i in range(1,len(s)):
        cur=0
        if s[i] != '0': cur+=b
        v=int(s[i-1:i+1])
        if 10<=v<=26: cur+=a
        a,b=b,cur
        if b==0: return 0
    return b
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "numDecodings",
                        starterCode: `public class Solution { public static int numDecodings(String s){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int numDecodings(String s){
        if(s.length()==0 || s.charAt(0)=='0') return 0;
        int a=1,b=1;
        for(int i=1;i<s.length();i++){
            int cur=0;
            if(s.charAt(i)!='0') cur+=b;
            int v=(s.charAt(i-1)-'0')*10 + (s.charAt(i)-'0');
            if(v>=10 && v<=26) cur+=a;
            a=b; b=cur;
            if(b==0) return 0;
        }
        return b;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Maximum Sum Circular Subarray",
                description: "Find the maximum subarray sum in a circular array.",
                level: "hard",
                examples: [{ input: "nums = [1,-2,3,-2]", output: "3", explanation: "" }],
                tests: [
                    { input: "[[1,-2,3,-2]]", expected: "3" },
                    { input: "[[5,-3,5]]", expected: "10" },
                    { input: "[[-3,-2,-3]]", expected: "-2" },
                    { input: "[[3,-1,2,-1]]", expected: "4" },
                    { input: "[[3,-2,2,-3]]", expected: "3" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "maxSubarraySumCircular",
                        starterCode: `function maxSubarraySumCircular(nums){ /* TODO */ }`,
                        optimalSolution: `function maxSubarraySumCircular(a){
  let tot=0, maxEnd=0, minEnd=0, mx=-1e15, mn=1e15;
  for(const x of a){
    tot+=x;
    maxEnd=Math.max(x,maxEnd+x); mx=Math.max(mx,maxEnd);
    minEnd=Math.min(x,minEnd+x); mn=Math.min(mn,minEnd);
  }
  return mx<0? mx : Math.max(mx, tot-mn);
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "maxSubarraySumCircular",
                        starterCode: `def maxSubarraySumCircular(nums):  # List[int] -> int
    pass
`,
                        optimalSolution: `def maxSubarraySumCircular(a):
    tot=0; maxEnd=0; minEnd=0; mx=-10**18; mn=10**18
    for x in a:
        tot+=x
        maxEnd=max(x,maxEnd+x); mx=max(mx,maxEnd)
        minEnd=min(x,minEnd+x); mn=min(mn,minEnd)
    return mx if mx<0 else max(mx, tot-mn)
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "maxSubarraySumCircular",
                        starterCode: `public class Solution { public static int maxSubarraySumCircular(int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int maxSubarraySumCircular(int[] a){
        int tot=0, maxEnd=0, minEnd=0, mx=Integer.MIN_VALUE, mn=Integer.MAX_VALUE;
        for(int x: a){
            tot+=x;
            maxEnd=Math.max(x, maxEnd+x); mx=Math.max(mx, maxEnd);
            minEnd=Math.min(x, minEnd+x); mn=Math.min(mn, minEnd);
        }
        if(mx<0) return mx;
        return Math.max(mx, tot-mn);
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Jump Game II",
                description: "Return minimum number of jumps to reach last index.",
                level: "hard",
                examples: [{ input: "nums = [2,3,1,1,4]", output: "2", explanation: "" }],
                tests: [
                    { input: "[[2,3,1,1,4]]", expected: "2" },
                    { input: "[[2,1]]", expected: "1" },
                    { input: "[[1,2,3]]", expected: "2" },
                    { input: "[[1,1,1,1]]", expected: "3" },
                    { input: "[[0]]", expected: "0" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "jump",
                        starterCode: `function jump(nums){ /* TODO */ }`,
                        optimalSolution: `function jump(a){
  let jumps=0, curEnd=0, far=0;
  for(let i=0;i<a.length-1;i++){
    far=Math.max(far, i+a[i]);
    if(i===curEnd){ jumps++; curEnd=far; }
  }
  return jumps;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "jump",
                        starterCode: `def jump(nums):  # List[int] -> int
    pass
`,
                        optimalSolution: `def jump(a):
    jumps=0; curEnd=0; far=0
    for i in range(len(a)-1):
        far=max(far, i+a[i])
        if i==curEnd:
            jumps+=1; curEnd=far
    return jumps
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "jump",
                        starterCode: `public class Solution { public static int jump(int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int jump(int[] a){
        int jumps=0, curEnd=0, far=0;
        for(int i=0;i<a.length-1;i++){
            far=Math.max(far, i+a[i]);
            if(i==curEnd){ jumps++; curEnd=far; }
        }
        return jumps;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" },
                    },
                ],
            },

            {
                title: "Palindromic Substrings",
                description: "Count how many palindromic substrings in s.",
                level: "hard",
                examples: [{ input: 's = "aaa"', output: "6", explanation: "" }],
                tests: [
                    { input: '["abc"]', expected: "3" },
                    { input: '["aaa"]', expected: "6" },
                    { input: '["abcc"]', expected: "5" },
                    { input: '[""]', expected: "0" },
                    { input: '["abba"]', expected: "6" },
                ],
                variants: [
                    {
                        lang: "javascript",
                        functionName: "countSubstrings",
                        starterCode: `function countSubstrings(s){ /* TODO */ }`,
                        optimalSolution: `function countSubstrings(s){
  let ans=0;
  const go=(l,r)=>{ while(l>=0 && r<s.length && s[l]===s[r]){ ans++; l--; r++; } };
  for(let i=0;i<s.length;i++){ go(i,i); go(i,i+1); }
  return ans;
}
`,
                        complexity: { time: "O(n^2)", space: "O(1)" },
                    },
                    {
                        lang: "python",
                        functionName: "countSubstrings",
                        starterCode: `def countSubstrings(s):  # str -> int
    pass
`,
                        optimalSolution: `def countSubstrings(s):
    ans=0
    def go(l,r):
        nonlocal ans
        while l>=0 and r<len(s) and s[l]==s[r]:
            ans+=1; l-=1; r+=1
    for i in range(len(s)):
        go(i,i); go(i,i+1)
    return ans
`,
                        complexity: { time: "O(n^2)", space: "O(1)" },
                    },
                    {
                        lang: "java",
                        functionName: "countSubstrings",
                        starterCode: `public class Solution { public static int countSubstrings(String s){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int countSubstrings(String s){
        int ans=0, n=s.length();
        for(int i=0;i<n;i++){
            ans+=expand(s,i,i);
            ans+=expand(s,i,i+1);
        }
        return ans;
    }
    static int expand(String s,int l,int r){
        int cnt=0;
        while(l>=0 && r<s.length() && s.charAt(l)==s.charAt(r)){ cnt++; l--; r++; }
        return cnt;
    }
}
`,
                        complexity: { time: "O(n^2)", space: "O(1)" },
                    },
                ],
            },

            // ---- 6 more to reach 20 hard ----

            {
                title: "Edit Distance",
                description: "Compute Levenshtein distance between two strings.",
                level: "hard",
                examples: [{ input: 'word1 = "horse", word2 = "ros"', output: "3", explanation: "" }],
                tests: [
                    { input: '["horse","ros"]', expected: "3" },
                    { input: '["intention","execution"]', expected: "5" },
                    { input: '["",""]', expected: "0" },
                    { input: '["a",""]', expected: "1" },
                    { input: '["","b"]', expected: "1" },
                ],
                variants: [
                    {
                        lang: "javascript", functionName: "minDistance",
                        starterCode: `function minDistance(word1, word2){ /* TODO */ }`,
                        optimalSolution: `function minDistance(a,b){
  const m=a.length,n=b.length; const dp=Array(m+1).fill(0).map(()=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i; for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
    if(a[i-1]===b[j-1]) dp[i][j]=dp[i-1][j-1];
    else dp[i][j]=1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  }
  return dp[m][n];
}` ,
                        complexity: { time: "O(mn)", space: "O(mn)" }
                    },
                    {
                        lang: "python", functionName: "minDistance",
                        starterCode: `def minDistance(word1, word2):  # str, str -> int\n    pass\n`,
                        optimalSolution: `def minDistance(a,b):
    m,n=len(a),len(b)
    dp=[[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0]=i
    for j in range(n+1): dp[0][j]=j
    for i in range(1,m+1):
        for j in range(1,n+1):
            if a[i-1]==b[j-1]: dp[i][j]=dp[i-1][j-1]
            else: dp[i][j]=1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])
    return dp[m][n]`,
                        complexity: { time: "O(mn)", space: "O(mn)" }
                    },
                    {
                        lang: "java", functionName: "minDistance",
                        starterCode: `public class Solution { public static int minDistance(String word1, String word2){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int minDistance(String a, String b){
        int m=a.length(), n=b.length();
        int[][] dp=new int[m+1][n+1];
        for(int i=0;i<=m;i++) dp[i][0]=i;
        for(int j=0;j<=n;j++) dp[0][j]=j;
        for(int i=1;i<=m;i++){
            for(int j=1;j<=n;j++){
                if(a.charAt(i-1)==b.charAt(j-1)) dp[i][j]=dp[i-1][j-1];
                else dp[i][j]=1+Math.min(dp[i-1][j], Math.min(dp[i][j-1], dp[i-1][j-1]));
            }
        }
        return dp[m][n];
    }
}`,
                        complexity: { time: "O(mn)", space: "O(mn)" }
                    },
                ],
            },

            {
                title: "Unique Paths (combinatorics)",
                description: "Robot moves only right or down on m x n grid; return #paths.",
                level: "hard",
                examples: [{ input: "m = 3, n = 7", output: "28", explanation: "" }],
                tests: [
                    { input: "[3,7]", expected: "28" },
                    { input: "[3,2]", expected: "3" },
                    { input: "[7,3]", expected: "28" },
                    { input: "[3,3]", expected: "6" },
                    { input: "[1,10]", expected: "1" },
                ],
                variants: [
                    {
                        lang: "javascript", functionName: "uniquePaths",
                        starterCode: `function uniquePaths(m,n){ /* TODO */ }`,
                        optimalSolution: `function uniquePaths(m,n){
  const N=m+n-2, k=Math.min(m-1,n-1);
  let num=1n, den=1n;
  for(let i=1n;i<=BigInt(k);i++){
    num*=BigInt(N+1 - Number(i));
    den*=i;
  }
  return Number(num/den);
}
`,
                        complexity: { time: "O(min(m,n))", space: "O(1)" }
                    },
                    {
                        lang: "python", functionName: "uniquePaths",
                        starterCode: `def uniquePaths(m,n):  # int,int -> int\n    pass\n`,
                        optimalSolution: `def uniquePaths(m,n):
    from math import comb
    return comb(m+n-2, m-1)` ,
                        complexity: { time: "O(1)", space: "O(1)" }
                    },
                    {
                        lang: "java", functionName: "uniquePaths",
                        starterCode: `public class Solution { public static int uniquePaths(int m,int n){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int uniquePaths(int m,int n){
        int N=m+n-2, k=Math.min(m-1,n-1);
        long num=1, den=1;
        for(int i=1;i<=k;i++){
            num *= (N+1 - i);
            den *= i;
        }
        return (int)(num/den);
    }
}
`,
                        complexity: { time: "O(min(m,n))", space: "O(1)" }
                    },
                ],
            },

            {
                title: "Container With Most Water",
                description: "Given heights, find the most water a container can store.",
                level: "hard",
                examples: [{ input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "" }],
                tests: [
                    { input: "[[1,8,6,2,5,4,8,3,7]]", expected: "49" },
                    { input: "[[1,1]]", expected: "1" },
                    { input: "[[2,3,4,5,18,17,6]]", expected: "17" },
                    { input: "[[1,2,1]]", expected: "2" },
                    { input: "[[4,3,2,1,4]]", expected: "16" },
                ],
                variants: [
                    {
                        lang: "javascript", functionName: "maxArea",
                        starterCode: `function maxArea(height){ /* TODO */ }`,
                        optimalSolution: `function maxArea(h){
  let l=0,r=h.length-1,best=0;
  while(l<r){
    best=Math.max(best, Math.min(h[l],h[r])*(r-l));
    if(h[l]<h[r]) l++; else r--;
  }
  return best;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "python", functionName: "maxArea",
                        starterCode: `def maxArea(height):  # List[int] -> int\n    pass\n`,
                        optimalSolution: `def maxArea(h):
    l,r=0,len(h)-1; best=0
    while l<r:
        best=max(best, min(h[l],h[r])*(r-l))
        if h[l]<h[r]: l+=1
        else: r-=1
    return best
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "java", functionName: "maxArea",
                        starterCode: `public class Solution { public static int maxArea(int[] height){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int maxArea(int[] h){
        int l=0,r=h.length-1,best=0;
        while(l<r){
            best=Math.max(best, Math.min(h[l],h[r])*(r-l));
            if(h[l]<h[r]) l++; else r--;
        }
        return best;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                ],
            },

            {
                title: "Gas Station",
                description: "Find the starting gas station index to complete a circuit; else -1.",
                level: "hard",
                examples: [{ input: "gas = [1,2,3,4,5], cost=[3,4,5,1,2]", output: "3", explanation: "" }],
                tests: [
                    { input: "[[1,2,3,4,5],[3,4,5,1,2]]", expected: "3" },
                    { input: "[[2,3,4],[3,4,3]]", expected: "-1" },
                    { input: "[[5,1,2,3,4],[4,4,1,5,1]]", expected: "4" },
                    { input: "[[1],[1]]", expected: "0" },
                    { input: "[[3,3,4],[3,4,4]]", expected: "-1" },
                ],
                variants: [
                    {
                        lang: "javascript", functionName: "canCompleteCircuit",
                        starterCode: `function canCompleteCircuit(gas, cost){ /* TODO */ }`,
                        optimalSolution: `function canCompleteCircuit(g,c){
  let total=0, tank=0, start=0;
  for(let i=0;i<g.length;i++){
    total+=g[i]-c[i]; tank+=g[i]-c[i];
    if(tank<0){ start=i+1; tank=0; }
  }
  return total<0? -1 : start;
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "python", functionName: "canCompleteCircuit",
                        starterCode: `def canCompleteCircuit(gas, cost):  # List[int], List[int] -> int\n    pass\n`,
                        optimalSolution: `def canCompleteCircuit(g,c):
    total=tank=start=0
    for i in range(len(g)):
        total += g[i]-c[i]; tank += g[i]-c[i]
        if tank<0: start=i+1; tank=0
    return -1 if total<0 else start
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                    {
                        lang: "java", functionName: "canCompleteCircuit",
                        starterCode: `public class Solution { public static int canCompleteCircuit(int[] gas,int[] cost){ return -1; } }`,
                        optimalSolution: `public class Solution {
    public static int canCompleteCircuit(int[] g,int[] c){
        int total=0,tank=0,start=0;
        for(int i=0;i<g.length;i++){
            total += g[i]-c[i]; tank += g[i]-c[i];
            if(tank<0){ start=i+1; tank=0; }
        }
        return total<0? -1: start;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(1)" }
                    },
                ],
            },

            {
                title: "Longest Consecutive Sequence",
                description: "Find the length of the longest consecutive elements sequence.",
                level: "hard",
                examples: [{ input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "[1,2,3,4]" }],
                tests: [
                    { input: "[[100,4,200,1,3,2]]", expected: "4" },
                    { input: "[[0,3,7,2,5,8,4,6,0,1]]", expected: "9" },
                    { input: "[[]]", expected: "0" },
                    { input: "[[1]]", expected: "1" },
                    { input: "[[9,1,4,7,3,-1,0,5,8,-1,6]]", expected: "7" },
                ],
                variants: [
                    {
                        lang: "javascript", functionName: "longestConsecutive",
                        starterCode: `function longestConsecutive(nums){ /* TODO */ }`,
                        optimalSolution: `function longestConsecutive(a){
  const s=new Set(a); let best=0;
  for(const x of s){
    if(!s.has(x-1)){
      let y=x,len=1; while(s.has(y+1)){ y++; len++; }
      best=Math.max(best,len);
    }
  }
  return best;
}
`,
                        complexity: { time: "O(n)", space: "O(n)" }
                    },
                    {
                        lang: "python", functionName: "longestConsecutive",
                        starterCode: `def longestConsecutive(nums):  # List[int] -> int\n    pass\n`,
                        optimalSolution: `def longestConsecutive(a):
    s=set(a); best=0
    for x in s:
        if x-1 not in s:
            y=x; length=1
            while y+1 in s:
                y+=1; length+=1
            best=max(best,length)
    return best
`,
                        complexity: { time: "O(n)", space: "O(n)" }
                    },
                    {
                        lang: "java", functionName: "longestConsecutive",
                        starterCode: `public class Solution { public static int longestConsecutive(int[] nums){ return 0; } }`,
                        optimalSolution: `public class Solution {
    public static int longestConsecutive(int[] a){
        java.util.HashSet<Integer> s=new java.util.HashSet<>();
        for(int x: a) s.add(x);
        int best=0;
        for(int x: s){
            if(!s.contains(x-1)){
                int y=x,len=1;
                while(s.contains(y+1)){ y++; len++; }
                if(len>best) best=len;
            }
        }
        return best;
    }
}
`,
                        complexity: { time: "O(n)", space: "O(n)" }
                    },
                ],
            },

            {
                title: "Longest Palindromic Substring",
                description: "Return the longest palindromic substring in s.",
                level: "hard",
                examples: [{ input: 's = "babad"', output: '"bab"', explanation: 'or "aba"' }],
                tests: [
                    { input: '["babad"]', expected: '"bab"' },
                    { input: '["cbbd"]', expected: '"bb"' },
                    { input: '["a"]', expected: '"a"' },
                    { input: '["ac"]', expected: '"a"' },
                    { input: '["forgeeksskeegfor"]', expected: '"geeksskeeg"' },
                ],
                variants: [
                    {
                        lang: "javascript", functionName: "longestPalindrome",
                        starterCode: `function longestPalindrome(s){ /* TODO */ }`,
                        optimalSolution: `function longestPalindrome(s){
  let bestL=0,bestR=0;
  const go=(l,r)=>{ while(l>=0&&r<s.length&&s[l]===s[r]){ l--; r++; } return [l+1,r-1]; };
  for(let i=0;i<s.length;i++){
    const a=go(i,i), b=go(i,i+1);
    if(a[1]-a[0] > bestR-bestL) [bestL,bestR]=a;
    if(b[1]-b[0] > bestR-bestL) [bestL,bestR]=b;
  }
  return s.slice(bestL,bestR+1);
}
`,
                        complexity: { time: "O(n^2)", space: "O(1)" }
                    },
                    {
                        lang: "python", functionName: "longestPalindrome",
                        starterCode: `def longestPalindrome(s):  # str -> str\n    pass\n`,
                        optimalSolution: `def longestPalindrome(s):
    if not s: return ""
    best=(0,0)
    def go(l,r):
        while l>=0 and r<len(s) and s[l]==s[r]:
            l-=1; r+=1
        return l+1,r-1
    for i in range(len(s)):
        a=go(i,i); b=go(i,i+1)
        if a[1]-a[0] > best[1]-best[0]: best=a
        if b[1]-b[0] > best[1]-best[0]: best=b
    return s[best[0]:best[1]+1]
`,
                        complexity: { time: "O(n^2)", space: "O(1)" }
                    },
                    {
                        lang: "java", functionName: "longestPalindrome",
                        starterCode: `public class Solution { public static String longestPalindrome(String s){ return ""; } }`,
                        optimalSolution: `public class Solution {
    public static String longestPalindrome(String s){
        if(s.length()==0) return "";
        int bl=0, br=0;
        for(int i=0;i<s.length();i++){
            int[] a=go(s,i,i), b=go(s,i,i+1);
            if(a[1]-a[0] > br-bl){ bl=a[0]; br=a[1]; }
            if(b[1]-b[0] > br-bl){ bl=b[0]; br=b[1]; }
        }
        return s.substring(bl, br+1);
    }
    static int[] go(String s,int l,int r){
        while(l>=0 && r<s.length() && s.charAt(l)==s.charAt(r)){ l--; r++; }
        return new int[]{l+1,r-1};
    }
}
`,
                        complexity: { time: "O(n^2)", space: "O(1)" }
                    },
                ],
            },
        ];
        // finally, append these to the existing easy `data` array:

        data = data.concat(mediumProblems);
        data = data.concat(hardProblems);
        console.log("ℹ️  Clearing old problems…");
        await Problem.deleteMany({});
        console.log("✅ Cleared");

        console.log("ℹ️  Inserting new problems…");
        const inserted = await Problem.insertMany(data);
        console.log(`✅ Inserted ${inserted.length} problems`);

        // quick sanity log
        inserted.forEach((p) => {
            const langs = (p.variants || []).map((v) => v.lang).join(", ");
            console.log(`   • ${p.title} [${langs}]`);
        });

        console.log("✅ Seed complete. Problems are ready.");
    } catch (err) {
        console.error("❌ Seed failed:", err?.message || err);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect().catch(() => { });
    }
}

main();
