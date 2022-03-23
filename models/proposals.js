const mongoose = require('mongoose');
const joi = require('joi');

const PropSchema = new mongoose.Schema({
    freelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    letter:{
        type:joi.string(),
        required:true,
    },
    gig:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'gig'
    },
    proposed_duration:{
        type:joi.string(),
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});

module.exports = mongoose.model('proposal', PropSchema);