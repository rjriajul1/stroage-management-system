const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER (no email verification)
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exist = await User.findOne({ email });
//     if (exist) return res.status(400).json({ message: "Email already exists" });

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashed,
//       isVerified: true, // skip email verification
//       usedStorage: 0,
//       totalStorage: 15 * 1024 * 1024 * 1024, // 15GB
//     });

//     // JWT Token generate
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     console.log(token)
//     res.status(201).json({
//       message: "Registered successfully",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         usedStorage: user.usedStorage,
//         totalStorage: user.totalStorage,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.register = async (req, res) => {
  try {
    console.log("Request body:", req.body); // <-- debug

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await User.findOne({ email });
    console.log("Existing user:", exist);

    const hashed = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const user = await User.create({
      name,
      email,
      password: hashed,
      isVerified: true,
      usedStorage: 0,
      totalStorage: 15 * 1024 * 1024 * 1024,
    });
    console.log("User created:", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("JWT token created");

    res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        usedStorage: user.usedStorage,
        totalStorage: user.totalStorage,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: err.message });
  }
};



// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // JWT Token generate
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        usedStorage: user.usedStorage,
        totalStorage: user.totalStorage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
