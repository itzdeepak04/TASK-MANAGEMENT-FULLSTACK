
import mongoose from 'mongoose';
import {config} from 'dotenv';
config();
const mongoUrl=process.env.MONGODB_URL;
export async function dbconnection()
{
    try {
        await mongoose.connect(mongoUrl,{dbName:'todoData'});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('Error: ',error.message);
    }
}
