"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const AuthRoutes = express_1.default.Router();
AuthRoutes.post('/signup', async (req, res) => {
    try {
        const { name, dob, email } = req.body;
        const userExist = await User_1.default.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: 'Email already exists!' });
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(verificationCode);
        const userData = await User_1.default.create({
            name,
            dob,
            email,
            verificationCode,
        });
        return res.status(200).json({ success: true, message: 'User Created', userData });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.default = AuthRoutes;
//# sourceMappingURL=AuthRoutes.js.map