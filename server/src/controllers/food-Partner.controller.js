const foodPartnerModel = require('../models/foodpartner.model');

const foodModel = require("../models/food.model");

async function getFoodPartnerById(req, res) {

    const foodPartnerId = req.params.id;

    try {
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        const foodItemsByFoodPartner = await foodModel.find({foodPartner: foodPartnerId,});


        if (!foodPartner) {
            return res.status(404).json({ message: "Food Partner not found" });
        }
        res.status(200).json({ foodPartner: {
            ...foodPartner.toObject(),
            foodItems : foodItemsByFoodPartner
        } });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports = {
    getFoodPartnerById,
};
 