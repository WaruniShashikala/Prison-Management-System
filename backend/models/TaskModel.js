const mongoose=require("mongoose");

const Schema=mongoose.Schema;


const taskSchema=new Schema({

    description:{
        type:String,
        required:true,
    },

    status:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required:true,
    },
    assignedTo:{
        type:String,
        required:true,
    },
    Date:{
        type:Date,
       
    } 
});


module.exports=mongoose.model(

    "TaskModel",
    taskSchema

)