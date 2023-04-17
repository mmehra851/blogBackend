const express = require("express")

const {blogModel} = require("../model.js/blogmodel")

const {Authorization} = require("../middleware/middleware")

const blogRouter = express.Router()
blogRouter.use(express.json())
require("dotenv").config()

blogRouter.get("/all", async(req,res) =>{
    const allPost = await blogModel.find()
    res.send(allPost)
})

blogRouter.post("/newblog" , async(req,res)=>{
    try{
    const newblog = new blogModel(req.body)
    await newblog.save()
    res.send("new blog added")
    }catch(error){
     res.send(error)
    }
})

blogRouter.patch("/update", async(req,res)=>{
    try{
   await blogModel.findByIdAndUpdate({_id : req.params.id},req.body)
   res.send("blog updated")
    }catch(error){
    res.send(error)
    }
})

blogRouter.delete("/delete", Authorization,async(req,res)=>{
    try{
   await blogModel.findByIdAndDelete({_id : req.params.id})
   res.send("blog deleted")
    }catch(error){
    res.send(error)
    }
})

module.exports = {
    blogRouter
}