import mongoose from "mongoose";

const sidebarSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true }, // Unique key for each sidebar item
    label: { type: String, required: true }, // Display name for the sidebar item
    description: { type: String }, // Additional info about the item
    icon: { type: String }, // FontAwesome icon name (if needed)
    iconColor: { type: String }, // Icon color
    link: { type: String, required: true }, // Path for navigation
}, { timestamps: true });

const sidebarModel = mongoose.models.sidebar || mongoose.model("sidebar", sidebarSchema);

export default sidebarModel;
