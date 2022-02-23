const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const passport = require('passport')

router.get('/', indexController.indexRoute);

router.get('/register', indexController.GetRegister);

router.post('/register', indexController.PostRegister)

router.get('/login', indexController.GetLogin);

router.post('/login', passport.authenticate('local', {
    successRedirect:"/home",
    failureRedirect:"/login"
}));

module.exports = router;