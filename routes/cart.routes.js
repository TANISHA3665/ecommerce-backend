const express = require('express');
const { getCartItems, addToCart, updateCartItem, removeCartItem } = require('../controllers/cart.controller');
const  authenticate  = require( '../middleware/auth.middleware');

const router = express.Router();

router.get('/:userId', authenticate, getCartItems);
router.post('/', authenticate, addToCart);
router.put('/:id', authenticate, updateCartItem);
router.delete('/:id', authenticate, removeCartItem);

module.exports = router;
