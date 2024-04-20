const express = require('express');
const Product = require("../models/product.model")
const router = express.Router();
const multer = require("multer")
const fs = require('fs');

// store to store image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadFolder = 'uploads/';
        // Check if the 'uploads' folder exists, if not, create it
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder);
        }
        cb(null, uploadFolder); // specify the destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // generate a unique filename for each uploaded file
    }
});

// Set up multer instance
const upload = multer({ storage: storage });

// router
router.get('', (req, res) => {
    res.send("test");
})
// upload image files
router.post('/api/product', upload.single('image'), async (req, res) => {
    try {
        const { name, quantity, price } = req.body;
        const image = req.file ? req.file.filename : null; // Get filename of the uploaded image
        const product = await Product.create({ name, quantity, price, image });
        res.status(200).json({ message: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// add a product
router.post('/api/product', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({ message: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// get all products
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ message: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get one product

router.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({ message: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// update products

router.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json({ message: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// delete products

router.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;