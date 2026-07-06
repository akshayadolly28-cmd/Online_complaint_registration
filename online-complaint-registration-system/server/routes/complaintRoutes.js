const express = require('express');
const { createComplaint, getComplaints, updateComplaint } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createComplaint);
router.get('/', protect, getComplaints);
router.put('/:id', protect, updateComplaint);

module.exports = router;
