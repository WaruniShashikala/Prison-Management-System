const Lethel=require("../models/lethelModel");



//data display part
const getAllLethel=async(req,res,next)=>{

    let lethel;

    //get all firearm

    try{

        lethel=await Lethel.find();

    }catch(err){

        console.log(err);
    }

    //not found 

    if(!lethel){

        return res.status(404).json({message:"lethel not found"});
    }


    //display all lethel

    return res.status(200).json({lethel});
};

//data insert part
const addlethel=async(req,res,next)=>{

    const{name,model,Date,manufacture,condition,note}=req.body;

    let lethel

    try{

        lethel=new Lethel({name,model,Date,manufacture,condition,note});
        await lethel.save();

    }catch(err){

        console.log(err);
    }


    if(!lethel){

        return res.status(404).send({message:"unable to add firearm"});
    }

    return res.status(200).json({lethel});

}


//get data by id -retrive part 

const getById=async(req,res,next)=>{

    const id=req.params.id;

    let lethel;

    try{
        lethel=await Lethel.findById(id);
    }
    catch(err){

         console.log(err);
    }

    if(!lethel){

        return res.status(404).send({message:"unavailable firearm"});
    }

    return res.status(200).json({lethel});

}

//update part

const updatelethel=async(req,res,next)=>{

    const id=req.params.id;
    const{name,model,Date,manufacture,condition,note}=req.body;

    let lethel;

    try{

        lethel=await Lethel.findByIdAndUpdate(id,{name:name,model:model,Date:Date,manufacture:manufacture,condition:condition,note:note})
        lethel=await lethel.save();

    }
    catch(err){
        console.log(err)
    }


    if(!lethel){

        return res.status(404).send({message:"unavailable update firearm"});
    }

    return res.status(200).json({lethel});

}


//detetion part

const deletelethele=async(req,res,next)=>{

    const id=req.params.id;

    let lethel;

    try{

        lethel=await Lethel.findByIdAndDelete(id)


    }
    catch(err){

        console.log(err);
    }


    if(!lethel){

        return res.status(404).send({message:"unable to delete firearm"});
    }

    return res.status(200).json({lethel});

}

exports.getAllLethel=getAllLethel;
exports.addlethel=addlethel;
exports.getById=getById;
exports.updatelethel=updatelethel;
exports.deletelethele=deletelethele;