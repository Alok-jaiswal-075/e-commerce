const mongoose = require('mongoose')

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
    }
})

module.exports = mongoose.model('User', userSchema)