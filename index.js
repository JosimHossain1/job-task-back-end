const express = require('express');
const app = express();
mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const Product = require('./Schema/ProductSchema'); // Middleware
app.use(cors());
app.use(express.json());

// Database connection
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@cluster0.iy8ibsp.mongodb.net/`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

async function run() {
  try {

    app.get('/products', async (req, res) => {

        const products = await Product.find();
        res.json(products); 
   
    });

    app.post('/products', async (req, res) => {
      try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct); //
      } catch (err) {
        res.status(400).json({ message: err.message }); 
      }
    });
    app.listen(port, (req, res) => {
      console.log('Listening port on', port);
    });
  } catch (error) {}
}
run().catch(console.dir);
