const express = require('express');
const app = express();
//const routes = require('./routes');
const sequelize = require("sequelize")

const PORT = process.env.port || 3000;

app.use(express.json());

app.get('/', (req, res) => {               
  res.send('Hello, world!');               
});

app.listen(PORT, () => {                   
  console.log(`Server is running on http://localhost:${PORT}`);
});