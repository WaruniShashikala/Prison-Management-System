const express=require("express")
const router=express.Router();

const Firearm=require("../models/fireModel");
const fireController=require("../controllers/fireControl");



router.get("/",fireController.getAllFire);
router.post("/",fireController.addfire);
router.get("/:id",fireController.getById);
router.put("/:id",fireController.updateFire);
router.delete("/:id",fireController.deleteFire);

module.exports=router;