const User= require("../models/user")
const bcrypt= require("bcryptjs")
const jwt=require("jsonwebtoken")
const {JWT_SECRET}= require("../keys")

exports.createUser=async(req,res,next)=>{
    const {password}= req.body

    bcrypt.hash(password,12).then(hashedPassword=>{
        let user = new User({
            username:req.body.username,
            password:hashedPassword,
            admin:req.body.admin
        })

        user.save().then(savedUser=>{
            res.json("Created User")
        }).catch(err=>{
            console.log(err)
        })
        
    
    })

    
    
}


exports.getUsers= async(req,res,next)=>{
    const users = await User.find()
    .select("-password")
    res.send(users)
}

exports.login=async(req,res)=>{
    const {username,password}=req.body

    User.findOne({username:username}).then(savedUser=>{
        bcrypt.compare(password,savedUser.password).then(match=>{
            if (match){
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.send(token)
            }
            else{
                res.send("Invalid username or password")
            }
        })
    })
}