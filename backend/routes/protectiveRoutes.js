const express=require("express")
const router=express.Router();

const Nonprotect=require("../models/protectiveModel");
const proctectiveController=require("../controllers/protectiveController");



router.get("/",proctectiveController.getAllProtective);
router.post("/",proctectiveController.addProtective);
router.get("/:id",proctectiveController.getById);
router.put("/:id",proctectiveController.updateProtective);
router.delete("/:id",proctectiveController.deleteProtective);

module.exports=router;