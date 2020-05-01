const express= require('express')
const app=express()
const mongoose= require("mongoose")
const Fawn=require("fawn")

const {MONGO_URI} = require('./keys')
const PORT = 5000


const apiRoutes = require("./routes/api-routes")

mongoose.connect(MONGO_URI, { useNewUrlParser: true ,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))


app.use(express.json())
app.listen(PORT,()=>{
    console.log('Connected to Server ',PORT)
})

app.use('/api',apiRoutes)
Fawn.init(mongoose)