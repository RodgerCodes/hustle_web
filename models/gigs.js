const mongoose = require('mongoose');
const joi = require('joi');

const gigsSchema = new mongoose.Schema({
    title:{
        type:joi.string(),
        required:true
    },
    description:{
        type:joi.string(),
        required:true
    },
    budget:{
        type:joi.number(),
        required:true
    },
    technologies:{
        type:joi.array(),
        required:true
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    duration:{
        type:joi.string(),
        required:true
    },
    state:{
      type:joi.bool(),
      enum:[true, false],
      default:false
    },
    xp:{
        type:joi.string(),
        enum:['minimal', 'intermediate','high'],
        default:'intermediate'
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});

module.exports = mongoose.model('gig',gigsSchema);