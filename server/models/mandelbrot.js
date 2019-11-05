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
    default: Date.now
  },
  offsetY: {
    type: Number,
    required: true,
    default: Date.now
  },
  // image: {
  //   type: 
  // }
})