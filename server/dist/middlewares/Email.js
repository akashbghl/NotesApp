"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = exports.sendVerificationCode = void 0;
const Email_config_1 = require("./Email.config");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const EmailTemplate_1 = require("./EmailTemplate");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const sendVerificationCode = async (email, verificationCode) => {
    try {
        const response = await Email_config_1.transporter.sendMail({
            from: `"NotesApp" <${process.env.EMAIL_ID}>`,
            to: email,
            subject: "Verify your Email",
            text: "Verify Your Email",
            html: EmailTemplate_1.Verification_Email_Template.replace('{verificationCode}', verificationCode), // HTML body
        });
        console.log('Email Send Successfully ', response);
    }
    catch (error) {
        console.log('Email Error', error);
    }
};
exports.sendVerificationCode = sendVerificationCode;
const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await Email_config_1.transporter.sendMail({
            from: `"NotesApp" <${process.env.EMAIL_ID}>`,
            to: email,
            subject: "Welcome",
            text: "Welcome to NotesApp",
            html: EmailTemplate_1.Welcome_Email_Template.replace('{name}', name), // HTML body
        });
        console.log('Email Send Successfully ', response);
    }
    catch (error) {
        console.log('Email Error', error);
    }
};
exports.sendWelcomeEmail = sendWelcomeEmail;
//# sourceMappingURL=Email.js.map