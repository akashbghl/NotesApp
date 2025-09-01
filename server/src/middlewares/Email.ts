import { transporter } from "./Email.config"
import path from 'path'
import dotenv from 'dotenv'
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const sendVerificationCode = async(email:string , verificationCode:string)=> {
    try {
        const response = await transporter.sendMail({
            from: `"NotesApp" <${process.env.EMAIL_ID}>`,
            to: email,
            subject: "Verify your Email",
            text: "Verify Your Email", 
            html: Verification_Email_Template.replace('{verificationCode}',verificationCode), // HTML body
        })
        console.log('Email Send Successfully ',response)
    } catch (error) {
        console.log('Email Error',error);
    }   
}
export const sendWelcomeEmail = async(email:string , name:string)=> {
    try {
        const response = await transporter.sendMail({
            from: `"NotesApp" <${process.env.EMAIL_ID}>`,
            to: email,
            subject: "Welcome",
            text: "Welcome to NotesApp", 
            html: Welcome_Email_Template.replace('{name}',name), // HTML body
        })
        console.log('Email Send Successfully ',response)
    } catch (error) {
        console.log('Email Error',error);
    }   
}