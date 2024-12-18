const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

// GET all incidents
router.get('/', incidentController.getAllIncidents);

// GET a specific incident by ID
router.get('/:id', incidentController.getIncidentById);

// CREATE a new incident
router.post('/add', incidentController.createIncident);

// UPDATE an incident by ID
router.put('/update/:id', incidentController.updateIncidentById);

// DELETE an incident by ID
router.delete('/delete/:id', incidentController.deleteIncidentById);

module.exports = router;
