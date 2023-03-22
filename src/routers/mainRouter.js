const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.controller.index);





module.exports = router;