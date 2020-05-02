const router = require('express').Router();
const carController= require("../controllers/carController")
const userController= require("../controllers/userController")
const rentalController= require("../controllers/rentalController")



const getCar= require("../middleware/getCar")
const requireAdmin=require("../middleware/requireAdmin")
//importing models

router.post("/createUser",userController.createUser)
router.get("/users",userController.getUsers)
router.get("/allcars",carController.getAll)
router.post("/createCar",carController.createCar)
router.put("/update/:id",[requireAdmin,getCar],carController.updateCar)
router.delete("/delete/:id",[requireAdmin,getCar],carController.deleteCar)

router.post("/issue",rentalController.issueCar)
router.post("/me",rentalController.getMyIssue)
router.get("/issue",rentalController.getAll)
router.get('/issue/:id',rentalController.getIssueDetails)
router.post('/return',rentalController.returnCar)
router.post("/login",userController.login)

module.exports=router




