const express = require('express');
const post = require('../models/Post');
const router = express.Router();
const Category = require('../models/Category');

// GET all blog posts
router.get("/", async(req, res) => {
    try {
        const posts = await post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 });

 // GET a specific blog post
  router.get("/:id", async(req, res) => {
    try {
        const singlePost = await post.findById(req.params.id);  
        res.status(200).json(singlePost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

  // GET all categories
  router.get("/api/categories", async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

  //POST Create a new blog post
  router.post("/", async(req, res) => {
    const { title, content, featuredImage, slug, excerpt, author, category, tags, isPublished } = req.body;
    try {
        const newPost = new post({ title, content, featuredImage, slug, excerpt, author, category, tags, isPublished });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }      
  });

  // PUT /api/posts/:id`: Update an existing blog post
  router.put('/:id', async (req, res) => {
    try {
      const updatedPost = await post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if(!updatedPost) return res.status(404).json({ message: 'Post not found' });
      res.json(updatedPost);
    } catch (error){
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;