const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const storageRoutes = require("./routes/storage.routes");
const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Storage Management Backend Running...");
});

app.use("/api/auth", authRoutes);


app.use("/api/storage", storageRoutes);

module.exports = app;
