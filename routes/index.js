const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.indexRoute);

router.get('/register', indexController.GetRegister);

router.post('/register/new', indexController.PostRegister)

router.get('/login', indexController.GetLogin);




module.exports = router;