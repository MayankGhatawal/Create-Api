import express from 'express';
import mongoose from 'mongoose';
import { Product } from './models/product.model.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Lets Create a API for Shopping');
})
// Show All The API's
app.get('/api/products', async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Show onlyOne API
app.get('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Create a new API
app.post('/api/products', async (req, res) => {
    try {
        const producttop = await Product.create(req.body);
        res.status(200).json(producttop);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Update a API
app.put('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(404).json({message: 'Product not found'});
        } else {
            const UpdatedApi = await Product.findById(id)
            res.status(200).json(UpdatedApi);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Delete a API

app.delete('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({message: 'Product not found'});
        } else {
            res.status(200).json({message: 'Product deleted'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017')
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(3000, (req, res) => {
        console.log(`This server is listening on http://localhost:3000`);
    });
})
.catch(()=>{
    console.log("Failed to connect to MongoDB");
})
