import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { USER } from '../model/User.js'
import { OTP } from '../model/otpModel.js';
import { generateOtp } from '../utils/generateOtp.js';
import { sendOtp } from '../utils/nodemailer.js';
import { config } from 'dotenv';
config();
const secretKey = process.env.SECRET_KEY;
export async function userSignup(req, res) {
    const { name, email, dob, password } = req.body;
    try {
        if (!name || !email || !dob || !password) {
            return res.status(400).json({ status: false, message: "All fields are mandatory" });
        }
        else {
            const isPresent = await USER.findOne({ email });
            if (isPresent) {
                return res.status(409).json({ status: false, message: "User with this email already exist" });
            }
            else {
                try {
                    const hassPass = await bcrypt.hash(password, 10);
                    await USER.insertOne({ email, name, dob, password: hassPass });
                    return res.status(201).json({ status: true, message: "User Created Successfully" });
                } catch (error) {
                    return res.status(500).json({ status: false, message: "Internal server error" });
                }
            }
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "Server side error" });

    }
}

export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: false, message: "All fields are mandatory" });
        }
        else {
            const isPresent = await USER.findOne({ email });
            if (!isPresent) {
                return res.status(400).json({ status: false, message: "Invalid email" });
            }
            else {
                try {
                    const isMatchingPass = await bcrypt.compare(password, isPresent.password);
                    if (!isMatchingPass) {
                        return res.status(400).json({ status: false, message: "Invalid password" });
                    }
                    else {
                        const payload = { email, role: 'Patient' };
                        const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
                        return res.status(200).json({ status: true, message: "Login Successfull", token, name: isPresent.name });

                    }
                } catch (error) {
                    return res.status(500).json({ status: false, message: "Internal server error" });
                }
            }
        }
    } catch (error) {

        return res.status(500).json({ status: false, message: "Server side Error" });

    }
}
export async function userForgotPassword(req, res) {
    try {
        if (req.body == undefined)
            return res.status(400).json({ status: false, message: "Input fields provide" });

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ status: false, message: "All fields are mandatory" });
        }
        else {
            const isPresent = await USER.findOne({ email });
            if (!isPresent) {
                return res.status(400).json({ status: false, message: "User with this email not exist" });
            }
            else {
                const isOtpSent = await OTP.findOne({ email });
                if (isOtpSent) {
                    return res.status(400).json({ status: true, message: "Otp already sent try after some time" });
                }
                else {
                    const otp = generateOtp();
                    const hassOtp = await bcrypt.hash(otp, 10);
                    await OTP.insertOne({ email, otp: hassOtp });
                    sendOtp(email, 'OTP TO FORGOT PASSWORD', otp);
                    res.cookie('email', email, { httpOnly: true, sameSite: 'lax', secure: 'false' });
                    return res.status(200).json({ status: true, message: "Otp sent" });
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server side error" });
    }
}

export async function userVerifyOtp(req, res) {
    try {
        const { email } = req.cookies;
        if (!email) {
            return res.status(400).json({ status: false, message: "No email is there to verify otp" });
        }
        else {
            const isOtpPresent = await OTP.findOne({ email });
            if (!isOtpPresent) {
                return res.status(400).json({ status: false, message: "Invalid email or otp is expired" });
            }
            else {
                if (req.body == undefined)
                    return res.status(400).json({ status: false, message: "Send input fields" });
                const { otp } = req.body;
                if (!otp) {
                    return res.status(400).json({ status: false, message: "Otp is required" });
                }
                else {
                    const decryptOtp = await bcrypt.compare(otp, isOtpPresent.otp);
                    if (!decryptOtp) {
                        return res.status(400).json({ status: false, message: "Invalid otp" });
                    }
                    else {
                        const token = jwt.sign({ email }, secretKey, { expiresIn: "7d" });
                        res.cookie('passwordToken', token, { httpOnly: true, sameSite: 'lax', secure: 'false' });
                        return res.status(200).json({ status: true, message: "Otp verified" });
                    }
                }
            }
        }

    } catch (error) {
        return res.status(500).json({ status: false, message: "Server side error" });
    }
}

export async function changePassword(req, res) {
    try {
        const { passwordToken } = req.cookies;
        if (!passwordToken) {
            return res.status(400).json({ status: false, message: "Otp is not verified" });
        }
        try {
            const payload=jwt.verify(passwordToken,secretKey);
            const {email}=payload;
            if(req.body==undefined)
                return res.status(400).json({ status: false, message: "Send input field" });
            const {newPassword,confirmPassword}=req.body;
            if(!newPassword || !confirmPassword)
            {
                return res.status(400).json({ status: false, message: "All fields are mandatory" });
            }
            else
            {
                if(newPassword!=confirmPassword)
                return res.status(400).json({ status: false, message: " Password is not matching with confirm Password" });
                try {
                    const hassPass=await bcrypt.hash(newPassword,10)
                await USER.findOneAndUpdate({email},{$set:{password:hassPass}});
                res.clearCookie('email',{httpOnly:true,sameSite:'lax',secure:false});
                res.clearCookie('passwordToken',{httpOnly:true,sameSite:'lax',secure:false});
                return res.status(200).json({ status: true, message: "Password changed successfully" });
                } catch (error) {
                return res.status(200).json({ status: true, message: "Password not updated something went wrong" });     
                }
            }
        } catch (error) {
            return res.status(400).json({ status: false, message: "Invalid token" });
        }

    } catch (error) {
            return res.status(500).json({ status: false, message: "Server side error" });
    }
}