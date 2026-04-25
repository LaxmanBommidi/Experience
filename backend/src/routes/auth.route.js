
import { Router } from "express";
import { getUserProfileWithPosts, getUsers, login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = Router();


authRoutes.post("/register" , register );
authRoutes.post("/login" , login );
authRoutes.get("/users" , authMiddleware, getUsers)
authRoutes.get("/profile" , authMiddleware, getUserProfileWithPosts);

export default authRoutes;