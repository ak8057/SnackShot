
const express = require("express");

const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// POST /api/food/add - Add new food item (Protected)
router.post("/", authMiddleware.authFoodPartnerMiddleware, foodController.createFood);





module.exports = router;