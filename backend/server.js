import express from "express";
import dotEnv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import adminRoutes from './routes/adminRoute.js';
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
dotEnv.config();
import cookieParser from "cookie-parser";
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(path.resolve(),'backend/uploads')));

app.use(cookieParser());


const PORT = process.env.PORT || 5000;
app.get("/",(req,res)=>{
    res.send("Server is running");
});
app.use('/api/users',userRoutes);
app.use('/api/admin',adminRoutes)


app.use(notFound);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})