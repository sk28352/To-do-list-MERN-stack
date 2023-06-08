import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const PORT = 8000;
const app = express();

//middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

mongoose.set('strictQuery', true);

//routes

app.use('/api', allRoutes);

//error handler
app.use((err,req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    return res.status(status).json({
        message, stack: err.stack }); 
    });

const connectDB = async () => {
 try{
 await mongoose.connect("mongodb://127.0.0.1:27017/task_management_rec");
 console.log('mongodb connected');
}catch(err){
    console.log(err);
    process.exit(1);
}

}

app.listen(PORT, ()  => {
    connectDB();
    console.log(`server is running at port ${PORT}`);
});8