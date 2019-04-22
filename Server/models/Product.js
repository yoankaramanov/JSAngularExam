const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  itemName: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  contactNumber: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  price: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  image: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
