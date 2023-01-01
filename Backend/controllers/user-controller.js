const mongoose = require("mongoose");
const User = require("../model/User.js");
const bcrypt = require("bcryptjs");

// Get all users
exports.getAllusers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: " No Users Found! " });
    }
    return res.status(200).json({ users });
};

// User signup
exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (existingUser) {
        return res.status(400).json({ message: " User already exists! " });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({ user });

};

// User login
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (!existingUser) {
        return res.status(404).json({ message: " User has not signed up! " });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: " Incorrect Password! " });
    }
    // const exp = Date.now() + 1000 * 60;
    // const token = jwt.sign({ sub: existingUser._id, exp }, process.env.JWT_SECRET);

    // res.cookie("Authorization", token, {
    //     expires: new Date(exp),
    //     httpOnly: true,
    //     sameSite: "lax",
    //     secure: process.env.NODE_ENV === "production",
    // })

    return res.status(200).json({ message: " You are logged in ", user: existingUser });
};

// Check Authentication
// exports.checkAuth = (req, res) => {

//     res.sendStatus(200);
// };
