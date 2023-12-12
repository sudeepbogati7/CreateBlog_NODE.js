const express = require("express");
const router = express.Router();
const { Blog } = require("../models/blogs");
const verifyToken = require("../middlewares/auth");
const app = express();

router.get("/add-blog", (req, res) => {
  res.render("blogs");
});

router.get("/add-blog", async (req, res) => {
  try{
      const userEmail = req.user ? req.user.email : null;
      const blogPosts = await Blog.find({ user: userEmail });
      if (req.headers.accept && req.headers.accept.includes("application/json")) {
          // Return JSON data if the client accepts JSON
          res.json({ blogPosts });
      } else {
          // Otherwise, render the HTML page
          res.render("blogs", { blogPosts });
      }
  }catch(ex) {
    console.log(ex);
    res.status(500).json({error : "Internal Server Error !"});
  }

});

router.post("/add-blog", verifyToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc)
      return res
        .status(400)
        .json({ error: "Title and description are required ! " });

    const newBlog = new Blog({ title, desc, user : req.user._id });
    await newBlog.save();

    //returning success response
    return res
      .status(200)
      .json({ success: true, blog: newBlog, message: "Successfully added !" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server Error !! " });
  }
});

module.exports = router;
