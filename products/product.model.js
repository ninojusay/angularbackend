// products/product.model.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        price: { type: DataTypes.FLOAT, allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'deleted'], // Defines the status of the product
            allowNull: false,
            defaultValue: 'active' // Default status is active
        }
    };

    const options = {
        timestamps: true // enable default timestamp fields
    };

    return sequelize.define('Product', attributes, options);
};
