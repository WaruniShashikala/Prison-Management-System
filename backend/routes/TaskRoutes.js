const express = require("express");
const router = express.Router();

// Insert model
const Task = require("../models/TaskModel");

// Insert task controller
const TaskController = require("../controllers/TaskController");

router.get("/", TaskController.getAllTask);
router.post("/", TaskController.addTask);
router.get("/:id", TaskController.getByTaskId); 
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

// Export
module.exports = router;
