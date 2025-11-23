import mongoose from "mongoose";
import { USER } from "../model/User.js";
import { TASK } from "../model/Task.js";

export async function addTask(req,res)
{
    const {email}=(req.user);
    try {
        const isPresent=await USER.findOne({email});
        if(!isPresent)
        {
            return res.status(400).json({status:false,message:"Account is deleted or not available"});
        }
        else
        {
            if(req.body==undefined)
            return res.status(400).json({status:false,message:"Send input fields"});
            const {title,description,category,priority,date,complete}=req.body;
            if(!title || !description || !category || !priority || !date)
            {
                return res.status(400).json({status:false,message:"All input fields are mandatory"})
            }
            else
            {
                try {
                    await TASK.insertOne({email,title,description,category,priority,date,complete:false});
                    return res.status(200).json({status:true,message:"Task added"})

                } catch (error) {
                    return res.status(400).json({status:false,message:"Task not added"})
                }
            }
        }
    } catch (error) {
        return res.status(500).json({status:false,message:"Server side error"})
    }
}

export async function getTask(req,res)
{
    const {email}=req.user;
    try {
        const data=await TASK.find({email});
            return res.status(200).json({status:true,message:"Content Shown",data});
    } catch (error) {
            return res.status(400).json({status:false,message:"No data is present"});
    }
}
export async function deleteTask(req,res)
{
    const {_id}=req.params;
    try {
        await TASK.findOneAndDelete({_id});
        return res.status(200).json({status:true,message:"Deleted"});

    } catch (error) {
            return res.status(400).json({status:false,message:"No data is present with this id"});
    }
}

export async function completeTask(req,res)
{
    const {_id}=req.params;
    try {
        const task=await TASK.findById(_id);
        await TASK.findOneAndUpdate({_id},{$set:{complete:!task.complete}});
        return res.status(200).json({status:true,message:"Updated"});

    } catch (error) {
            return res.status(400).json({status:false,message:"No data is present with this id"});
    }
}

export async function editTask(req,res)
{
    const {_id}=req.params;
    try {
        const data=await TASK.findOne({_id});
            return res.status(200).json({status:true,message:"Edited",data});
    } catch (error) {
            return res.status(400).json({status:false,message:"No data is present with this id"});
    }
}

export async function updateTask(req,res)
{
    const {_id}=req.params;
    const data=req.body;
    try {
        await TASK.findByIdAndUpdate(_id,{$set:data});
            return res.status(200).json({status:true,message:"Updated"});
    } catch (error) {
            return res.status(400).json({status:false,message:"No data is present with this id"});
    }
}

export async function sortByDate(req,res)
{
    const {email}=req.user;
    try {
        const data=await TASK.find({email}).sort({date:1});
        return res.status(200).json({status:true,message:'Sorted',data});
    } catch (error) {
        return res.status(400).json({status:true,message:'Not sorted'});
    }
}

export async function sortByPriority(req,res)
{
    const {email}=req.user;
    try {
        const data=await TASK.aggregate([{$match:{email}},{$addFields:{priorityOrder:{$indexOfArray:[['easy','medium','hard'],'$priority']}}},{$sort:{priorityOrder:1}},{$project:{priorityOrder:0}}]);
        return res.status(200).json({status:true,message:'Sorted',data});
    } catch (error) {
        return res.status(400).json({status:true,message:'Not sorted'});
    }
}