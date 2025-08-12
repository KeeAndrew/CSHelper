import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema(
    { url: String, filename: String, mimetype: String, size: Number },
    { _id: false }
);

const ReplySchema = new mongoose.Schema(
    {
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        body: { type: String, default: "" }, // allow attachments-only replies
        attachments: { type: [AttachmentSchema], default: [] },
    },
    { timestamps: true }
);

export default mongoose.model("Reply", ReplySchema);
