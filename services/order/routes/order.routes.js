const path = require('path');
const verifyToken = require('../shared-utils/verifyToken');

const express = require('express');
const { addOrder, getUserOrders } = require('../controllers/order.controller');

const router = express.Router();

// Protect the route to add order and get user orders
router.post('/', verifyToken, addOrder); 
router.get('/my', verifyToken, getUserOrders); 

module.exports = router;
