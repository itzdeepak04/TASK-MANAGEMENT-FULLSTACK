import express from 'express';
export const userRouter=express.Router();
import {userSignup,userLogin, userForgotPassword, userVerifyOtp, changePassword} from '../Controller/userController.js'
userRouter.post('/signup',userSignup);
userRouter.post('/login',userLogin);
userRouter.post('/forgotPassword',userForgotPassword);
userRouter.post('/verifyOtp',userVerifyOtp);
userRouter.post('/changePassword',changePassword);