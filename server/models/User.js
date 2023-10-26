import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String
    },
    email: String,
    mobile: String,
    password: String,
    address: String,
    gender: String
   
  });
  
  const User = model('User', userSchema);
  
  export default User;