// // // import express from 'express';
// // // import { loginUser,registerUser, checkUserExists } from '../controllers/userController.js';
// // // const userRouter = express.Router();

// // // userRouter.post("/register", registerUser);
// // // userRouter.post("/login", loginUser);
// // // userRouter.get("/check/:email", checkUserExists);

// // // export default userRouter;
// // import express from 'express';
// // import { loginUser, registerUser, checkUserExists } from '../controllers/userController.js';

// // const userRouter = express.Router();

// // userRouter.post("/register", registerUser);
// // userRouter.post("/login", loginUser);
// // userRouter.get("/check/:email", checkUserExists);  // New route for checking if user exists

// // export default userRouter;
// import express from 'express';
// import { registerUser, loginUser, checkUserExists,getUserProfile,updateUserProfile } 
// from '../controllers/userController.js';
// import auth from '../middleware/auth.js';
// const userRouter = express.Router();

// userRouter.post('/register', registerUser);
// userRouter.post('/login', loginUser);
// userRouter.get('/check/:email', checkUserExists);
// userRouter.get('/profile', auth, getUserProfile);  // Get profile
// userRouter.put('/profile', auth, updateUserProfile);  // Update profile

// export default userRouter;

import express from 'express';
import { registerUser, loginUser, checkUserExists, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/check/:email', checkUserExists);
userRouter.get('/profile', auth, getUserProfile);
userRouter.put('/profile', auth, updateUserProfile);

export default userRouter;
