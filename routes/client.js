const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();
const { Guest, Auth } = require('../middlewares/md');

router.get('/', Auth, clientController.GetGigs);

router.get('/new', Auth, clientController.GetAddGig);

router.post('/new', Auth, clientController.PostAddGig)

router.delete('/del/:id', Auth, clientController.DelGig);

router.get('/details', Auth, clientController.GetDetails)

router.put('/edit/:id', Auth, clientController.PutState);

module.exports = router;