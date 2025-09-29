const foodModel = require("../models/food.model");
const auth = require("../middleware/auth.middleware");

async function createFood(req, res) {

    console.log(req.foodPartner);
    res.send("Create Food Endpoint Reached");
}

module.exports = {  
    createFood
};