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
        min:0,
        max:100
    },
    numberOfBooking:{
        type:Number,
        default:0
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:100,
        max:1000
    }
})

module.exports= mongoose.model("Car",carSchema)