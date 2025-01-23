



import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import validator from 'validator';
// import dotenv from 'dotenv';
// dotenv.config();
// Create token
export const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register user
// const registerUser = async (req, res) => {
//     const { name, email, password, phone, address, cuisine, preferences } = req.body;

//     try {
//         // Check if user exists
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.status(400).json({ success: false, message: "User already exists" });
//         }

//         // Validate email and password
//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ success: false, message: "Invalid email" });
//         }
//         if (password.length < 8) {
//             return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create user
//         const user = new userModel({ name, email, password: hashedPassword, phone, address, cuisine, preferences });
//         await user.save();

//         // Create and return token
//         const token = createToken(user._id);
//         res.status(201).json({ success: true, token });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        
        // Check for existing user first
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered. Please use a different email.'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            cuisine: req.body.cuisine || '',
            preferences: req.body.preferences || ''
        });

        const token = createToken(newUser._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Registration failed. Please try again.' });
    }
};














// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Check if user exists
const checkUserExists = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userModel.findOne({ email });
        res.status(200).json({ exists: !!user });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

 const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;  // from JWT middleware
        const user = await userModel.findById(userId).select('-password');  // Exclude password

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//Update user profile (protected route)
export const updateUserProfile = async (req, res) => {
    const { name, email, phone, address, cuisine, preferences } = req.body;

    try {
        const userId = req.user.id;  // from JWT middleware
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            name,
            email,
            phone,
            address,
            cuisine,
            preferences
        }, { new: true });  // `new: true` returns the updated document

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// const updateProfile = async (userData) => {
//     const response = await fetch('/api/users/profile', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'token': localStorage.getItem('token') // Make sure this matches your token storage method
//       },
//       body: JSON.stringify(userData)
//     });
//     return response.json();
//   };
 const updateUserProfile = async (req, res) => {
    const { name, email, phone, address, cuisine, preferences } = req.body;

    try {
        const userId = req.user.id;
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, email, phone, address, cuisine, preferences },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};











// export { registerUser, loginUser, checkUserExists,updateProfile };

export { registerUser, loginUser, checkUserExists, updateUserProfile,getUserProfile };
