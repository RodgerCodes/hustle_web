const mongoose = require('mongoose');

const User_schema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['client', 'freelancer'],
        default:'client'
    },
    password:{
        type:String,
        required:true
    },
    password_reset_token:{
        type:String,
        required:false,
        default:''
    },
    password_token_timer:{
        type:Date,
    },
    created_At:{
        type:Date,
        default:Date.now()
    }
});


module.exports = mongoose.model('users', User_schema);