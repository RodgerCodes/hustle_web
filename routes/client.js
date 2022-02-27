const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();
const { Guest, Auth } = require('../middlewares/md');

router.get('/', Auth, clientController.GetGigs)

module.exports = router;