const express =require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');
const { Auth } = require('../middlewares/md');

router.get('/', Auth, freelancerController.GetHome);

router.get('/gig/:id', Auth, freelancerController.GetGig);

router.post('/gig/:id', Auth, freelancerController.PostApplyGig);

router.get('/client/:id', Auth, freelancerController.GetGigByClient);

module.exports = router;