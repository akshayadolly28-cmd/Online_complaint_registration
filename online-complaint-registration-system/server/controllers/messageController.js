const Message = require('../models/Message');
const Complaint = require('../models/Complaint');

exports.addMessage = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.complaintId);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    const newMessage = await Message.create({
      complaint: req.params.complaintId,
      sender: req.user.id,
      senderRole: req.user.role,
      message: req.body.message
    });

    complaint.lastUpdate = req.body.message;
    await complaint.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ complaint: req.params.complaintId })
      .populate('sender', 'name email role')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
