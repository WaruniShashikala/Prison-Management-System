const Medicine=require("../models/medicineModel");



//data display part
const getAllMedicine=async(req,res,next)=>{

    let medicine;

    //get all transport

    try{

        medicine=await Medicine.find();

    }catch(err){

        console.log(err);
    }

    //not found 

    if(!medicine){

        return res.status(404).json({message:"medicine not found"});
    }


    //display all transport

    return res.status(200).json({medicine});
};

//data insert part
const addMedicine=async(req,res,next)=>{

    const{name,type,mg,quantity,expire,supplier,note}=req.body;

    let medicine

    try{

        medicine=new Medicine({name,type,mg,quantity,expire,supplier,note});
        await medicine.save();

    }catch(err){

        console.log(err);
    }


    if(!medicine){

        return res.status(404).send({message:"unable to add medicine"});
    }

    return res.status(200).json({medicine});

}


//get data by id -retrive part 

const getByMedicineId=async(req,res,next)=>{

    const id=req.params.id;

    let medicine;

    try{
        medicine=await Medicine.findById(id);
    }
    catch(err){

         console.log(err);
    }

    if(!medicine){

        return res.status(404).send({message:"unavailable medicine"});
    }

    return res.status(200).json({medicine});

}


//update part

const updateMedicine=async(req,res,next)=>{

    const id=req.params.id;
    const{name,type,mg,quantity,expire,supplier,note}=req.body;

    let medicine;

    try{

        medicine=await Medicine.findByIdAndUpdate(id,{name:name,type:type,mg:mg,quantity:quantity,expire:expire,supplier:supplier,note:note})
        medicine=await medicine.save();

    }
    catch(err){
        console.log(err)
    }


    if(!medicine){

        return res.status(404).send({message:"unavailable update medicine"});
    }

    return res.status(200).json({medicine});

}

const deleteMedicine=async(req,res,next)=>{

    const id=req.params.id;

    let medicine;

    try{

        medicine=await Medicine.findByIdAndDelete(id)


    }
    catch(err){

        console.log(err);
    }


    if(!medicine){

        return res.status(404).send({message:"unable to delete medicine"});
    }

    return res.status(200).json({medicine});

}

exports.getAllMedicine=getAllMedicine;
exports.addMedicine=addMedicine;
exports.getByMedicineId=getByMedicineId;
exports.updateMedicine=updateMedicine;
exports.deleteMedicine=deleteMedicine;
 