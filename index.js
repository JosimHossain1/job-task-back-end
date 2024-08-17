const express = require('express');
const app = express();
 mongoose =require('mongoose');
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
    app.get('/producst', async (req, res) => {
    //   const {
    //     page = 1,
    //     limit = 10,
    //     search = '',
    //     category,
    //     sortBy,
    //     priceRange,
    //   } = req.query;

    //   // Filter
    //   const filter = {};

    //   if (search) filter.name = { $regex: search, $options: 'i' };
    //   if (category) filter.category = category;
    //   if (priceRange) {
    //     const [min, max] = priceRange.split('-').map(Number);
    //     filter.price = { $gte: min, $lte: max };
    //   }

    //   // Sort

    //   const sortOption = {};

    //   if (sortBy) {
    //     if (sortBy === 'priceLowToHigh') sortOption.price = 1;
    //     else if (sortBy === 'priceHighToLow') sortOption.price = -1;
    //     else if (sortBy === 'newestFirst') sortOption.createdAt = -1;
    //   }
    //   try {
    //     const product = await Product.find(filter)
    //       .sort(sortOption)
    //       .limit(limit * 1);
    //     skip((page - 1) * limit).exec();

    //     const count = await Product.countDocuments(filter);
    //     res.json({
    //       product,
    //       totalPages: Math.ceil(count / limit),
    //       currentPage: page,
    //     });
    //   } catch (err) {
    //     res.status(500).json({ message: err.message });
    //   }
    // });
    })

    app.post('/products', async (req, res) => {
      try {
        const newProduct = new Product(req.body); // Create a new Product instance with the request body
        await newProduct.save(); // Save the new product to the database
        res.status(201).json(newProduct); // Respond with the newly created product
      } catch (err) {
        res.status(400).json({ message: err.message }); // Respond with an error message if something goes wrong
      }
    });
    app.listen(port, (req, res) => {
      console.log('Listening port on', port);
    });
  } catch (error) {}
}
run().catch(console.dir);
