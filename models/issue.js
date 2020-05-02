const mongoose= require("mongoose")

const issueSchema= new mongoose.Schema({
    user:{
        type: new mongoose.Schema({
            username:{
                type:String,
                required:true
            }
        }),
        required:true
        
    },

    car:{
        type:new mongoose.Schema({
            model:{
                type:String
            },
            dailyRentalRate:{
                type:Number,
                required:true
            }
        })
    },
    issueDate:{
        type:String,
        required:true,
        default: new Date().toString()
    },
    returnDate:{
        type:String,
        required:true
    },
    returned:{
        type:Boolean,
        default:false
    }

})


issueSchema.statics.lookup=function(userId,carId){
    return this.findOne({
        "user._id":userId,
        "car._id":carId,
    })
}
module.exports=mongoose.model("Issue",issueSchema)