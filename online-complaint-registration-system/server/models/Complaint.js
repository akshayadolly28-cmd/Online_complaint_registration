const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['Registered', 'Assigned', 'In Progress', 'Resolved', 'Closed'], default: 'Registered', index: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachments: [String],
  lastUpdate: { type: String, default: 'Complaint registered successfully.' }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
