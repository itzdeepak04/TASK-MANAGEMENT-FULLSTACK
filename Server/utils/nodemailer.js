import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
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
