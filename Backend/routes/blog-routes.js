const express = require("express");
const { getAllBlogs, getbyId, getbyUserId, addBlog, updateBlog, deleteBlog } = require("../controllers/blog-controller.js");

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getbyId);
blogRouter.get("/user/:id", getbyUserId);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);


module.exports = blogRouter;