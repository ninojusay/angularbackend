// inventory/inventory.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Inventory', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products', // Ensure this matches the actual Products table name
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    }, {
        tableName: 'Inventories',
        timestamps: false, // Change to true if you want automatic timestamps
    });
};
