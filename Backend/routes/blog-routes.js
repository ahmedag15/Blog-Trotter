import express from 'express';
import { getAllBlogs, getbyId, addBlog, updateBlog, deleteBlog } from '../controllers/blog-controller';

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getbyId);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);



export default blogRouter;