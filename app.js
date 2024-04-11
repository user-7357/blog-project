require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookiePaser = require("cookie-parser");

const Blog = require("./models/blog")

const userRoute = require("./routers/user");
const blogRoute = require("./routers/blog");
const checkForAuthontationCookies = require("./middelwares/authontication");

// app creation for express...
const app = express();
const port = process.env.PORT;

// database connective...
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("Connected to MongoDB"));

// set view ejs engine....
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middeleware.......
app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(checkForAuthontationCookies("token"));
app.use(express.static(path.resolve("./public")));

// routing .....
app.get("/", async (req, res) => {
  const allBlog = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlog,
  });
});

app.use("/user/", userRoute);
app.use("/blog/", blogRoute);

// connecting nadejs server.....
app.listen(port, () => console.log(`server running in port ${port}`));
