const express = require('express');
const router = express.Router();
const Product = require('./models/product'); // নিশ্চিত করো যে models ফোল্ডারে product.js ফাইলটি আছে

// ইউজার প্যানেলে সমস্ত প্রোডাক্ট দেখানোর GET রাউট
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('user-products', { products });
    } catch (error) {
        res.status(500).send("প্রোডাক্ট লোড করতে সমস্যা হচ্ছে: " + error.message);
    }
});

module.exports = router;