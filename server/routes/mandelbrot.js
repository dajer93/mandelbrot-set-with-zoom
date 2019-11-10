const express = require('express')
const Mandelbrot = require('../models/mandelbrot')
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "mandelbrot",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

const router = express.Router()
// Get all mandelbrot images
router.get('/', async (req, res) => {
  try {
    const mandelbrots = await Mandelbrot.find()
    res.json(mandelbrots);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one mandelbrot image
router.get('/:id', (req, res) => {
})

// Create one mandelbrot image
router.post('/', parser.single("image"), async (req, res) => {
  const mandelbrot = new Mandelbrot({
    zoom: req.body.zoom,
    maxIterations: req.body.maxIterations,
    offsetX: req.body.offsetX,
    offsetY: req.body.offsetY,
    imageUrl: req.file.url,
    imageId: req.file.public_id
  })
  try {
    const newMandelbrot = await mandelbrot.save()
    res.status(201).json(newMandelbrot)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one mandelbrot image
router.patch('/:id', (req, res) => {
  // Todo
})

// Delete all mandelbrot images
router.delete('/', async (req, res) => {
  try {
    await Mandelbrot.remove()
    res.json({ message: 'Deleted all mandelbrot images' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router