import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());


const connectMongoDB = async () => {
  const conn =  await mongoose.connect(process.env.ECOMMERCE_URI)

  if(conn){
    console.log('MongoDB connected successfully.');
  }
};
connectMongoDB();


app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
  });
  