import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    email:{required:true,type:String,unique:true},
    name:{required:true,type:String},
    dob:{required:true,type:String},
    password:{required:true,type:String},
    // complete:{required:true,type:Boolean}

})
export const USER=mongoose.model('user',userSchema);