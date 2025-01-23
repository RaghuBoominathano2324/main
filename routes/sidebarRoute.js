import express from 'express';
import { getSidebarItems, getSidebarItem,addSidebarItems } from '../controllers/sidebarcontroller.js';

const router = express.Router();

// Route to get all sidebar items
router.get('/', getSidebarItems);

// Route to get a specific sidebar item by key
router.get('/:key', getSidebarItem);

router.get('/get-sidebar-items', async (req, res) => {
    try {
        const items = await sidebarModel.find({});
        res.status(200).json({
            success: true,
            data: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/add-items', addSidebarItems);

export default router;
