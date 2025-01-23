import sidebarModel from "../models/sidebarModel.js";

// Get all sidebar items
export const getSidebarItems = async (req, res) => {
    try {
        const sidebarItems = await sidebarModel.find({});
        res.status(200).json({ success: true, data: sidebarItems });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching sidebar items" });
    }
};

// Get a specific sidebar item
export const getSidebarItem = async (req, res) => {
    const { key } = req.params;

    try {
        const item = await sidebarModel.findOne({ key });
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching item" });
    }
};

export const addSidebarItems = async (req, res) => {
    try {
        const sidebarItems = [
            {
                label: 'Drinks',
                icon: 'glassMartiniAlt',
                iconColor: '#3498DB',
                key: 'drinks',
                link: '/drinks'
            },
            {
                label: 'Specials',
                icon: 'angleDoubleDown',
                iconColor: '#E74C3C',
                key: 'specials',
                link: '/specials'
            },
            {
                label: 'Special Offers',
                icon: 'gift',
                iconColor: '#FF69B4',
                key: 'offers',
                link: '/offers'
            },
            {
                label: 'Prizes Earn',
                icon: 'ribbon',
                iconColor: '#27AE60',
                key: 'prizes',
                link: '/prize'
            },
            {
                label: 'My Orders',
                icon: 'briefcase',
                iconColor: '#34495E',
                key: 'myOrders',
                link: '/orders'
            },
            {
                label: 'Track My Order',
                icon: 'map',
                iconColor: '#1ABC9C',
                key: 'trackOrder',
                link: '/trackmyorder'
            }
        ];

        const result = await sidebarModel.insertMany(sidebarItems);
        res.status(201).json({
            success: true,
            message: 'Sidebar items added successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding sidebar items',
            error: error.message
        });
    }
};
