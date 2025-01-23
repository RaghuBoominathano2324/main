import express  from "express"
import cors from 'cors'
import { connectDB}  from "./config/db.js"
import { verifyAdmin } from "./middleware/verifyAdmin.js"
import userRouter from './routes/userRouter.js';
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import sideRoutes from "./routes/sidebarRoute.js"
import AuthRouter from "./routes/AuthRouter.js"
import Joi from 'joi';
import dotenv from 'dotenv';

// app config
const app = express()
const port = process.env.PORT ||  4000;


// middlewares
app.use(express.json());

app.use(cors())
dotenv.config(); // Load environment variables from .env


// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
// app.use("/api/food", foodRouter)
app.use("/api/food", verifyAdmin, foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)
app.use('/api/sidebar', sideRoutes);
app.use('/api/auth', AuthRouter);

app.get("/", (req, res) => {
    res.send("API Working")
  });
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.listen(port, () => console.log(`Server started on http://localhost:${port}`))