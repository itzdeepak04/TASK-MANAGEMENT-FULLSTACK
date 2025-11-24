// import nodemailer from 'nodemailer';
// import { config } from 'dotenv';
// config();
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.NODEMAILER_EMAIL,
//         pass: process.env.NODEMAILER_PASS
//     }
// })

// export async function sendOtp(to, subject, otp) {
//     try {
//         await transporter.sendMail(
//             {
//                 from: process.env.NODEMAILER_EMAIL,
//                 to,
//                 subject,
//                 html: `Otp for forgot Password is <b>${otp}</b>. It will valid for 5 minutes.`
//             }
//         )
//     } catch (error) {
//         console.error('Error sending OTP:', error.message);
//         throw new Error(error.message);
//     }
// }


// utils/sendOtp.js
import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';
config();

sgMail.setApiKey(process.env.API_KEY);

export async function sendOtp(to, subject, otp) {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_EMAIL, 
      subject,
      html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`,
    };

    await sgMail.send(msg);
    console.log('OTP sent to:', to);
  } catch (error) {
    console.error('Error sending OTP:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw new Error(error.message);
  }
}

