const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
