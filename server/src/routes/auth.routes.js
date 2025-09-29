const express = require("express");
const authController = require ("../controllers/auth.controller");
const router = express.Router();

//use auth apis
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

//food partner apis
router.post("/foodpartner/register", authController.registerFoodPartner);
router.post("/foodpartner/login", authController.foodPartnerLogin);
router.get("/foodpartner/logout", authController.foodPartnerLogout);




module.exports = router;