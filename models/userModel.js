import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required:[true, "user must have a username"],
    unique: true,
  },
  password:{
    type: String,
    required:[true, "user must have a password"],
  }
})

const User = mongoose.model("User", userSchema)
export default User;