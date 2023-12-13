const mongoose = require('mongoose')
const Product = require('./product')
const User = require('./user')

const catalogSchema = mongoose.Schema({
    "seller": {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    "products": [
        {
            type: Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})

module.exports = mongoose.model('Catalog',catalogSchema)