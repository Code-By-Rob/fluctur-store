const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// To Be Continued...

const sizesSchema = new Schema({
    id: Number,
    val: String,
    size: String,
    checked: Boolean,
}, {_id: false});

const sizeDataSchema = new Schema({
    sleeveLength: String,
    bust: String,
    waist: String,
    hips: String,
    length: String,
}, {_id: false});

const sizeReferenceSchema = new Schema({
    Small: {
        type: sizeDataSchema,
    },
    Medium: {
        type: sizeDataSchema,
    },
    Large: {
        type: sizeDataSchema,
    }
}, {_id: false});

const productSchema = new Schema({
    name: String,
    productLink: String,
    images: [String],
    productDescription: String,
    sizes: [sizesSchema],
    sizeReference: sizeReferenceSchema,
    gender: String,
    colour: String,
    fitType: String,
    quantity: Number,
    cost: String,
    price: String,
    deliveryTime: String,
    category: String,
    features: String,
    modelNumber: String,
    keywords: String,
    season: String,
    fabric: String,
    productWashing: String,
    dateAdded: String,
});

module.exports = {
    Product: mongoose.model('Product', productSchema, 'products'),
    Sizes: mongoose.model('Sizes', sizesSchema),
    SizeData: mongoose.model('SizeData', sizeDataSchema),
    SizeReference: mongoose.model('SizeReference', sizeReferenceSchema)
}