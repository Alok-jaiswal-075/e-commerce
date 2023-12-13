const mongoose = require('mongoose')
const Product = require('./product')
const User = require('./user')

const orderSchema = mongoose.Schema({
    "buyer": {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    "seller": {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    "products": [
        {
            "product" : {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
            },

            "quantity" : {
                type : Number,
                default : 1
            }
        }
    ]
})

module.exports = mongoose.model('Order',orderSchema)