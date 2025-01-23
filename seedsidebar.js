import mongoose from "mongoose";
import dotenv from "dotenv";
import sidebarModel from "./models/sidebarModel.js";

dotenv.config(); // Load environment variables

// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
        process.exit(1); // Exit process with failure
    }
};


const seedSidebar = async () => {
    const sidebarItems = [
        { key: 'categories', label: 'Categories', description: 'Explore food categories', icon: 'utensils', iconColor: '#FF5733', link: '/categories' },
        { key: 'fastFoods', label: 'Fast Foods', description: 'Find quick meals and snacks', icon: 'hamburger', iconColor: '#FFC300', link: '/fastfoods' },
        { key: 'drinks', label: 'Drinks', description: 'Refresh with beverages', icon: 'glass-martini-alt', iconColor: '#3498DB', link: '/drinks' },
        { key: 'specials', label: 'Specials', description: 'Limited time special items', icon: 'angle-double-down', iconColor: '#E74C3C', link: '/specials' },
        { key: 'offers', label: 'Special Offers', description: 'Avail special discounts', icon: 'gift', iconColor: '#FF69B4', link: '/offers' },
    ];

    try {
        await connectDB(); // Connect to the database
        await sidebarModel.deleteMany(); // Clear existing sidebar items
        await sidebarModel.insertMany(sidebarItems); // Insert new items
        console.log("Sidebar items seeded successfully!");
        process.exit(); // Exit process
    } catch (error) {
        console.error("Error seeding sidebar items:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// Run the seed function
seedSidebar();
