// products/product.service.js

const db = require('../_helpers/db'); // Adjusted path
const Product = db.Product;

async function create(productData) {
    const product = await Product.create(productData); // Use create method directly
    return product;
}

module.exports = {
    create,
    // other functions
};
