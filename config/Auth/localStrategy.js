const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/users');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
  passport.use(new LocalStrategy({usernameField:'email'}, async(email, password, done) => {
     const user = await User.findOne({email:email});

     if(!user){
         return done(null, false, {message:"User does not exists"})
     } 

     bcrypt.compare(password, user.password, (err, isMatch) => {
         if(err) throw err
         if(isMatch){
             return done(null, user)
         }

         return done(null, false, {message:"Password incorrect"})
     })
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
}