const express = require("express")
const router = express.Router();
const brandsCtrl = require("../Controllers/Brands");

const authUser = require("../Middlewares/Auth/authUser");
const existAccount = require("../Middlewares/Exists/existAccount");
const authAdmin = require("../Middlewares/Auth/authAdmin");

router.post("/create", authAdmin, brandsCtrl.createOneBrand);

router.put("/update/:id", authAdmin, brandsCtrl.updateOneBrand);

router.get("/get", authUser, brandsCtrl.getAllBrand);
router.get("/get/:id", authUser, brandsCtrl.getOneBrand);

router.delete("/delete/:id", authAdmin, brandsCtrl.deleteOneBrand);

module.exports = router;