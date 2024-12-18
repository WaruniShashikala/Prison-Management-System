const mongoose=require("mongoose");

const Schema=mongoose.Schema;


const fireSchema=new Schema({

    name:{
        type:String,
        required:true,
    },

    model:{
        type:String,
        required:true,
    },

    Date:{
        type:String,
        required:true,
    },

    manufacture:{
        type:String,
        required:true,
    },

    condition:{
        type:String,
        required:true,
    },

    note:{
        type:String,
        required:true,
    },



});

module.exports=mongoose.model(

    "fireModel",
    fireSchema

)