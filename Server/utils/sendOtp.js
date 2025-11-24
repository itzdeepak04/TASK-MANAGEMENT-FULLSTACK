import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();
const transporter = nodemailer.createTransport({
     host: "smtp-relay.brevo.com", 
    port: 587,              
    secure: false, 
    auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.API_KEY
    }
})

export async function sendOtp(to, subject, otp) {
    try {
        await transporter.sendMail(
            {
                from: process.env.NODEMAILER_EMAIL,
                to,
                subject,
                html: `Otp for forgot Password is <b>${otp}</b>. It will valid for 5 minutes.`
            }
        )
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        throw new Error(error.message);
    }

  }
