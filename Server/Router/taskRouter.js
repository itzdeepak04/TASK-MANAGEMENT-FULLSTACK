import express from 'express';
import { authentication } from '../Authentication/Authentication.js';
import { addTask, completeTask, deleteTask, editTask, getTask, sortByDate, sortByPriority, updateTask } from '../Controller/taskController.js';
export const taskRouter=express.Router();

taskRouter.post('/',authentication,addTask);
taskRouter.get('/',authentication,getTask);
taskRouter.put('/update/:_id',authentication,updateTask)
taskRouter.delete('/delete/:_id',deleteTask);
taskRouter.patch('/complete/:_id',completeTask);
taskRouter.get('/edit/:_id',editTask);
taskRouter.get('/sortByDate',authentication,sortByDate);
taskRouter.get('/sortByPriority',authentication,sortByPriority)
