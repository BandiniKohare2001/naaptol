import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    mobile: {
        type: String,
        required: true,
       unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
   
  },{
    timestamps: true,
  });
  
  const User = model('User', userSchema);
  
  export default User;