import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import adminModel from '../Models/admin.js';

export const adminlogin = async (req, res) => {
    try {
        const { userId, password } = req.body;
        if (!userId || !password) {
            return res.status(400).json({ message: 'userId and password are required', success: false });
        }

        const adminuser = await adminModel.findOne({ userId: userId.toLowerCase() });
        const errorMsg = 'Auth failed: userId or password is wrong';

        if (!adminuser) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, adminuser.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        let jwtToken;
        try {
            jwtToken = jwt.sign(
                { userId: adminuser.userId, _id: adminuser._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
        } catch (jwtError) {
            return res.status(500).json({ message: 'Error generating token', success: false });
        }

        res.status(200).json({
            message: "Login Successful",
            success: true,
            jwtToken,
            adminuser: { userId: adminuser.userId, name: adminuser.name }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
