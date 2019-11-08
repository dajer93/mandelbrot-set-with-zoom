const express = require('express')
const router = express.Router()
const Mandelbrot = require('../models/mandelbrot')

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
router.post('/', async (req, res) => {
  const mandelbrot = new Mandelbrot({
    zoom: req.body.zoom,
    maxIterations: req.body.maxIterations,
    offsetX: req.body.offsetX,
    offsetY: req.body.offsetY,
    image: req.body.image
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