import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model.js";

/* -------------------------
   Helpers
-------------------------- */

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const generateEmailToken = () => {
  const raw = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(raw).digest("hex");
  return { raw, hashed };
};

/* -------------------------
   REGISTER
-------------------------- */

export const register = async (req, res) => {
  try {
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

    const { raw, hashed } = generateEmailToken();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      emailVerificationToken: hashed,
      emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24h
    });

    // 🔔 TEMP: console email link (Phase 12.3 UI later)
    console.log(
      `📧 Verify email: http://localhost:5173/verify-email?token=${raw}`
    );

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        token,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (err) {
    console.error("Register failed:", err);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

/* -------------------------
   LOGIN
-------------------------- */

export const login = async (req, res) => {
  try {
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
      data: {
        token,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

/* -------------------------
   VERIFY EMAIL
-------------------------- */

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification link",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.error("Verify email failed:", err);
    res.status(500).json({
      success: false,
      message: "Email verification failed",
    });
  }
};

/* -------------------------
   RESEND EMAIL
-------------------------- */

export const resendVerificationEmail = async (req, res) => {
  try {
    const user = req.user;

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.emailVerificationToken = verificationToken;
    user.emailVerificationTokenExpires =
      Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    await user.save();

    // 🔔 TEMP (console email – we’ll switch to real mail later)
    console.log(
      `🔁 Resend verify email: http://localhost:5173/verify-email?token=${verificationToken}`
    );

    res.json({
      success: true,
      message: "Verification email resent",
    });
  } catch (err) {
    console.error("Resend verification failed:", err);
    res.status(500).json({
      success: false,
      message: "Failed to resend verification email",
    });
  }
};
