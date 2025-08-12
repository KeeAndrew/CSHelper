import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema(
    { url: String, filename: String, mimetype: String, size: Number },
    { _id: false }
);

const PostSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        body: { type: String, required: true },
        tags: { type: [String], default: [] },
        attachments: { type: [AttachmentSchema], default: [] },
        repliesCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
