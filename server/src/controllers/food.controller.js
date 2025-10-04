const foodModel = require("../models/food.model");
const auth = require("../middleware/auth.middleware");
const storageService = require("../services/storage.service");
const { v4 : uuid} = require("uuid");
const { get } = require("mongoose");


 async function createFood(req, res) {

    // console.log(req.foodPartner);
    // console.log(req.body);
    // console.log(req.file);

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
        name: req.body.name,
        video: fileUploadResult.url,
        description: req.body.description,
        foodPartner: req.foodPartner._id
    });

    res.status(201).json({
        message: "Food item created successfully",
        food : foodItem
    });

    
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({})

    res.status(200).json({
      message: "Food items retrieved successfully",
      foodItems: foodItems
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving food items",
      error: error.message
    });
  }
}

module.exports = {  
    createFood,
    getFoodItems
};