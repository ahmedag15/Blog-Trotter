import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

// Get All blogs
export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate('user');
    } catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: " No Blogs Found! " });
    }
    return res.status(200).json({ blogs });
};

// Get a specific blog
export const getbyId = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: " No such blog Found! " });
    }
    return res.status(200).json({ blog });
};

// Get a blog by User id
export const getbyUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (err) {
        return console.log(err);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: " No such blog Found! " });
    }
    return res.status(200).json({ user: userBlogs });
};


// Add a blog
export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: " No such user found! " })
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session })
        await session.commitTransaction();
    } catch (err) {
        return console.log(err);
        return res.status(500).json({ message: err })
    }
    return res.status(200).json({ blog })

};

// Update a blog
export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })

    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: " The blog can't be updated! " });
    }
    return res.status(200).json({ blog });

};

// Delete a blog
export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();

    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: " The blog can't be deleted! " });
    }
    return res.status(200).json({ message: " Blog is deleted " });

};







