const express=require("express")
const router=express.Router();

 const meds=require("../models/medicineModel");
const medController=require("../controllers/medicineController");



router.get("/",medController.getAllMedicine);
router.post("/",medController.addMedicine);
router.get("/:id",medController.getByMedicineId);
router.put("/:id",medController.updateMedicine);
router.delete("/:id",medController.deleteMedicine);


module.exports=router;