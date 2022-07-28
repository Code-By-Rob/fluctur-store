const express = require('express');
const router = express.Router();
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

// await unlinkFile(file.path); Important to remove the file path from the uploads directory.

const { uploadFile } = require('../controllers/s3.images');

const { Product } = require('../models/product.model');

module.exports = function(upload) {
    router.post('/Product', upload.array('images'), async (req, res) => {
        try {

            // Complete a the post route to the database.
            const files = req.files;
            console.log(files);
            // upload the file to the s3 bucket
            const results = [];
            for (let file of files) {
                let result = await uploadFile(file);
                await unlinkFile(file.path);
                results.push(result.Key);
            }

            const { 
                name,
                productLink,
                productDescription,
                sizes,
                sizeReference,
                gender,
                colour,
                fitType,
                quantity,
                cost,
                price,
                deliveryTime,
                category,
                features,
                modelNumber,
                keywords,
                season,
                fabric,
                productWashing
            } = req.body;

            const sizesArray = JSON.parse(sizes);
            const sizesRefObject = JSON.parse(sizeReference);

            // Add to a module folder.
            const date = new Date();
            let d = date.getUTCDate();
            let m = date.getUTCMonth() + 1;
            let y = date.getUTCFullYear();
            const dateAdded = `${d}/${m}/${y}`;

            const newProduct = new Product({
                name: JSON.parse(name),
                productLink: JSON.parse(productLink),
                images: results,
                productDescription: JSON.parse(productDescription),
                sizes: sizesArray,
                sizeReference: sizesRefObject,
                gender: JSON.parse(gender),
                colour: JSON.parse(colour),
                fitType: JSON.parse(fitType),
                quantity: JSON.parse(quantity),
                cost: JSON.parse(cost),
                price: JSON.parse(price),
                deliveryTime: JSON.parse(deliveryTime),
                category: JSON.parse(category),
                features: JSON.parse(features),
                modelNumber: JSON.parse(modelNumber),
                keywords: JSON.parse(keywords),
                season: JSON.parse(season),
                fabric: JSON.parse(fabric),
                productWashing: JSON.parse(productWashing),
                dateAdded: dateAdded,
            })
            await newProduct.save();
            res.send({
                message: 'success',
                product: newProduct
            })
            
        } catch(err) {
            res.send({
                message: 'unsuccessful',
                error: err,
            })
        }
    })

    return router;
}