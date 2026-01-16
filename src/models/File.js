const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: true },
    name: { type: String, required: true },
    type: { type: String, required: true }, // image/pdf/note
    size: { type: Number, required: true },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
