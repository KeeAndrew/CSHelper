import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    attachments: { type: [AttachmentSchema], default: [] },
  },

  { timestamps: true }
);

const AttachmentSchema = new mongoose.Schema(
  {
    url: String,
    filename: String,
    mimetype: String,
    size: Number,
  },
  { _id: false }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
