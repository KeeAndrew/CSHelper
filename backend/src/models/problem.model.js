import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
    {
        // JSON string fields so the client can JSON.parse safely
        // e.g. input: "[[2,7,11,15], 9]"  expected: "[0,1]" or "true"
        input: { type: String, required: true },
        expected: { type: String, required: true },
    },
    { _id: false }
);

const exampleSchema = new mongoose.Schema(
    {
        // Display-only examples (human-readable, not executed)
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String, default: "" },
    },
    { _id: false }
);

const variantSchema = new mongoose.Schema(
    {
        lang: { type: String, enum: ["javascript", "python", "java"], required: true },
        functionName: { type: String, required: true }, // for Java: method name inside Solution
        starterCode: { type: String, required: true },  // show in editor (with method header)
        optimalSolution: { type: String, required: true },
        complexity: {
            time: { type: String, default: "" },
            space: { type: String, default: "" },
        },
    },
    { _id: false }
);

const problemSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        level: { type: String, enum: ["easy", "medium", "hard"], required: true },
        examples: { type: [exampleSchema], default: [] },
        tests: { type: [testSchema], default: [] },
        variants: { type: [variantSchema], default: [] },
    },
    { timestamps: true }
);

export default mongoose.model("Problem", problemSchema);
