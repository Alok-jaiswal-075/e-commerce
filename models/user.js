const mongoose = require('mongoose')
const Catalog = require('./catalog')
const Order = require('./order')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['seller', 'buyer'],
        required: true
    },
    catalog : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Catalog'
    },
    orders : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ]
})

module.exports = mongoose.model('User', userSchema)