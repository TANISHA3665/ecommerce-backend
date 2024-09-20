const express = require('express');
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, updatePaymentStatus } = require( '../controllers/order.controller');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authenticate, getAllOrders);
router.get('/:id', authenticate, getOrderById);
router.post('/', authenticate, createOrder);
router.put('/:id', authenticate, updateOrder);
router.delete('/:id', authenticate, deleteOrder);
router.put('/payment/:orderId', authenticate, updatePaymentStatus);

module.exports = router;