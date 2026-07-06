const express = require('express');
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, authorize('ADMIN'), async (req, res) => {
  const totalComplaints = await Complaint.countDocuments();
  const totalUsers = await User.countDocuments();
  const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
  res.json({ totalComplaints, totalUsers, resolvedComplaints });
});

router.put('/assign-agent/:complaintId', protect, authorize('ADMIN'), async (req, res) => {
  const complaint = await Complaint.findByIdAndUpdate(
    req.params.complaintId,
    { assignedAgent: req.body.agentId, status: 'Assigned' },
    { new: true }
  );
  res.json(complaint);
});

module.exports = router;
