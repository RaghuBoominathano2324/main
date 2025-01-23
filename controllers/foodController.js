// import foodModel from "../models/foodModel.js";
// import fs from "fs";
// import path from "path";

// export const addFood = async (req, res) => {
//     try {
//         // Validate image file
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Image file is required.",
//             });
//         }

//         // Parse and validate input data
//         const { 
//             food_name, 
//             food_desc, 
//             food_price, 
//             food_menu, 
//             food_type, 
//             food_category, 
//             hotels, 
//             availability, 
//             food_review 
//         } = req.body;

//         if (!food_name || !food_desc || !food_price || !food_menu || !food_type) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields.",
//             });
//         }

//         const parsedHotels = JSON.parse(hotels || "[]");
//         if (!Array.isArray(parsedHotels) || parsedHotels.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Hotels must be a non-empty array.",
//             });
//         }

//         // Construct food data
//         const foodData = {
//             food_name,
//             food_desc,
//             food_price: Number(food_price),
//             food_menu,
//             food_image: req.file.filename,
//             food_type,
//             food_category: food_category || food_menu,
//             hotels: parsedHotels,
//             availability,
//             food_review: Number(food_review) || 5.0, // Default to 5.0 if not provided
//         };

//         // Save food item to database
//         const food = new foodModel(foodData);
//         const savedFood = await food.save();

//         res.status(201).json({
//             success: true,
//             message: "Food added successfully!",
//             data: savedFood,
//         });
//     } catch (error) {
//         console.error("Error adding food:", error);
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to add food item.",
//             error: error.message,
//         });
//     }
// };

// export const listFood = async (req, res) => {
//     try {
//         const foods = await foodModel.find({});
//         res.status(200).json({ 
//             success: true, 
//             data: foods 
//         });
//     } catch (error) {
//         console.error("Error fetching food items:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve food items.",
//             error: error.message,
//         });
//     }
// };

// export const removeFood = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate food item existence
//         const food = await foodModel.findById(id);
//         if (!food) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Food item not found.",
//             });
//         }

//         // Remove associated image file if it exists
//         const imagePath = path.join("uploads", food.food_image);
//         if (fs.existsSync(imagePath)) {
//             fs.unlink(imagePath, (err) => {
//                 if (err) {
//                     console.error(`Error deleting image file: ${err}`);
//                 }
//             });
//         }

//         // Delete food item from database
//         await foodModel.findByIdAndDelete(id);

//         res.status(200).json({
//             success: true,
//             message: "Food removed successfully!",
//         });
//     } catch (error) {
//         console.error("Error removing food item:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to remove food item.",
//             error: error.message,
//         });
//     }
// };

import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addFood = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            image: image_filename,
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export { listFood, addFood, removeFood }




// import Food from "../models/foodModel.js";
// import fs from 'fs';

// // List all foods
// const listFood = async (req, res) => {
//     try {
//         const foods = await Food.find({});
//         res.status(200).json({ 
//             success: true, 
//             data: foods 
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ 
//             success: false, 
//             message: "Failed to fetch foods" 
//         });
//     }
// }

// // Add new food
// const addFood = async (req, res) => {
//     try {
//         const image_filename = req.file.filename;
        
//         const food = new Food({
//             food_id: req.body.food_id,
//             food_name: req.body.food_name,
//             food_image: image_filename,
//             food_price: req.body.food_price,
//             food_menu: req.body.food_menu,
//             food_type: req.body.food_type,
//             food_category: req.body.food_category,
//             food_desc: req.body.food_desc,
//             hotels: req.body.hotels,
//             availability: req.body.availability || 'yes',
//             food_review: req.body.food_review || 0
//         });

//         await food.save();
//         res.status(201).json({ 
//             success: true, 
//             message: "Food added successfully",
//             data: food 
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ 
//             success: false, 
//             message: "Failed to add food" 
//         });
//     }
// }

// // Remove food
// const removeFood = async (req, res) => {
//     try {
//         const food = await Food.findById(req.body.id);
        
//         if (!food) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Food not found" 
//             });
//         }

//         // Delete image file
//         fs.unlink(`uploads/${food.food_image}`, (err) => {
//             if (err) console.log('Error deleting image:', err);
//         });

//         await Food.findByIdAndDelete(req.body.id);
//         res.status(200).json({ 
//             success: true, 
//             message: "Food removed successfully" 
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ 
//             success: false, 
//             message: "Failed to remove food" 
//         });
//     }
// }

// // Additional useful controllers
// const updateFood = async (req, res) => {
//     try {
//         const food = await Food.findById(req.body.id);
        
//         if (!food) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Food not found" 
//             });
//         }

//         // Handle image update if new image is uploaded
//         if (req.file) {
//             fs.unlink(`uploads/${food.food_image}`, (err) => {
//                 if (err) console.log('Error deleting old image:', err);
//             });
//             req.body.food_image = req.file.filename;
//         }

//         const updatedFood = await Food.findByIdAndUpdate(
//             req.body.id,
//             req.body,
//             { new: true }
//         );

//         res.status(200).json({ 
//             success: true, 
//             message: "Food updated successfully",
//             data: updatedFood 
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ 
//             success: false, 
//             message: "Failed to update food" 
//         });
//     }
// }

// const getFoodById = async (req, res) => {
//     try {
//         const food = await Food.findById(req.params.id);
        
//         if (!food) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Food not found" 
//             });
//         }

//         res.status(200).json({ 
//             success: true, 
//             data: food 
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ 
//             success: false, 
//             message: "Failed to fetch food" 
//         });
//     }
// }

// export { 
//     listFood, 
//     addFood, 
//     removeFood, 
//     updateFood, 
//     getFoodById 
// };