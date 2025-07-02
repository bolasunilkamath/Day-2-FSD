const express = require('express');
const  pool = require('./db');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.get('/info', (req, res) => {
    res.status(200)
       .set('Custom-Header', 'Example')
       //.json({ message: 'Response object demo' })
       .redirect('/user');
});
app.get('/user', (req, res) => {
    console.log(req.method);    // GET
    console.log(req.url);       // /user
    console.log(req.headers);   // Request headers

    res.send('User Info Received');
});
app.get('/greet', (req, res) => {
    const name = req.query.name || 'Guest'; // Default to 'Guest' if no name is provided
    res.send(`Hello, ${name}!`);
});
app.get('/greetback', (req, res) => {
    console.log(req.query); 
    res.send(req.query);
});
app.get('/student/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID is ${userId}`);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Middleware to parse JSON
//app.use(express.json());
app.post('/login', (req, res) => {
    console.log(req.body); // { username: "John", password: "1234" }
    res.send(req.body);
})
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});