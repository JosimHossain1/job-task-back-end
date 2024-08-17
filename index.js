const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@assignment12.jgpjiej.mongodb.net/?retryWrites=true&w=majority&appName=assignment12`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    app.get("/producst", (req, res)=>{
      const {page=1, limit=10, search="", category, sortBy, priceRange } = req.query;

      const filter = {};

      if(search) filter.name = {$regex: search, $options : 'i'};
      if(category) filter.category = category;
      if(priceRange){
        const [min, max] = priceRange.split('-').map(Number);
        filter.price = {$gte:min, $lte : max};
      }

    })

    
    app.listen(port, (req, res) => {
      console.log('Listening port on', port);
    });
  } catch (error) {}
}
run().catch(console.dir);
