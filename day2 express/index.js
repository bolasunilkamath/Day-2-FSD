const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    console.log(req);
  res.send('Hello, Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});