"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
console.log('Email Pass', process.env.EMAIL_PASS);
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "akash27aug.2002@gmail.com",
        pass: process.env.EMAIL_PASS,
    },
});
const sendEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: '"NotesApp" <akash27aug.2002@gmail.com>',
            to: "desiduniyac@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?", // plain‑text body
            html: "<b>Hello world?</b>", // HTML body
        });
        console.log("Email sent:", info.messageId);
    }
    catch (error) {
        console.log(error);
    }
};
sendEmail();
//# sourceMappingURL=Email.config.js.map