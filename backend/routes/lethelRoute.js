const express=require("express")
const router=express.Router();

const NonLethel=require("../models/lethelModel");
const lethelController=require("../controllers/lethelController");



router.get("/",lethelController.getAllLethel);
router.post("/",lethelController.addlethel);
router.get("/:id",lethelController.getById);
router.put("/:id",lethelController.updatelethel);
router.delete("/:id",lethelController.deletelethele);

module.exports=router;