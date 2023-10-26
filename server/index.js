import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import User from "./models/User.js";
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

app.post('/signup', async (req, res) => {
    const { name, email, mobile, password , address, gender} = req.body;
    const obj = new User({
        name: name,
        email: email,
        mobile:mobile,
        password: password,
        address: address,
        gender: gender
      })
    
      const saveUser = await obj.save();
    
      res.json({
        success: true,
        data: saveUser,
        message: 'Sign up Successfully',
      })
})


app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
  });
  