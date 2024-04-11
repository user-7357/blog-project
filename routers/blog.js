const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const blog = require("../models/blog");
const Blog = require("../models/blog");
const Comment = require("../models/comment")

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage })

router.get("/addBlog", (req, res) => {
    res.render("addBlog", {
        user: req.user,
      });
  });

  router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId: req.params.id}).populate("createdBy");
    return res.render("blog",{
      user: req.user,
      blog,
      comments,
    });
  });
  
  router.post("/",upload.single("image") , async (req, res) => {
    const { title, body } = req.body;
    const addBlog = await blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageUrl: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${addBlog._id}`);
    
  });

  router.post("/comment/:blogId", async (req, res) =>{
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`)
  });

module.exports = router;