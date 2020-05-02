const jwt=require("jsonwebtoken")
const {JWT_SECRET}= require("../keys")
const User= require("../models/user")
    
module.exports=(req,res,next)=>{
    const {authorization} = req.headers
    if (!authorization){
        return res.status(401).send("You Must be logged in ")
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if (err){
            return res.status(401).send("You must be logged in ")
        }

        const {_id}= payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
            next()    
        })
        
    })

}