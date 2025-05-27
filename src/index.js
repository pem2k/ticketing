const express = require('express');
const app = express();
const router = require('./routes/router.js');
const sequelize = require("sequelize")

const PORT = process.env.port || 3000;
app.use('/', router);


app.listen(PORT, () => {                   
  console.log(`Server is running on http://localhost:${PORT}`);
});