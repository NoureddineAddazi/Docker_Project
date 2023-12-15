const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require("mongoclient")
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//mongoose.connect('mongodb://mongo:27017/simple-mern-app', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(
  'mongodb://mongo:27017/simple-mern-app', {
      useNewUrlParses : MongoClient.connect,
      useUnifiedTopology : true
  })
  .then(()=>{
      console.log("Connected to the database");
  })
  .catch((error) => {
      console.log("Cannot connect to the database "+error);
      process.exit();
  })
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  quantity: Number
});

const Product = mongoose.model('Product', productSchema);

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
