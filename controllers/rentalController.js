const Car= require("../models/car")
const Issue= require("../models/issue")
const User= require("../models/user")
const Fawn = require("fawn")

//errors defining
const carIdError="Car Not Exists"
const userIdError="User Not Exists"
const issueError="Car is already in rental "


exports.issueCar= async(req,res,next)=>{

    const user = await User.findOne({name : req.body.name});
    if (!user) return res.status(400).send(userIdError);


    const car = await Car.findOne({model: req.body.model});
    if (!car) return res.status(400).send(carIdError);


    let issue= await Issue.lookup(user._id,car._id)
    

    if (issue && !issue.returnDate)
        return res.status(400).send(issueError);
    
    if(car.numberInStock==0 || car.numberOfBooking==car.numberInStock){
        return res.status(400).send("Not in Stock ");
    }

    issue= new Issue({
        user:{
            _id:user._id,
            name:user.name
        },
        car:{
            _id:car._id,
            model:car.model,
            dailyRentalRate:car.dailyRentalRate
        },
        issueDate:req.body.issueDate,
        returnDate:req.body.returnDate
    })

    await new Fawn.Task()
        .save("issues",issue)
        .update(
            "cars",
            {_id:car._id},
            {
                $inc:{numberInStock:-1,numberOfBooking:+1}
            }
        )
        .run();

    res.status(201).send(issue);

}

exports.getIssueDetails=async(req,res,next)=>{
    const issue = await Issue.findById(req.params.id)

    if (!issue) return res.status(404).send("Not Found Error")

    res.send(issue)
}

exports.getAll=async(req,res,next)=>{
    const rentals=await Issue.find().sort("returnDate")
    res.send(rentals)

}

exports.getMyIssue=async(req,res,next)=>{
    const rentals=await Issue.find({"user.name":req.body.name}).sort("returnDate")
    res.send(rentals)

}

exports.returnCar=async(req,res)=>{
    const user = await User.findOne({name : req.body.name});
    if (!user) return res.status(400).send(userIdError);


    const car = await Car.findOne({model: req.body.model});
    if (!car) return res.status(400).send(carIdError);


    let issue= await Issue.lookup(user._id,car._id)

    if(!issue)
    return res.status(400).send("Rental does not exist or already processed")


    // comparison with timestamp 
    date=issue.returnDate
    var today= new Date()
    if (date.getDate()==today.getDate()){
        car.numberInStock=car.numberInStock+1
        car.numberOfBooking=car.numberOfBooking-1
        await car.save()
    }
    
    
    res.send(issue)
}