require('dotenv').config({ path: './config.env' })
console.log('Loaded port:', process.env.PORT);
const express = require('express');
const connectMongo = require('./utils/connect'); // Ensure this connects to MongoDB
const cors = require('cors');
const Category = require('./utils/model'); // Adjust the path to where your model is defined

const app = express();


// Enable CORS for React frontend running on port 5173
const corsOptions = {
  origin: 'http://localhost:5173',
};

// Use CORS middleware before defining routes
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Endpoint to retrieve all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Endpoint to retrieve a category by slug (including nested structure)
app.get('/api/categories/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    // Attempt to find a category directly by slug or within child/grandchild categories
    const category = await Category.findOne({
      $or: [
        { slug: slug }, // Check for the main category
        { 'childCategories.slug': slug }, // Check for child categories
        { 'childCategories.grandchildCategories.slug': slug }, // Check for grandchild categories
      ],
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // If found, prepare a response including the entire category structure
    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});

// PUT Endpoint to edit category by slug
app.put('/api/categories/:slug', async (req, res) => {
  const { slug } = req.params;
  const { name, description } = req.body;

  try {
    // Find the category (child or grandchild) by its slug and update
    const category = await Category.findOneAndUpdate(
      { 'childCategories.slug': slug }, // Check in childCategories
      { $set: { 'childCategories.$.name': name, 'childCategories.$.description': description } },
      { new: true }
    );

    if (!category) {
      // If not found in childCategories, check grandchildCategories
      const grandchildCategory = await Category.findOneAndUpdate(
        { 'childCategories.grandchildCategories.slug': slug }, // Check in grandchildCategories
        { $set: { 'childCategories.$.grandchildCategories.$[gc].name': name, 'childCategories.$.grandchildCategories.$[gc].description': description } },
        {
          new: true,
          arrayFilters: [{ 'gc.slug': slug }],
        }
      );

      if (!grandchildCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      return res.status(200).json({ message: 'Grandchild category updated successfully', grandchildCategory });
    }

    res.status(200).json({ message: 'Child category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
});



// Search API endpoint
app.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    // Find categories and search for products matching the query
    const categories = await Category.find({
      'childCategories.grandchildCategories.products.name': { $regex: query, $options: 'i' }
    });

    const results = [];

    // Loop through the found categories to extract matching products
    categories.forEach(category => {
      category.childCategories.forEach(child => {
        child.grandchildCategories.forEach(grandchild => {
          const matchingProducts = grandchild.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          if (matchingProducts.length) {
            results.push(...matchingProducts);
          }
        });
      });
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  connectMongo(); // Ensure you're connecting to MongoDB
  console.log(`Server is running on port ${process.env.PORT}...`); // Use process.env.PORT here
});
