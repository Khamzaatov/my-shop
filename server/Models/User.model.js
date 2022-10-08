const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name : String,
    email : {
        type : String,
        required : true,  
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    icon : String
})

const User = mongoose.model('User', userSchema)


module.exports = User 