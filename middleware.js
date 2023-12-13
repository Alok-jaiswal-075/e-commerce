const jwt = require('jsonwebtoken')
const appError = require('./Utility/appError')
const catchAsync = require('./Utility/catchAsync')

const isLoggedIn = catchAsync (async (req,res,next)=>{
    const token = req.cookies.token

    if(!token) throw new appError(401,'User not logged in')

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = decoded
    next();
})

const isBuyer = catchAsync (async (req,res,next)=>{
    if(req.user.role === 'buyer') next()
    else throw new appError(401,'Access denied ! You are not a buyer')
})

const isSeller = catchAsync (async (req,res,next)=>{
    if(req.user.role === 'seller') next()
    else throw new appError(401,'Access denied ! You are not a seller')
})


module.exports = {
    isLoggedIn,
    isBuyer,
    isSeller
}