const User= require("../models/user")

exports.createUser=async(req,res,next)=>{
    
    let user = new User({
        name:req.body.name,
        password:req.body.password
    })

    user.save().then(savedUser=>{
        res.json("Created User")
    }).catch(err=>{
        console.log(err)
    })
    
}


exports.getUsers= async(req,res,next)=>{
    const users = await User.find()
    .select("-password")
    res.send(users)
}