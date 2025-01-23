import express from 'express'; // Proper import of express

import jwt from 'jsonwebtoken'; 
const Authrouter = express.Router();

const ADMIN_CREDENTIALS = {
    userId: "raghusurya89@adminrights.com",
    password: "Raghu*342552"
};

//

const JWT_SECRET = 'my_jwt_secret'; // Replace with a hardcoded secret for development/testing

// Authrouter.post('/admin-login', async (req, res) => {
//   const { userId, password } = req.body; // Using userId to match frontend

//   if (userId === ADMIN_CREDENTIALS.userId && password === ADMIN_CREDENTIALS.password) {
//     const token = jwt.sign({ userId, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ success: true, token });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid credentials' });
//   }
// });

// User existence check (optional for signup)
Authrouter.post('/admin-login', async (req, res) => {
  const { userId, password } = req.body;

  if (userId === ADMIN_CREDENTIALS.userId && password === ADMIN_CREDENTIALS.password) {
    const token = jwt.sign({ userId, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token, role: 'admin' }); // Explicitly include 'role'
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

Authrouter.get('/user/check/:email', (req, res) => {
    const { email } = req.params;

    const userExists = email === ADMIN_CREDENTIALS.userId; // Example for admin email
    res.status(200).json({ exists: userExists });
});

export default Authrouter;