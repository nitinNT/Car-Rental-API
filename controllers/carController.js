const Car= require("../models/car")
const Issue= require("../models/issue")
const User= require("../models/user")

exports.createCar=async(req,res,next)=>{
    const car = new Car(setValues(req));
    await car.save()

    res.status(201).send(car);
}

exports.updateCar=async(req,res)=>{
    if (res.car.numberOfBooking==0){
        res.car.numberInStock=req.body.numberInStock
        const updatedCar =await res.car.save()
        res.send(updatedCar)
    }
    res.status(400).send("Can't Updated ")
}

exports.deleteCar=async(req,res)=>{
    if (res.car.numberOfBooking==0){
        
        await res.car.remove()
        res.send('Deleted this car ')
    }
    res.status(400).send("Can't Deleted")
}


exports.getAll=async(req,res)=>{
    const cars= await Car.find()
    res.send(cars)
}
// exports.updateCar= async(req,res)=>{
//     console.log(req.params.id)
//     const car = await Car.findById(req.params.id)

//     car.daily
// }

function setValues(req){
    return{
        name:req.body.name,
        model:req.body.model,
        numberOfSeats:req.body.numberOfSeats,
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    };
}
