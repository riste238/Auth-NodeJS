const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: [String, require],
    username:[ String, require],
    lastname: [String, require]
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;
