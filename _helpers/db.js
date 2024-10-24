// _helpers/db.js

const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const db = {}; // Define the db object here
module.exports = db;

initialize();

async function initialize() {
    try {
        // create db if it doesn't already exist
        const { host, port, user, password, database } = config.database;
        const connection = await mysql.createConnection({ host, port, user, password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        await connection.end(); // Close the connection after creating the database
        
        // connect to db
        const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
        
        // init models and add them to the exported db object
        db.Account = require('../accounts/account.model')(sequelize);
        db.Activity = require('../accounts/activity.model')(sequelize);
        db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
        db.Product = require('../products/product.model')(sequelize);
        db.Inventory = require('../inventory/inventory.model')(sequelize);

        // Define relationships
        db.Product.hasOne(db.Inventory, { foreignKey: 'productId', onDelete: 'CASCADE' });
        db.Inventory.belongsTo(db.Product, { foreignKey: 'productId' });

        db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
        db.RefreshToken.belongsTo(db.Account);
        
        // Sync all models with the database
        await sequelize.sync({ force: true }); // Set force: true to recreate tables if they exist
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to initialize the database:', error);
    }
}
