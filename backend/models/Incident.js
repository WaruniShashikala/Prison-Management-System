const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  reportedBy: {
    type: String,
    required: true,
  },
  reportNumber: {
    type: String,
    required: true,
  },
  incidentType: {
    type: String,
    required: true,
  },
  dateOfIncident: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inmateNumber: {
    type: String,
    required: true,
  },
  inmateName: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Incident', incidentSchema);
