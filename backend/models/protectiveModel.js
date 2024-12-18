const mongoose=require("mongoose");

const Schema=mongoose.Schema;


const protectiveSchema=new Schema({
    

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

    quantity:{
        type:Number,
        required:true,
    },

    size:{
        type:Number,
        required:true,
    },

    note:{
        type:String,
        required:true,
    },


});

module.exports=mongoose.model(

    "protectiveModel",
    protectiveSchema

)