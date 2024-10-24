// products/products.controller.js

const express = require('express');
const router = express.Router();
const db = require('../_helpers/db'); // Ensure this path is correct

// Endpoint to create a product
router.post('/', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = await db.Product.create({ name, description, price });
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, status } = req.body;

    try {
        // Find the product by ID
        const product = await db.Product.findByPk(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product details
        await product.update({ name, description, price, status });

        return res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating product', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await db.Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving products', error });
    }
});

// View Product Details
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await db.Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving product details', error });
    }
});

// Check Stock Availability (Customer)
router.get('/:productId/availability', async (req, res) => {
    const { productId } = req.params;

    try {
        const inventory = await db.Inventory.findOne({ where: { productId } });

        if (!inventory || inventory.quantity <= 0) {
            return res.status(200).json({ available: false, message: 'Out of stock' });
        }

        return res.status(200).json({ available: true, quantity: inventory.quantity });
    } catch (error) {
        return res.status(500).json({ message: 'Error checking product availability', error });
    }
});


module.exports = router;
