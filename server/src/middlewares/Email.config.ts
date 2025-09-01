import nodemailer from 'nodemailer'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
    },
});


