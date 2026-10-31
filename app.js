require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const { upload } = require('./config/cloudinary');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI, 
).then(() => console.log('Database Connected!'))
  .catch(err => console.log(err));

app.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('index', { products });
    } catch (err) {
        res.status(500).send("সার্ভারে সমস্যা হয়েছে");
    }
});

app.get('/admin', (req, res) => {
    res.render('admin');
});

// নতুন যুক্ত করা GET রাউট (ফর্ম দেখানোর জন্য)
app.get('/admin/add-product', (req, res) => {
    res.render('add-product');
});

app.post('/admin/add-product', upload.single('image'), async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const imageUrl = req.file.path; 

        const newProduct = new Product({
            name,
            price,
            category,
            imageUrl
        });

        await newProduct.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send("পণ্য আপলোড করতে সমস্যা হয়েছে");
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});