const express = require('express');
const router = express.Router();
const {createOrder,getAllOrdersByUser,getOrderDetails} = require('../../controller/shop/order-controller');


// Create a new order
router.post('/create', createOrder);

// Get all orders by user
router.get('/list/:userId', getAllOrdersByUser);

// Get order details
router.get('/details/:id', getOrderDetails);



module.exports = router;
