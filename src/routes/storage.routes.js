const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const storageController = require("../controllers/storage.controller");

// Create default folders
router.post("/create-folders", storageController.createDefaultFolders);

// Upload file
router.post("/upload", protect, upload.single("file"), storageController.uploadFile);

// List files
router.get("/files/:folder", protect, storageController.listFiles);

module.exports = router;
