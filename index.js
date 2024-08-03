import express from 'express';
import mongoose from 'mongoose';
import { Product } from './models/product.model.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Lets Create a API for Shopping');
})

app.post('/api/products', async (req, res) => {
    try {
        const producttop = await Product.create(req.body);
        res.status(200).json(producttop);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

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
