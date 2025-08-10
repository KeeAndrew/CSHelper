import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true, trim: true, maxlength: 160 },
        body: { type: String, required: true, maxlength: 20000 },
        tags: [{ type: String, trim: true }],
        repliesCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

PostSchema.index({ createdAt: -1 });

export default mongoose.model("Post", PostSchema);
