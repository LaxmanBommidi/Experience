import express from 'express';
import { config } from 'dotenv';
import authRoutes from './routes/auth.route.js';
import { connectDB, prisma } from './config/db.js';
import { authMiddleware } from './middlewares/auth.middleware.js';
import blogRoutes from './routes/blog.route.js';


config();
connectDB();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());


// testing api 
app.get('/' , (req , res ) => {
    res.send("Hello World");
});
// auth router 
app.use("/api/auth",authRoutes);
// blogs router
app.use("/api/blogs",blogRoutes);

app.listen(PORT , () => console.log("server listening at port 8080"));