const express = require('express');
const router = express.Router();
const Product = require('./models/product');

// অ্যাডমিন ফর্ম পেজ দেখানোর জন্য GET রাউট
router.get('/add-product', (req, res) => {
    res.render('add-product');
});

// প্রোডাক্ট ডাটা ডাটাবেজে সেভ করার জন্য POST রাউট
router.post('/add-product', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect('/products');
    } catch (error) {
        res.status(500).send("প্রোডাক্ট সেভ করতে সমস্যা হচ্ছে: " + error.message);
    }
});

module.exports = router;