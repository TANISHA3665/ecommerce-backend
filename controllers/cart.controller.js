const CartItem = require('../models/cartItem.model');

const getCartItems = async (req, res) => {
  const { userId } = req.params;
  const cartItems = await CartItem.findAll({ where: { userId } });
  res.json(cartItems);
};

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Check if the item is already in the cart
  const existingCartItem = await CartItem.findOne({ where: { userId, productId } });
  if (existingCartItem) {
    existingCartItem.quantity += quantity;
    await existingCartItem.save();
    return res.json(existingCartItem);
  }

  const newCartItem = await CartItem.create({ userId, productId, quantity });
  res.status(201).json(newCartItem);
};

const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const cartItem = await CartItem.findByPk(id);
  if (cartItem) {
    cartItem.quantity = quantity;
    await cartItem.save();
    res.json(cartItem);
  } else {
    res.status(404).json({ message: 'Cart item not found' });
  }
};

const removeCartItem = async (req, res) => {
  const { id } = req.params;
  const cartItem = await CartItem.findByPk(id);
  if (cartItem) {
    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } else {
    res.status(404).json({ message: 'Cart item not found' });
  }
};

module.exports = { getCartItems, addToCart, updateCartItem, removeCartItem };
