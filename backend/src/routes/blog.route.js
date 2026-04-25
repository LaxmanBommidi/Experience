import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { create, getAll, getOne, remove, update } from "../controllers/blog.controller.js";

const blogRoutes = Router();
// public 
blogRoutes.get("/", getAll);
blogRoutes.get("/:blogId", getOne);
// Protected
blogRoutes.post('/' ,authMiddleware, create);
blogRoutes.put('/:blogId', authMiddleware, update);
blogRoutes.delete('/:blogId' ,authMiddleware, remove);

export default blogRoutes;