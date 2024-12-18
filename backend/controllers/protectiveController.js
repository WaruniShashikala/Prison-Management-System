const Protect=require("../models/lethelModel");



//data display part
const getAllProtective=async(req,res,next)=>{

    let protective;

    //get all protective

    try{

        protective=await Protect.find();

    }catch(err){

        console.log(err);
    }

    //not found 

    if(!protective){

        return res.status(404).json({message:"lethel not found"});
    }


    //display all protective

    return res.status(200).json({protective});
};

//data insert part
const addProtective=async(req,res,next)=>{

    const{name,model,Date,manufacture,condition,quantity,size,note}=req.body;

    let protective

    try{

        protective=new Protect({name,model,Date,manufacture,condition,quantity,size,note});
        await protective.save();

    }catch(err){

        console.log(err);
    }


    if(!protective){

        return res.status(404).send({message:"unable to add protective"});
    }

    return res.status(200).json({protective});

}


//get data by id -retrive part 

const getById=async(req,res,next)=>{

    const id=req.params.id;

    let protective;

    try{
        protective=await Protect.findById(id);
    }
    catch(err){

         console.log(err);
    }

    if(!protective){

        return res.status(404).send({message:"unavailable firearm"});
    }

    return res.status(200).json({protective});

}

//update part

const updateProtective=async(req,res,next)=>{

    const id=req.params.id;
    const{name,model,Date,manufacture,condition,quantity,size,note}=req.body;

    let protective;

    try{

        protective=await Protect.findByIdAndUpdate(id,{name:name,model:model,Date:Date,manufacture:manufacture,condition:condition,quantity:quantity,size:size,note:note})
        protective=await protective.save();

    }
    catch(err){
        console.log(err)
    }


    if(!protective){

        return res.status(404).send({message:"unavailable update firearm"});
    }

    return res.status(200).json({protective});

}


//detetion part

const deleteProtective=async(req,res,next)=>{

    const id=req.params.id;

    let protective;

    try{

        protective=await Protect.findByIdAndDelete(id)


    }
    catch(err){

        console.log(err);
    }


    if(!protective){

        return res.status(404).send({message:"unable to delete protective"});
    }

    return res.status(200).json({protective});

}

exports.getAllProtective=getAllProtective;
exports.addProtective=addProtective;
exports.getById=getById;
exports.updateProtective=updateProtective;
exports.deleteProtective=deleteProtective;