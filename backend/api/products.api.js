const express = require('express');
const router = express.Router();
const { Product } = require('../models/product.model');

router.get('/all', async (req, res) => {
    let products = await Product.find();
    console.log(products);
    res.send(products);
})

router.get('/item/:id', async (req, res) => {
    let product = await Product.findById(req.params.id);
    console.log('retrieving the product', product);
    res.send(JSON.stringify(product));
})

router.get('/category/:category', async (req, res) => {
    // Add an if statement & extract the categories when needed.
    let category = req.params.category;
    let products = await Product.find({ category: category });
    res.send(JSON.stringify(products));
})

module.exports = router;