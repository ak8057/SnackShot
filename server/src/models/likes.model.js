const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  food: {
    type: Schema.Types.ObjectId,
    ref: "Food",
    required: true,  
  },

 }, 
 { timestamps: true }
);


const Like = mongoose.model("like", likeSchema);

module.exports = Like;
