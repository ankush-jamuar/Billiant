import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model.js";

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const generateEmailToken = () => crypto.randomBytes(32).toString("hex");

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = generateEmailToken();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    emailVerificationToken: verificationToken,
    emailVerificationTokenExpires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  // 🔔 TEMP email sending (console)
  console.log(
  `Verify email link: http://localhost:5173/verify-email?token=${verificationToken}`
);

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    data: { token },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    data: { token },
  });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  console.log("VERIFY TOKEN RECEIVED:", token);

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  console.log("USER FOUND:", user);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired verification link",
    });
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;

  await user.save();

  res.json({
    success: true,
    message: "Email verified successfully",
  });
};
