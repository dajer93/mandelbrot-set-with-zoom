const mongoose = require('mongoose')

const mandlebrotSchema = new mongoose.Schema({
  zoom: {
    type: Number,
    required: true
  },
  maxIterations: {
    type: Number,
    required: true
  },
  offsetX: {
    type: Number,
    required: true,
    default: 0
  },
  offsetY: {
    type: Number,
    required: true,
    default: 0
  },
  imageUrl: {
    type: String,
    required: true
  },
  imageId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Mandelbrot', mandlebrotSchema)