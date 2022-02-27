const mongoose = require('mongoose');
const joi = require('joi');

const ProfileSchema = new mongoose.Schema({
    bio:{
        type:joi.string(),
        required:true
    }, 
    phone:{
        type:joi.string(),
        required:true
    },
    avatar:{
       type:String,
       default:"https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg"
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users'
    },
    updated_At:{
        type:Date,
        default:Date.now()
    },
    created_At:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('profile', ProfileSchema);