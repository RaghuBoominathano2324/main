import jwt from 'jsonwebtoken';


const auth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decodedToken.id };  // Attach to req.user instead of req.body
        next();
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default auth;
