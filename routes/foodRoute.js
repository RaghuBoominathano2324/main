// import express from 'express';
// import { addFood, listFood, removeFood } from '../controllers/foodController.js';
// import multer from 'multer';
// import { authenticate } from '../middleware/authenticate.js';
// // import Profile from '../../admin/src/pages/Profile/Profile.jsx';
// const foodRouter = express.Router();

// //Image Storage Engine (Saving Image to uploads folder & rename it)

// const storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         return cb(null,`${Date.now()}${file.originalname}`);
//     }
// })

// const upload = multer({ storage: storage})

// foodRouter.get("/list",listFood);
// foodRouter.post("/add",upload.single('image'),addFood);
// foodRouter.post("/remove",removeFood);
// // foodRouter.post("/profile",Profile);

// export default foodRouter;
import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import AuthValidation from '../middleware/AuthValidation.js';
const foodRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Protected food routes with authentication
foodRouter.use(AuthValidation);

// Food routes
foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single('image'), addFood);
foodRouter.post("/remove", removeFood);

// Get specific food data
foodRouter.get("/", async (req, res) => {
    try {
        // Your food-related logic here
        res.status(200).json({ message: 'Food data accessed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default foodRouter;
