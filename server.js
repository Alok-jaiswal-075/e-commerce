const cookieParser = require('cookie-parser')
const express = require('express')
const { urlencoded } = require('express')
const mongoose = require('mongoose')
require('dotenv').config({path : './config.env'})


const connectDB = require('./config/db')


const authRoutes = require('./api/auth')
const buyerRoutes = require('./api/buyer')
const sellerRoutes = require('./api/seller')

const port = process.env.PORT

// const dbUrl = process.env.DB_URL

// mongoose.set('useUnifiedTopology', true);

// mongoose.connect(dbUrl,{
//     // useCreateIndex:true,
//     // useNewUrlParse: true,
//     useUnifiedTopology: true
// }).then(d=>{
//     console.log("Mongodb connection successful!!")
// }).catch(err=>{
//     console.log("Mongodb connection error")
//     console.log(err)
// })

connectDB()

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(urlencoded({extended: false}))
app.use(cookieParser())



app.use('api/auth', authRoutes)
app.use('api/buyer', buyerRoutes)
app.use('api/seller', sellerRoutes)


app.use('/',(req,res)=>{
    res.send("Hello World")

})


app.listen(port, ()=> {
    console.log(`App running on port : ${port}`)
})