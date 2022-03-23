const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');
const { Guest } = require('../middlewares/md');

router.get('/', Guest, indexController.indexRoute);

router.get('/register', Guest, indexController.GetRegister);

router.post('/register', Guest, indexController.PostRegister)

router.get('/login', Guest, indexController.GetLogin);

router.post('/login', Guest, passport.authenticate('local', {
    successRedirect:"/home",
    failureRedirect:"/login"
}));

router.post('/logout', indexController.PostLogout);

module.exports = router;