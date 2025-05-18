const path = require('path');
const verifyToken = require(path.resolve('C:/Users/Jihed Takrouni/Desktop/phone-shop/shared-utils/verifyToken.js')); // Absolute path usage

const express = require('express');
const { addOrder, getUserOrders } = require('../controllers/order.controller');

const router = express.Router();

// Protect the route to add order and get user orders
router.post('/', verifyToken, addOrder); 
router.get('/my', verifyToken, getUserOrders); 

module.exports = router;
