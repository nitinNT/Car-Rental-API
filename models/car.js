const mongoose= require("mongoose")

const carSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    model:{
        type:String,
        required:true
    },
    numberOfSeats:{
        type:Number,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0
    },
    numberOfBooking:{
        type:Number,
        default:0
    },
    dailyRentalRate:{
        type:Number,
        required:true
    },
    fuelType:{
        type:String
    }
})

module.exports= mongoose.model("Car",carSchema)