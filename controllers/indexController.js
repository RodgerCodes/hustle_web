const bcrypt = require('bcryptjs');
const User = require('../models/users');

module.exports = {
    indexRoute:(req, res) => {
        // render landing ul
    },

    GetRegister:(req, res) => {
       res.render('Index/register')
    },

    PostRegister: async(req, res) => {
    //    const { first_name, last_name, email, role, password, confirm_password } = req.body;
       const errors = [];

       if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.role || !req.body.password){
         errors.push({msg:"Please fill in all forms"})
       }

       if(req.body.password != req.body.confirm_password){
           errors.push({msg:"Make sure the passwords match"})
       }

       if(req.body.password.length < 6){
           errors.push({msg:"Password must have at least six characters"})
       }

       if(errors.length > 0){
           res.render('Index/register', {
               'first_name':req.body.first_name,
               'last_name':req.body.last_name,
               'email':req.body.email,
               'password':req.body.password,
               'confirm_password':req.body.confirm_password
           });
       } else {
           const salt = await bcrypt.genSalt(10);
           const hash = await bcrypt.hash(req.body.password, salt);

           const newUser = new User({
               'first_name':req.body.first_name,
               'last_name':req.body.last_name,
               'email':req.body.email,
               'role':req.body.role,
               'password':hash
           });

           await newUser.save();
           res.redirect('/login');
       }
    },
    
    
    GetLogin:(req, res) => {
        res.render('Index/login')
    },

    PostLogin:(req, res) => {
        // post logic
    },
}