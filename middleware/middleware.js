const jwt = require("jsonwebtoken")
 
require("dotenv").config()

const Authentication = async(req,res,next)=>{
    try{
        token = req.headers.authorization
        if(!token){
            res.send("This token is not valid")
        }
        const validToken = jwt.verify(token,process.env.token)
        req.body.role = validToken.role
        if(!validToken){
            return res.send("Token expired please login again")
            next()
        }
    }catch(error){
     res.send(error)
    }
}


const Authorization = (AuthorizedRole)=>{
    return((req,res,next)=>{
        const userRole = req.body.role
        if(AuthorizedRole.includes(userRole)){
            next()
        }else{
            return res.send("You are not Authorized to make this request")
        }
    })
}

module.exports = {
    Authentication,
    Authorization
}