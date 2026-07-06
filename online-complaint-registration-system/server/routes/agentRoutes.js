const express = require('express');
const Complaint = require('../models/Complaint');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/assigned', protect, authorize('AGENT'), async (req, res) => {
  try {
    const complaints = await Complaint.find({ assignedAgent: req.user.id })
      .populate('createdBy', 'name email')
      .sort({ updatedAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/status/:complaintId', protect, authorize('AGENT'), async (req, res) => {
  try {
    const complaint = await Complaint.findOneAndUpdate(
      { _id: req.params.complaintId, assignedAgent: req.user.id },
      { status: req.body.status, lastUpdate: req.body.lastUpdate || `Status updated to ${req.body.status}` },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ message: 'Assigned complaint not found' });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
