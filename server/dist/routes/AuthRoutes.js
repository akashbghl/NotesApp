"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Email_1 = require("../middlewares/Email");
const AuthRoutes = express_1.default.Router();
AuthRoutes.post('/signup', async (req, res) => {
    try {
        const { name, dob, email } = req.body;
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);
        let user = await User_1.default.findOne({ email });
        if (user) {
            if (user.isverified) {
                return res.status(400).json({ success: false, message: 'Email already exists!' });
            }
            // update OTP for unverified user
            user.verificationCode = verificationCode;
            user.verificationCodeExpiry = expiry;
            await user.save();
            await (0, Email_1.sendVerificationCode)(user.email, verificationCode);
            return res.status(200).json({ success: true, message: 'OTP resent to email' });
        }
        // new user create
        user = await User_1.default.create({
            name,
            dob,
            email,
            verificationCode,
            verificationCodeExpiry: expiry,
        });
        await (0, Email_1.sendVerificationCode)(user.email, verificationCode);
        return res.status(200).json({ success: true, message: 'User created, OTP sent!' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
AuthRoutes.post('/signin', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }
        // generate OTP
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);
        user.verificationCode = verificationCode;
        user.verificationCodeExpiry = expiry;
        await user.save();
        await (0, Email_1.sendVerificationCode)(user.email, verificationCode);
        return res.status(200).json({ success: true, message: "OTP sent to email" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
AuthRoutes.post('/verify-otp', async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user ||
            !user.verificationCode ||
            user.verificationCode !== code ||
            !user.verificationCodeExpiry ||
            user.verificationCodeExpiry.getTime() < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired code' });
        }
        // clear OTP
        user.verificationCode = null;
        user.verificationCodeExpiry = null;
        user.isverified = true;
        await user.save();
        // send welcome email only on first signup
        if (!user.isWelcomeSent) {
            await (0, Email_1.sendWelcomeEmail)(user.email, user.name);
            user.isWelcomeSent = true;
            await user.save();
        }
        // JWT generate
        const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, dob: user.dob, email: user.email }, process.env.JWT_SECRET || "secret123", { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ success: true, message: "OTP verified, login successful", token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
AuthRoutes.get('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return res.status(200).json({ message: "Logged Out" });
    }
    catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = AuthRoutes;
//# sourceMappingURL=AuthRoutes.js.map