const Car= require("../models/car")
const Issue= require("../models/issue")
const User= require("../models/user")
const Fawn = require("fawn")

//errors defined for record not exists in database 
const carIdError="Car Not Exists"
const userIdError="User Not Exists"
const issueError="Car is already in rental "

// Issue the car 
exports.issueCar= async(req,res,next)=>{

    //getting the current user details 
    const user = await User.findOne({username : req.body.username});
    if (!user) return res.status(400).send(userIdError);

    //getting the required car details 
    const car = await Car.findOne({model: req.body.model});
    if (!car) return res.status(400).send(carIdError);

    //look the fetched user id and car id 
    let issue= await Issue.lookup(user._id,car._id)
    
    // if issue is already there 
    if (issue)
        return res.status(400).send(issueError);
    
    // if number of stock is zero or all car are booked
    if(car.numberInStock==0){
        return res.status(400).send("Not in Stock ");
    }

    //save the details 
    issue= new Issue({
        user:{
            _id:user._id,
            username:user.username
        },
        car:{
            _id:car._id,
            model:car.model,
            dailyRentalRate:car.dailyRentalRate
        },
        issueDate:req.body.issueDate,
        returnDate:req.body.returnDate
    })

    //transaction execute in mongodb 
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

//Get partiuclar issue details 
exports.getIssueDetails=async(req,res,next)=>{
    const issue = await Issue.findById(req.params.id)

    if (!issue) return res.status(404).send("Not Found Error")

    res.send(issue)
}

//Get all issue details 
exports.getAll=async(req,res,next)=>{
    const rentals=await Issue.find().sort("returnDate")
    res.send(rentals)

}
//Get all issued details of particular user
exports.getMyIssue=async(req,res,next)=>{
    const rentals=await Issue.find({"user.username":req.body.username}).sort("returnDate")
    res.send(rentals)

}

//Return the car 
exports.returnCar=async(req,res)=>{
    const user = await User.findOne({username : req.body.username});
    if (!user) return res.status(400).send(userIdError);


    const car = await Car.findOne({model: req.body.model});
    if (!car) return res.status(400).send(carIdError);

    //look the issue in database 
    let issue= await Issue.lookup(user._id,car._id)

    //if already exists 
    if(!issue)
    return res.status(400).send("Rental does not exist or already processed")


    
    returndate=issue.returnDate
    var today= new Date()

    //Comparison with today timestamp and return date of issue the update the avaliable stock and number of booked cars
    if (returndate.getDate()==today.getDate()){
        car.numberInStock=car.numberInStock+1
        car.numberOfBooking=car.numberOfBooking-1
        await car.save()
    }
    
   res.send(issue)
}