import mongoose from "mongoose";

const otpModel=new mongoose.Schema(
    {
        email:{required:true,type:String,unique:true},
        otp:{required:true,type:String},
        createdAt:{
            type:Date,
            default:Date.now,
            expires:300
        }
    
})
export const OTP=mongoose.model('otp',otpModel);