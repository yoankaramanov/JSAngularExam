const express = require('express')
const authCheck = require('../middleware/auth-check');
const Product = require('../models/Product');

const router = new express.Router()

function validateProductForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  
  payload.price = parseInt(payload.price)

  if (!payload || typeof payload.itemName !== 'string' || payload.itemName.length < 3) {
    isFormValid = false
    errors.itemName = 'Item name must be more than 3 symbols.'
  }

  if (!payload || typeof payload.location !== 'string' || payload.location.length < 3) {
    isFormValid = false
    errors.location = 'Location must be more than 3 symbols.'
  }

  if (!payload || typeof payload.contactNumber !== 'string' || payload.contactNumber.length < 3 || payload.contactNumber.length > 10) {
    isFormValid = false
    errors.contactNumber = 'Contact number must be 10 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10) {
    isFormValid = false
    errors.description = 'Description must be more than 10 symbols.'
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || typeof payload.image !== 'string' || payload.image.length === 0) {
    isFormValid = false
    errors.image = 'Image URL is required.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const product = req.body
  product.creator = req.user._id
  const validationResult = validateProductForm(product)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Product.create(product)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Product added successfully.',
        product
      })
    })
})

router.get('/all', authCheck ,(req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search

  Product.find({})
    .then((product) => {
      return res.status(200).json(product)
    })
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        itemName: product.itemName,
        location: product.location,
        contactNumber: product.contactNumber,
        description: product.description,
        price: product.price,
        image: product.image,
      }


      res.status(200).json(response)
    })
})


router.get('/user', authCheck, (req, res) => {
  const user = req.user._id

  Product.find({creator: user})
    .then((product) => {
      return res.status(200).json(product)
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user._id

  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(200).json({
          success: false,
          message: 'Product does not exists!'
        })
      }

      if ((product.creator.toString() != user && !req.user.roles.includes("Admin"))) {
         return res.status(401).json({
           success: false,
           message: 'Unauthorized!'
         })
      }

      Product.findByIdAndDelete(id)
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Product deleted successfully!'
          })
        })
    })
})

router.put('/edit/:id', authCheck, async (req, res) => {
  const id = req.params.id;
  const product = req.body;

  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product does not exists!'
    })
  }

  if (!req.user.roles.includes('Admin')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized!'
    })
  }

  const validationResult = validateProductForm(product)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Product.findByIdAndUpdate(id, product)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Product edited successfully!'
      })
  })
})

router.get('/:id', authCheck, (req, res) => {
  const id = req.params.id

  Product.findById(id)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        itemName: product.itemName,
        location: product.location,
        contactNumber: product.contactNumber,
        description: product.description,
        price: product.price,
        image: product.image
      }

      res.status(200).json(response)
    })
})

module.exports = router
