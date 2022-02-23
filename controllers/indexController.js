const bcrypt = require('bcryptjs');
const User = require('../models/users');

module.exports = {
    indexRoute:(req, res) => {
        // render landing ul
    },

    GetRegister:(req, res) => {
       res.render('Index/register')
    },

    PostRegister: async (req, res) => {
       const { first_name, last_name, email, role, password, confirm_password } = req.body;
       const errors = [];

       const user = await User.findOne({email});

    if(user){
        errors.push({msg:"User already exists"});
    } else {
       if(!first_name || !last_name || !email || !password || !confirm_password){
           errors.push({msg:"Please fill in all forms"});
       }

       if(password != confirm_password){
           errors.push({msg:"Passwords Must Match"})
       }

       if(password.length < 6){
           errors.push({msg:"Password must have at least six characters"})
       }

       if(errors.length > 0){
           res.render('Index/register', {
               first_name,
               last_name,
               email,
               errors
           })
       } else {
           const salt = await bcrypt.genSalt(10);
           const hash = await bcrypt.hash(password, salt);

           const newUser = new User({
               first_name:first_name,
               last_name:last_name,
               role:role,
               email:email,
               password:hash,
           });

           await newUser.save();

           res.status(201).redirect('/login')
       }
    }
    },
    
    
    GetLogin:(req, res) => {
        res.render('Index/login')
    },

    PostLogin:(req, res) => {
        // post logic
    },
}