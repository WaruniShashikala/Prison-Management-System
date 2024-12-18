const mongoose=require("mongoose");

const Schema=mongoose.Schema;


const transportSchema=new Schema({

    no:{
        type:String,
        required:true,
    },

    type:{
        type:String,
        required:true,
    },

    Date:{
        type:Date,
        required:true,
    },

    condition:{
        type:String,
        required:true,
    },

    milage:{
        type:String,
        required:true,
    },

    seat:{
        type:Number,
        required:true,
    },

    note:{
        type:String,
        required:true,
    },



});

module.exports=mongoose.model(

    "transportation",
    transportSchema

)