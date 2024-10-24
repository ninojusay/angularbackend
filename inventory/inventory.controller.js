const express = require('express');
const router = express.Router();
const db = require('../_helpers/db');

// View Inventory (Admin/Manager)
router.get('/', async (req, res) => {
    try {
        const inventory = await db.Inventory.findAll({
            include: [{ model: db.Product, attributes: ['name', 'description', 'price'] }]
        });
        return res.status(200).json(inventory);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving inventory', error });
    }
});

// Update Inventory (Admin/Manager)
router.post('/', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        // Find inventory for product
        let inventory = await db.Inventory.findOne({ where: { productId } });

        // If no inventory exists, create new record
        if (!inventory) {
            inventory = await db.Inventory.create({ productId, quantity });
        } else {
            // Otherwise, update the quantity
            inventory.quantity += quantity; // Update stock level
            await inventory.save();
        }

        return res.status(200).json({ message: 'Inventory updated successfully', inventory });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating inventory', error });
    }
});

module.exports = router;
