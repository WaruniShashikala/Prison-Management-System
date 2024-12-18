const Incident = require('../models/Incident');

const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createIncident = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    const newIncident = await incident.save();
    res.status(201).json({ message: 'Incident added successfully', newIncident });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    // Update incident details
    Object.assign(incident, req.body);

    const updatedIncident = await incident.save();
    res.json({ message: 'Incident updated', updatedIncident });
  } catch (err) {
    res.status(400).json({ message: 'Incident update unsuccessful', error: err.message });
  }
};

const deleteIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    await incident.deleteOne();
    res.json({ message: 'Incident deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllIncidents,
  getIncidentById,
  createIncident,
  updateIncidentById,
  deleteIncidentById
};
