import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { sendOTP } from "../services/mail.service";

// Helper to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      if (existing.isVerified) {
        return res.status(400).json({ message: "User already exists and is verified. Please log in." });
      }
      // OTP_DISABLED: If user exists but not verified, update and re-verify immediately
      const hashed = await bcrypt.hash(password, 10);
      existing.name = name;
      existing.password = hashed;
      existing.isVerified = true;
      // OTP_DISABLED: existing.otp = generateOTP();
      // OTP_DISABLED: existing.otpExpires = new Date(Date.now() + 10 * 60000);
      await existing.save();
      // OTP_DISABLED: await sendOTP(email, existing.otp);

      const token = jwt.sign(
        { id: existing._id },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1d" }
      );
      return res.json({ message: "Registration successful.", token, user: { id: existing._id, name: existing.name, email: existing.email } });
    }

    const hashed = await bcrypt.hash(password, 10);
    // OTP_DISABLED: const otp = generateOTP();
    // OTP_DISABLED: const otpExpires = new Date(Date.now() + 10 * 60000);

    const user = await User.create({
      name,
      email,
      password: hashed,
      // OTP_DISABLED: otp,
      // OTP_DISABLED: otpExpires,
      isVerified: true, // OTP_DISABLED: set to true to skip verification
    });

    // OTP_DISABLED: await sendOTP(email, otp);

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ message: "Registration successful.", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // OTP_DISABLED: Skip OTP step, issue token directly
    // OTP_DISABLED: const otp = generateOTP();
    // OTP_DISABLED: const otpExpires = new Date(Date.now() + 10 * 60000);
    // OTP_DISABLED: user.otp = otp;
    // OTP_DISABLED: user.otpExpires = otpExpires;
    // OTP_DISABLED: await user.save();
    // OTP_DISABLED: await sendOTP(email, otp);
    // OTP_DISABLED: res.json({ message: "Code sent to your email. Please verify to sign in." });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// VERIFY OTP
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || user.otp !== otp || (user.otpExpires && user.otpExpires < new Date())) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP and verify user
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ 
      message: "Login successful", 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// RESEND OTP
export const resendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOTP(email, otp);

    res.json({ message: "New code sent to your email." });
  } catch (err) {
    console.error("Resend OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
