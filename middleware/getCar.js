const Car =require("../models/car")

module.exports=async (req,res,next)=>{
    const car = await Car.findById(req.params.id)
    if (car==null){
        res.status(404).send("Not Found Error")
    }
    res.car=car
    next()
}