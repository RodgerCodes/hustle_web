const mongoose = require('mongoose');
const joi = require('joi');

const SkillSchema = new mongoose.Schema({
    skills:{
      type:joi.array(),
      default:[],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});

module.exports = mongoose.model('skills', SkillSchema);