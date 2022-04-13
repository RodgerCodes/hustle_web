const express =require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');
const { Auth } = require('../middlewares/md');

router.get('/', Auth, freelancerController.GetHome);

router.get('/gig/:id', Auth, freelancerController.GetGig);

router.post('/gig/:id', Auth, freelancerController.PostApplyGig);

router.get('/client/:id', Auth, freelancerController.GetGigByClient);

router.get('/filter/:tech', Auth, freelancerController.GetGigByStack);

router.get('/details', Auth, freelancerController.GetProfile);

router.get('/freelancer/details/edit/:id', freelancerController.GetEditAcc);

router.put('/freelancer/details/edit/:id', freelancerController.PutEditProf);

// router.post('/freelancer/details/skills/:id', freelancerController.PostAddSkills);

module.exports = router;