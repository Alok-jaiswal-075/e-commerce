const mongoose = require('mongoose')
const Product = require('./product')
const User = require('./user')

const orderSchema = mongoose.Schema({
    "buyerId": {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    "sellerId": {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    "products": [
        {
            type: Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    "status": "string"
})

module.exports = mongoose.model('Order',orderSchema)