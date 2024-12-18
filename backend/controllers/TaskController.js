const Task = require('../models/TaskModel');
const mongoose = require('mongoose');

// Data display
const getAllTask = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ tasks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};



//data insert part
const addTask = async (req, res, next) => {
    const { description, status, priority, assignedTo, dueDate, } = req.body;
    try {
        const newTask = new Task({ description, status, priority, assignedTo, dueDate, });
        const savedTask = await newTask.save();
        res.status(201).json({ message: 'Task added successfully', task: savedTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add task' });
    }
};
//get data by id -retrive part 

const getByTaskId=async(req,res,next)=>{

    const id=req.params.id;

    let task;

    try{
        task=await Task.findById(id);
    }
    catch(err){

         console.log(err);
    }

    if(!task){

        return res.status(404).send({message:"unavailable task"});
    }

    return res.status(200).json({task});

}


//update part

const updateTask = async (req, res, next) => {
    const id = req.params.id;
    const { description, status, priority, assignedTo, dueDate } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { description, status, priority, assignedTo, dueDate }, { new: true });

        if (!updatedTask) {
            return res.status(404).send({ message: "unavailable update task" });
        }

        return res.status(200).json({ task: updatedTask });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update task' });
    }
}


const deleteTask=async(req,res,next)=>{

    const id=req.params.id;

    let task;

    try{

        task=await Task.findByIdAndDelete(id)


    }
    catch(err){

        console.log(err);
    }


    if(!task){

        return res.status(404).send({message:"unable to delete task"});
    }

    return res.status(200).json({task});

}


exports.getAllTask=getAllTask;
exports.addTask=addTask;
exports.getByTaskId=getByTaskId
exports.deleteTask=deleteTask
exports.updateTask=updateTask;