const express = require('express');
const app = express();
const port = 3000;
const connectToMongoDB = require("./mongodb");
app.use(express.json());

// Route import
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const loginRoutes = require('./routes/login');
const users = require('./models/users');

app.use('/users', userRoutes);      // This tells express to use everything exported from ./routes/users for any URL that starts with /users
app.use('/products', productRoutes);    // This tells express to use everything exported from ./routes/products for any URL that starts with /products
app.use('/orders', orderRoutes);        // This tells express to use everything exported from ./routes/orders for any URL that starts with /orders
app.use('/login', loginRoutes);

connectToMongoDB();

app.listen(port, () => {
    console.log(`E-commerce API running on http://localhost:${port}`);
});