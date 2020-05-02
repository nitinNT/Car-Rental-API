const User= require("../models/user")
const bcrypt= require("bcryptjs")
const jwt=require("jsonwebtoken")
const {JWT_SECRET}= require("../keys")

//create new user in database 
exports.createUser=async(req,res,next)=>{
    const {password}= req.body
    // hash the password 
    bcrypt.hash(password,12).then(hashedPassword=>{
        let user = new User({
            username:req.body.username,
            password:hashedPassword,
            admin:req.body.admin
        })

        user.save().then(savedUser=>{
            res.send("Created User")
        }).catch(err=>{
            console.log(err)
        })
        
    
    })

    
    
}

// GET all user details except password 
exports.getUsers= async(req,res,next)=>{
    const users = await User.find()
    .select("-password")
    res.send(users)
}

//login 
exports.login=async(req,res)=>{
    const {username,password}=req.body

    //check the user exists in database
    // if exists then compare secured password 
    User.findOne({username:username}).then(savedUser=>{
        bcrypt.compare(password,savedUser.password).then(match=>{
            
            if (match){
                // give the token for authentication 
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.send(token)
            }
            else{
                res.send("Invalid username or password")
            }
        })
    })
}