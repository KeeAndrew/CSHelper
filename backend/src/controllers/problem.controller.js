import Problem from "../models/problem.model.js";

export const listProblems = async (req, res) => {
    const filter = {};
    if (req.query.level) filter.level = req.query.level;
    const probs = await Problem.find(filter).sort({ createdAt: -1 });
    res.json(probs);
};

export const getProblem = async (req, res) => {
    const prob = await Problem.findById(req.params.id);
    if (!prob) return res.status(404).json({ message: "Problem not found" });
    res.json(prob);
};
