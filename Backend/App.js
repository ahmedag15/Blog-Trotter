const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const cookieParser = require("cookie-parser");
// const requireAuth = require("./middleware/requireAuth");
const userRouter = require("./routes/user-routes.js");
const blogRouter = require("./routes/blog-routes.js");


const app = express();
app.use(cors());
app.use(express.json());
//app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose.connect('mongodb+srv://admin:Hello123@cluster0.eaxphdn.mongodb.net/BlogTrotter?retryWrites=true&w=majority')
    .then(() => app.listen(5000))
    .then(() => console.log("Database Connected and Listening at port 5000"))
    .catch((err) => console.log(err));


//admin
//Hello123