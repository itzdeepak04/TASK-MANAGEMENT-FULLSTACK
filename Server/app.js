import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {dbconnection} from './db/mongodb.js'
import {userRouter} from './Router/userRouter.js'
import { taskRouter } from './Router/taskRouter.js';
import {config} from 'dotenv';
const app=express();
config();
dbconnection();
const port=process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:'https://task-management-frontend-kzl7.onrender.com',credentials:true}));

app.use('/api/user',userRouter);
app.use('/api/task',taskRouter);

app.listen(port,()=>{
    console.log('Server Started');
})