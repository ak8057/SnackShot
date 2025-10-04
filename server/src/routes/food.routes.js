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


router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);



router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood
);

router.get(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.getSaveFood
);

module.exports = router;
