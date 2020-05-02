const Car= require("../models/car")

//Add new Car in Car Schema
exports.createCar=async(req,res,next)=>{
    const car = new Car(setValues(req));
    await car.save()

    res.status(201).send(car);
}

//Update the car details  when numnber of Bookings is 0
exports.updateCar=async(req,res)=>{
    if (res.car.numberOfBooking==0){
        res.car.numberInStock=req.body.numberInStock
        res.car.dailyRentalRate=req.body.dailyRentalRate
        const updatedCar =await res.car.save()
        res.send(updatedCar)
    }
    res.status(400).send("Can't Updated ")
}

//delete the car when number of bookings is 0
exports.deleteCar=async(req,res)=>{
    if (res.car.numberOfBooking==0){
        
        await res.car.remove()
        res.send('Deleted this car ')
    }
    res.status(400).send("Can't Deleted")
}

// Get all car details 
exports.getAll=async(req,res)=>{
    const cars= await Car.find()
    res.send(cars)
}

//Function for set the details of car 
function setValues(req){
    return{
        name:req.body.name,
        model:req.body.model,
        fuelType:req.body.fuelType,
        numberOfSeats:req.body.numberOfSeats,
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    };
}
