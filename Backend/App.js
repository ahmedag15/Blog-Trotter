import express from 'express';
import mongoose from 'mongoose'
import userRouter from './routes/user-routes';
import blogRouter from './routes/blog-routes';

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose.connect('mongodb+srv://admin:Hello123@cluster0.eaxphdn.mongodb.net/BlogTrotter?retryWrites=true&w=majority')
.then(() =>app.listen(5000))
.then(() => console.log("Database Connected and Listening at port 5000"))
.catch((err) => console.log(err));


//admin
//Hello123