const express =require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');

router.get('/', freelancerController.GetHome);

router.get('/gig/:id', freelancerController.GetGig);

module.exports = router;