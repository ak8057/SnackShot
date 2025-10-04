const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4 : uuid} = require("uuid");
const likeModel = require("../models/likes.model");
const saveModels = require("../models/save.model");

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


async function likeFood(req, res) {
  // Implementation for liking a food item

  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({ user: user._id, food: foodId }); 

  if (isAlreadyLiked) {
    await likeModel.deleteOne({ user: user._id, food: foodId });

    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

    return res.status(200).json({
      message: "Food item unliked successfully",
    });
  }


  const newLike = await likeModel.create({
    user: user._id,
    food: foodId
  });

  await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

  res.status(201).json({
    message: "Food item liked successfully",
    like: newLike
  });
}



async function saveFood(req, res) {
  // Implementation for saving a food item
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModels.findOne({
    user: user._id,
    food: foodId
  })

  if (isAlreadySaved) {
    await saveModels.deleteOne({ user: user._id, food: foodId });

    return res.status(200).json({
      message: "Food item unsaved successfully",
    });
  }

    const save = await saveModels.create({
      user: user._id,
      food: foodId
  });

  res.status(201).json({
    message: "Food item saved successfully",
    save: save
  });
}

async function getSaveFood(req, res) {
  const user = req.user;

  const savedFoods = await saveModels.find({ user: user._id }).populate("food");

  if (!savedFoods || savedFoods.length === 0) {
    return res.status(404).json({ message: "No saved foods found" });
  }

  res.status(200).json({
    message: "Saved foods retrieved successfully",
    savedFoods,
  });
}


module.exports = {  
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood
};