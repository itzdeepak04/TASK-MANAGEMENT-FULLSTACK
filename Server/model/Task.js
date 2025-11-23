import mongoose from "mongoose";

const taskModel=new mongoose.Schema(
    {
        email:{required:true,type:String},
        title:{required:true,type:String},
        description:{required:true,type:String},
        category:{required:true,type:String},
        priority:{required:true,type:String},
        date:{required:true,type:String},
        complete:{required:true,type:Boolean}

    }
)
export const TASK=mongoose.model('task',taskModel);