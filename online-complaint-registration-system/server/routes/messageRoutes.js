const express = require('express');
const { body } = require('express-validator');
const { addMessage, getMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:complaintId', protect, getMessages);
router.post('/:complaintId', protect, body('message').notEmpty().trim(), addMessage);

module.exports = router;
