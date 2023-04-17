const express = require("express")
require("dotenv").config()
const {connection} = require("./config/db")
const {userRouter} = require("./Routs/userRoute")
const app = express()
const {blogRouter} = require("./Routs/blogRoute")
const {Authentication} = require("./middleware/middleware")
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("This is Home Page")
})

app.use("/user", userRouter)

 app.use("/blog",Authentication, blogRouter)

app.listen(process.env.PORT, async()=>{
    try{
    await connection
    console.log("Connected to mongoAtlas");
    }catch(error){
    console.log(error);
    }
    console.log(`server is running at PORT ${process.env.PORT}`);
})