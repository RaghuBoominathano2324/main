// import foodModel from "../models/foodModel.js";
// import fs from "fs";

// // List all food items
// const listFood = async (req, res) => {
//     try {
//         const foods = await foodModel.find({});
//         res.json({ success: true, data: foods });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Failed to retrieve food items." });
//     }
// };

// // Add a new food item
// const addFood = async (req, res) => {
//     try {
//         console.log('Received data:', req.body); // Add logging
//         console.log('Received file:', req.file); // Add logging

//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "Image file is required." });
//         }

//         const foodData = {
//             food_name: req.body.food_name,
//             food_desc: req.body.food_desc,
//             food_price: Number(req.body.food_price),
//             food_menu: req.body.food_menu,
//             food_image: req.file.filename,
//             food_type: req.body.food_type,
//             food_category: req.body.food_category || req.body.food_menu,
//             hotels: Array.isArray(req.body.hotels) ? req.body.hotels : JSON.parse(req.body.hotels),
//             availability: req.body.availability,
//             food_review: Number(req.body.food_review)
//         };

//         const food = new foodModel(foodData);
//         const savedFood = await food.save();

//         res.json({
//             success: true,
//             message: "Food added successfully!",
//             data: savedFood
//         });
//     } catch (error) {
//         console.error('Error details:', error); // Add detailed error logging
//         res.status(500).json({
//             success: false,
//             message: "Failed to add food item.",
//             error: error.message
//         });
//     }
// };

// // Update a food item
// const updateFood = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updateData = { ...req.body };

//         if (req.file) {
//             const oldFood = await foodModel.findById(id);
//             if (oldFood && oldFood.food_image) {
//                 fs.unlink(`uploads/${oldFood.food_image}`, (err) => {
//                     if (err) console.error(`Failed to delete old image: ${err}`);
//                 });
//             }
//             updateData.food_image = req.file.filename;
//         }

//         if (updateData.hotels) {
//             updateData.hotels = JSON.parse(updateData.hotels);
//         }

//         if (updateData.food_price) {
//             updateData.food_price = Number(updateData.food_price);
//         }

//         if (updateData.food_review) {
//             updateData.food_review = Number(updateData.food_review);
//         }

//         const updatedFood = await foodModel.findByIdAndUpdate(
//             id,
//             updateData,
//             { new: true }
//         );

//         if (!updatedFood) {
//             return res.status(404).json({ success: false, message: "Food item not found." });
//         }

//         res.json({ 
//             success: true, 
//             message: "Food updated successfully!",
//             data: updatedFood 
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Failed to update food item." });
//     }
// };

// // Delete a food item
// const removeFood = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const food = await foodModel.findById(id);
//         if (!food) {
//             return res.status(404).json({ success: false, message: "Food item not found." });
//         }

//         if (food.food_image) {
//             fs.unlink(`uploads/${food.food_image}`, (err) => {
//                 if (err) console.error(`Failed to delete image: ${err}`);
//             });
//         }

//         await foodModel.findByIdAndDelete(id);
//         res.json({ 
//             success: true, 
//             message: "Food removed successfully!",
//             data: food 
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Failed to remove food item." });
//     }
// };

// // Get a single food item
// const getFood = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const food = await foodModel.findById(id);
        
//         if (!food) {
//             return res.status(404).json({ success: false, message: "Food item not found." });
//         }

//         res.json({ success: true, data: food });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Failed to retrieve food item." });
//     }
// };

// export default { listFood, addFood, updateFood, removeFood, getFood };
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true},
    image: { type: String, required: true },
    category:{ type:String, required:true}
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;














// import mongoose from "mongoose";

// const foodSchema = new mongoose.Schema({
//     food_id: { 
//         type: Number, 
//         required: true, 
//         unique: true 
//     },
//     food_name: { 
//         type: String, 
//         required: true 
//     },
//     food_image: { 
//         type: String, 
//         required: true 
//     },
//     food_price: { 
//         type: Number, 
//         required: true 
//     },
//     food_menu: { 
//         type: String, 
//         required: true 
//     },
//     food_type: { 
//         type: String, 
//         required: true,
//         enum: ['Veg', 'Non-Veg'] 
//     },
//     food_category: { 
//         type: String, 
//         required: true 
//     },
//     food_desc: { 
//         type: String, 
//         required: true 
//     },
//     hotels: { 
//         type: [String], 
//         default: [] 
//     },
//     availability: { 
//         type: String, 
//         default: 'yes',
//         enum: ['yes', 'no'] 
//     },
//     food_review: { 
//         type: Number, 
//         min: 0, 
//         max: 5, 
//         default: 0 
//     }
// }, {
//     timestamps: true
// });

// const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// export default foodModel;