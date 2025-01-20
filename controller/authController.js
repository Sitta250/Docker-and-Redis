import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'

const authController ={
  signUp: async(req,res)=>{
    const{name, password} = req.body;
    const hashPassword = await bcrypt.hash(password,10)
    try{
      const newUser = await User.create({
        name,
        password: hashPassword,
      })
      req.session.user={
        id: newUser._id,
        name: newUser.name,
      }
      res.status(201).json({
        status:'sign in success',
        data:{
          user: newUser
        }
      })
    }
    catch(e){
      res.status(400).json({
        status: 'fail',
        message: e.message,
      })
    }
  },

  login: async(req,res)=>{
    const{name, password} = req.body;
    try{
      const user = await User.findOne({name})
      if(!user){
        return res.status(404).json({
          status:'faile',
          message: 'user not found',
        });
      }
      const valid = await bcrypt.compare(password,user.password);
      if(valid){
        req.session.user={
          id: user._id,
          name: user.name,
        }
        res.status(200).json({
          status:'success',
          message: 'loggin successful',
        })
      }else{
        res.status(400).json({
          status:'fail',
          message:'incorrect username or password'
        })
      }
    }
    catch(e){
      res.status(400).json({
        status: 'fail',
        message: e.message,
      })
    }
  }
}

export default authController;