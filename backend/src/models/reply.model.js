import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
    {
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        body: { type: String, required: true, maxlength: 10000 },
    },
    { timestamps: true }
);

ReplySchema.index({ post: 1, createdAt: 1 });

export default mongoose.model("Reply", ReplySchema);
