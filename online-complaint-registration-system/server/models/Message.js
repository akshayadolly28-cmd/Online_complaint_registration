const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  complaint: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true, index: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true, trim: true },
  senderRole: { type: String, enum: ['USER', 'AGENT', 'ADMIN'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
