// server.js

require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// API routes
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/api/accounts', require('./accounts/activity.controller')); // Ensure this is correctly registered
app.use('/api/products', require('./products/products.controller')); // Add product routes here
// Add inventory routes
app.use('/api/inventory', require('./inventory/inventory.controller'));

app.use('/api-docs', require('_helpers/swagger')); // Swagger docs route

// Global error handler
app.use(errorHandler);

// Start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
