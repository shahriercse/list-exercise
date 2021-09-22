const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

dotenv.config({ path: './config.env' });

const app = require('./app');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

const DB = process.env.DATABASE_URL;

mongoose.connect(DB).then(() => console.log('Database connected successfully'));

const PORT = process.env.PORT || 8270;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
