const express = require("express");

const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

// POST /api/food/add - Add new food item (Protected)
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("Video"),
  foodController.createFood
);

// GET /api/food/ - [Protected] Test route
router.get(
  "/", 
  authMiddleware.authUserMiddleware, 
  foodController.getFoodItems);



module.exports = router;
