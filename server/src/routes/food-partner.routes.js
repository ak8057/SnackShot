const express = require("express");
const foodPartnerController = require("../controllers/food-Partner.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();


// /api/food-partner:id - Get food items by food partner ID
router.get("/:id", authMiddleware.authUserMiddleware,  foodPartnerController.getFoodPartnerById);


module.exports = router;