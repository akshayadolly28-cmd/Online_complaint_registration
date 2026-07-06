const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create({ ...req.body, user: req.user.id });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate('user', 'name email').populate('complaint', 'title status');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
