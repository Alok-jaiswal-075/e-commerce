const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')


const catchAsync = require('../Utility/catchAsync')
const appError = require('../Utility/appError')
const bcrypt = require('bcryptjs')
const User = require('../models/user')


router.post('/register',catchAsync(async (req,res) => {
    const {username, password, role} = req.body

    if(!username || !password || !role) throw new appError(400,'All fields are required')

    const isUserExits = await User.findOne({username : {$eq : req.body.username}})

    if(isUserExits) throw new appError(409,'User already exits')

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        username,
        password:hashedPassword,
        role
    })

    await user.save();

    res.json({"msg":"Registration Successful"})
}))



router.post('/login', catchAsync(async (req,res) => {
    const {username,password} = req.body

    if(!username || !password) throw new appError(400, 'All fields are required')

    const user = await User.findOne({username : {$eq : username}})

    if(!user) throw new appError(401,'Invalid Credentials')

    if(bcrypt.compareSync(password,user.password)) {

        const token = jwt.sign({
            username: user.username,
            role: user.role,
          }, 
          process.env.JWT_SECRET);


        res.cookie('token',token,{
            expires : new Date(Date.now() + 25892000000), // 30 * 24 * 60 * 60 * 1000
            secure : true,
            httpOnly : true
        })


        res.json({msg:'Login successful'})
    }
    else throw new appError(401, 'Invalid Credentials')
}))



module.exports = router