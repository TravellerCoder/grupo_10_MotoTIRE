const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const paymentController = require('../controllers/paymentController')


router.get('/createOrder', paymentController.renderCreateOrder);




module.exports = router;