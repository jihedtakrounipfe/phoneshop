const Order = require('../models/Order');

// Add a new order
exports.addOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const newOrder = new Order({
      userId: req.user.id, // Retrieved via verifyToken middleware
      items,
      totalPrice
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

// Get orders of the logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
