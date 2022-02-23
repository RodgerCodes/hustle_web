const User = require('../models/users');

module.exports = {
    GetHome: async(req, res) => {
       const user = await User.findById(req.user);

       if(user.role == 'client'){
           res.redirect('/client')
       }

    //    do the other things
    },

    GetGig:(req, res) => {

    },

    GetApplyGig:(req, res) => {

    },
    
    PostApplyGig:(req, res) => {

    },

    GetProfile:(req, res) => {

    }, 
    
}