const Transport=require("../models/transportion");



//data display part
const getAllTransport=async(req,res,next)=>{

    let transport;

    //get all transport

    try{

        transport=await Transport.find();

    }catch(err){

        console.log(err);
    }

    //not found 

    if(!transport){

        return res.status(404).json({message:"transportation not found"});
    }


    //display all transport

    return res.status(200).json({transport});
};

//data insert part
const addTransport=async(req,res,next)=>{

    const{no,type,Date,condition,milage,seat,note}=req.body;

    let transport

    try{

        transport=new Transport({no,type,Date,condition,milage,seat,note});
        await transport.save();

    }catch(err){

        console.log(err);
    }


    if(!transport){

        return res.status(404).send({message:"unable to add transport"});
    }

    return res.status(200).json({transport});

}


//get data by id -retrive part 

const getByTransportId=async(req,res,next)=>{

    const id=req.params.id;

    let transport;

    try{
        transport=await Transport.findById(id);
    }
    catch(err){

         console.log(err);
    }

    if(!transport){

        return res.status(404).send({message:"unavailable transport"});
    }

    return res.status(200).json({transport});

}


//update part

const updateTransport=async(req,res,next)=>{

    const id=req.params.id;
    const{no,type,Date,condition,milage,seat,note}=req.body;

    let transport;

    try{

        transport=await Transport.findByIdAndUpdate(id,{no:no,type:type,Date:Date,condition:condition,milage:milage,seat:seat,note:note})
        transport=await transport.save();

    }
    catch(err){
        console.log(err)
    }


    if(!transport){

        return res.status(404).send({message:"unavailable update transport"});
    }

    return res.status(200).json({transport});

}

const deleteTransport=async(req,res,next)=>{

    const id=req.params.id;

    let transport;

    try{

        transport=await Transport.findByIdAndDelete(id)


    }
    catch(err){

        console.log(err);
    }


    if(!transport){

        return res.status(404).send({message:"unable to delete transport"});
    }

    return res.status(200).json({transport});

}

exports.getAllTransport=getAllTransport;
exports.addTransport=addTransport;
exports.getByTransportId=getByTransportId;
exports.updateTransport=updateTransport;
exports.deleteTransport=deleteTransport;
 