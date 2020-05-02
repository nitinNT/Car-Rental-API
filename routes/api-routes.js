const router = require('express').Router();
const carController= require("../controllers/carController")
const userController= require("../controllers/userController")
const rentalController= require("../controllers/rentalController")


//importing middleware

const getCar= require("../middleware/getCar")
const requireLogin=require("../middleware/requireLogin")


//routes defined for user
router.post("/createUser",userController.createUser)
router.get("/users",userController.getUsers)
router.post("/login",userController.login)

//routes defined for car details
router.get("/allcars",carController.getAll)
router.post("/createCar",[requireLogin],carController.createCar)
router.put("/update/:id",[requireLogin,getCar],carController.updateCar)
router.delete("/delete/:id",[requireLogin,getCar],carController.deleteCar)

//routes defined for rentals
router.post("/issue",rentalController.issueCar)
router.post("/me",rentalController.getMyIssue)
router.get("/issue",rentalController.getAll)
router.get('/issue/:id',rentalController.getIssueDetails)
router.get('/return/:id',rentalController.returnCar)


module.exports=router




