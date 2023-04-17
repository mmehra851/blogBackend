const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {userModel} = require("../model.js/usermodel")
const {blacklistModel} = require("../model.js/blacklist")

const userRouter = express.Router()
userRouter.use(express.json())
require("dotenv").config()

userRouter.post("/sign", async(req,res)=>{
    try{
  
     const {email,password} = req.body;
     if(await userModel.findOne({email})){
        res.send("This email is Already registered . use another email")
     }else{
        req.body.password = bcrypt.hashSync(password,7)
        const newuser = new userModel(req.body);
        await newuser.save()
        res.send(`New User Registered with Email ${req.body.email}`)
     }
    }catch(error){
      res.send(error)
    }
})


userRouter.post("/login", async(req,res)=>{
    try{
  
     const {email,password} = req.body;

    const user = await userModel.findOne({email})
    if(user){
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign({role: user.role}, process.env.token,{expiresIn:"1m"})
            const ref_token = jwt.sign({role: user.role}, process.env.refereshToken,{expiresIn:"3m"})
            res.send({token, ref_token})
        }else{
            res.send("Wrong Password")
        }
    }else{
        res.send("Please signUp first")
    }
    }catch(error){
      res.send(error)
    }
})


userRouter.post("/logout" , async(req,res)=>{
    const {email} = req.body;

    const user = await userModel.findOne({email})
    
    token = req.headers.authorization
    const newToken = blacklistModel({token})
    await newToken.save()
    res.send(`logout Successfull ${user.name}`)
    
})

module.exports = {
    userRouter 
}