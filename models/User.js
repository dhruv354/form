const mongoose = require('../config/mongoose')

const {Schema} = mongoose;

const UserSchema = new Schema({
    email:
        {
            type: String,
            required: true,
            unique: true
        },
    password:
        {
            type: String,
            required: true
        },
    phone:
        {
            type: Number,
            required: true
        }   
})

const User = mongoose.model('User', UserSchema)

module.exports = User