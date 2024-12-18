const fire=require("../models/fireModel");



//data display part
const getAllFire=async(req,res,next)=>{

    let firearm;

    //get all firearm

    try{

        firearm=await fire.find();

    }catch(err){

        console.log(err);
    }

    //not found 

    if(!firearm){

        return res.status(404).json({message:"firearm not found"});
    }


    //display all firearm

    return res.status(200).json({firearm});
};

//data insert part
const addfire=async(req,res,next)=>{

    const{name,model,Date,manufacture,condition,note}=req.body;

    let firearm

    try{

        firearm=new fire({name,model,Date,manufacture,condition,note});
        await firearm.save();

    }catch(err){

        console.log(err);
    }


    if(!firearm){

        return res.status(404).send({message:"unable to add firearm"});
    }

    return res.status(200).json({firearm});

}


//get data by id -retrive part 

const getById=async(req,res,next)=>{

    const id=req.params.id;

    let firearm;

    try{
        firearm=await fire.findById(id);
    }
    catch(err){

         console.log(err);
    }

    if(!firearm){

        return res.status(404).send({message:"unavailable firearm"});
    }

    return res.status(200).json({firearm});

}

//update part

const updateFire=async(req,res,next)=>{

    const id=req.params.id;
    const{name,model,Date,manufacture,condition,note}=req.body;

    let firearm;

    try{

        firearm=await fire.findByIdAndUpdate(id,{name:name,model:model,Date:Date,manufacture:manufacture,condition:condition,note:note})
        firearm=await firearm.save();

    }
    catch(err){
        console.log(err)
    }


    if(!firearm){

        return res.status(404).send({message:"unavailable update firearm"});
    }

    return res.status(200).json({firearm});

}


//detetion part

const deleteFire=async(req,res,next)=>{

    const id=req.params.id;

    let firearm;

    try{

        firearm=await fire.findByIdAndDelete(id)


    }
    catch(err){

        console.log(err);
    }


    if(!firearm){

        return res.status(404).send({message:"unable to delete firearm"});
    }

    return res.status(200).json({firearm});

}

exports.getAllFire=getAllFire;
exports.addfire=addfire;
exports.getById=getById;
exports.updateFire=updateFire;
exports.deleteFire=deleteFire;