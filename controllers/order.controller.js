const Order = require('../models/order.model');

const getAllOrders = async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

const createOrder = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const newOrder = await Order.create({ userId, productId, quantity });
  res.status(201).json(newOrder);
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { quantity, isPaymentMade } = req.body;

  const order = await Order.findByPk(id);
  if (order) {
    await order.update({ quantity, isPaymentMade });
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);
  if (order) {
    await order.destroy();
    res.json({ message: 'Order deleted' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

const updatePaymentStatus = async (req, res) => {
  const { orderId } = req.params;  // Order ID from the URL
  const { isPaymentMade } = req.body;  // True or False for payment status

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the payment status
    order.isPaymentMade = isPaymentMade;
    await order.save();

    return res.json({ message: 'Payment status updated successfully', order });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating payment status', error });
  }
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, updatePaymentStatus };
