import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();
const secretKey=process.env.SECRET_KEY;
export function authentication(req,res,next)
{
    const {authorization}=req.headers;
    // console.log(authorization);
    if(!authorization)
    {
        return res.status(400).json({status:false,message:"User is not logged in or account may be deleted"});
    }
    else
    {
        const token=authorization.split(' ')[1];
        // console.log(token);
        try {
            const payload=jwt.verify(token,secretKey);
            req.user=payload;
            next();
        } catch (error) {
        return res.status(400).json({status:false,message:"Session time has passed login again"});
        }
    }
}