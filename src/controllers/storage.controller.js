const Folder = require("../models/Folder");
const File = require("../models/File");
const User = require("../models/User");

// Create default folders for user
exports.createDefaultFolders = async (req, res) => {
  try {
    const userId = req.user._id;

    const existing = await Folder.find({ user: userId });
    if (existing.length) return res.json({ message: "Folders already exist" });

    const folders = ["images", "pdfs", "notes"];
    for (let name of folders) {
      await Folder.create({ user: userId, name });
    }

    res.json({ message: "Default folders created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload file
exports.uploadFile = async (req, res) => {
  try {
    const userId = req.user._id;
    const folderType = req.body.folder; // images / pdfs / notes
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Check user storage
    const user = await User.findById(userId);
    if (user.usedStorage + file.size > user.totalStorage) {
      return res.status(400).json({ message: "Storage limit exceeded" });
    }

    const folder = await Folder.findOne({ user: userId, name: folderType });
    if (!folder) return res.status(404).json({ message: "Folder not found" });

    const savedFile = await File.create({
      user: userId,
      folder: folder._id,
      name: file.originalname,
      type: folderType,
      size: file.size,
      path: file.path,
    });

    // Update used storage
    user.usedStorage += file.size;
    await user.save();

    res.json({ message: "File uploaded", file: savedFile, usedStorage: user.usedStorage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List files per folder
exports.listFiles = async (req, res) => {
  try {
    const userId = req.user._id;
    const folderType = req.params.folder; // images/pdfs/notes

    const folder = await Folder.findOne({ user: userId, name: folderType });
    if (!folder) return res.status(404).json({ message: "Folder not found" });

    const files = await File.find({ user: userId, folder: folder._id });

    res.json({ files });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
