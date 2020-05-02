const express= require('express')
const app=express()
const mongoose= require("mongoose")
const Fawn=require("fawn")

//import the  mongo database uri connection defined in keys file 
const {MONGO_URI} = require('./keys')
const PORT = 5000

//routes defined 
const apiRoutes = require("./routes/api-routes")

//database connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true ,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())
//start server on port 
app.listen(PORT,()=>{
    console.log('Connected to Server ',PORT)
})

//routes
app.use('/api',apiRoutes)
//initialize the mongoose tasks in fawn
Fawn.init(mongoose)