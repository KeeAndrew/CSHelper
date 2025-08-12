import Post from "../models/post.model.js";
import Reply from "../models/reply.model.js";

// GET /api/posts
export const listPosts = async (req, res) => {
    const posts = await Post.find({})
        .sort({ createdAt: -1 })
        .populate("user", "fullName profilePic");
    res.json(posts);
};

// GET /api/posts/:id
export const getPost = async (req, res) => {
    const post = await Post.findById(req.params.id).populate("user", "fullName profilePic");
    if (!post) return res.status(404).json({ message: "Post not found" });

    const replies = await Reply.find({ post: post._id })
        .sort({ createdAt: 1 })
        .populate("user", "fullName profilePic");

    res.json({ post, replies });
};

// POST /api/posts
export const createPost = async (req, res) => {
    const { title, body, tags = [] } = req.body || {};
    if (!title?.trim() || !body?.trim()) {
        return res.status(400).json({ message: "Title and body are required" });
    }
    const doc = await Post.create({
        user: req.user._id,
        title: title.trim(),
        body: body.trim(),
        tags: tags.map(String),
    });
    const populated = await doc.populate("user", "fullName profilePic");
    res.status(201).json(populated);
};

// DELETE /api/posts/:id
export const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (String(post.user) !== String(req.user._id)) {
        return res.status(403).json({ message: "Not allowed" });
    }
    await Reply.deleteMany({ post: post._id });
    await post.deleteOne();
    res.json({ ok: true });
};

// POST /api/posts/:id/replies
export const createReply = async (req, res) => {
    const { body } = req.body || {};
    if (!body?.trim()) return res.status(400).json({ message: "Reply body required" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const reply = await Reply.create({
        post: post._id,
        user: req.user._id,
        body: body.trim(),
    });

    await Post.findByIdAndUpdate(post._id, { $inc: { repliesCount: 1 } });
    const populated = await reply.populate("user", "fullName profilePic");
    res.status(201).json(populated);
};
