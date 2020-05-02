const mongoose= require("mongoose")
const {ObjectId} = mongoose.Schema.Types

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
        type:Date,
        required:true,
        default:Date.now
    },
    returnDate:{
        type:Date,
        default:Date.now

    }

})


issueSchema.statics.lookup=function(userId,carId){
    return this.findOne({
        "user._id":userId,
        "car._id":carId,
    })
}
module.exports=mongoose.model("Issue",issueSchema)