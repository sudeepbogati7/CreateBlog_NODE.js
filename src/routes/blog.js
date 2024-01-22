const express = require("express");
const router = express.Router();
const { Blog } = require("../models/blogs");
const verifyToken = require("../middlewares/auth");

router.get("/add-blog", async (req, res) => {
  try {
    // const userId = req.user._id;
    // console.log(userId);
    const blogPosts = await Blog
                                .find()
                                .populate('user', ' username email -_id');

    // console.log(blogPosts);
    // If the client accepts JSON, return JSON data
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      // console.log(res.json({ blogPosts }));
      return res.json({ blogPosts });
    } else {
      // Otherwise, render the HTML page with the blog data
      res.render("home", { blogPosts });
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});


router.post("/add-blog", verifyToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc)
      return res
        .status(400)
        .json({ error: "Title and description are required!" });

    const newBlog = new Blog({ title, desc, user: req.user._id });
    await newBlog.save();

    // Returning success response
    return res
      .status(200)
      .json({ success: true, blog: newBlog, message: "Successfully added!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server Error!" });
  }
});

module.exports = router;
