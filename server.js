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

connectDB()

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(urlencoded({extended: false}))
app.use(cookieParser())



app.use('/api/auth', authRoutes)
app.use('/api/buyer', buyerRoutes)
app.use('/api/seller', sellerRoutes)


app.use((err,req,res,next)=>{
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).json({"msg":err.message})
})


app.listen(port, ()=> {
    console.log(`App running on port : ${port}`)
})