const express=require("express")
const router=express.Router();

 const trans=require("../models/transportion");
const transController=require("../controllers/transportationControl");



router.get("/",transController.getAllTransport);
router.post("/",transController.addTransport);
router.get("/:id",transController.getByTransportId);
router.put("/:id",transController.updateTransport);
router.delete("/:id",transController.deleteTransport);


module.exports=router;