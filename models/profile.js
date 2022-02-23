const mongoose = require('mongoose');
const joi = require('joi');

const ProfileSchema = new mongoose.Schema({
    bio:{
        type:joi.string(),
        required:true
    }, 
    phone:{
        type:joi.number(),
        required:true
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users'
    },
    updated_At:{
        type:Date,
    },
    created_At:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('profile', ProfileSchema);