const Car =require("../models/car")

//for getting the particular car details by its id 
module.exports=async (req,res,next)=>{
    const car = await Car.findById(req.params.id)
    if (car==null){
        res.status(404).send("Not Found Error")
    }
    res.car=car
    next()
}