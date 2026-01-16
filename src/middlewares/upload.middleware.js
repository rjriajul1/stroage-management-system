const multer = require("multer");
const path = require("path");

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = file.mimetype.split("/")[0]; // image/pdf/text
    let folder = "uploads/notes";
    if (type === "image") folder = "uploads/images";
    else if (file.mimetype === "application/pdf") folder = "uploads/pdfs";

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "application/pdf", "text/plain"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("File type not allowed"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
