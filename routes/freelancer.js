const express =require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');

router.get('/', freelancerController.GetHome);

module.exports = router;