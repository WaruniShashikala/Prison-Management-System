const mongoose=require("mongoose");

const Schema=mongoose.Schema;


const medicineSchema=new Schema({

    name:{
        type:String,
        required:true,
    },

    type:{
        type:String,
        required:true,
    },

    mg:{
        type:String,
        required:true,
    },

    quantity:{
        type:Number,
        required:true,
    },

    expire:{
        type:Date,
        required:true,
    },

    supplier:{
        type:String,
        required:true,
    },

    note:{
        type:String,
        required:true,
    },



});

module.exports=mongoose.model(

    "medicineModel",
    medicineSchema

)