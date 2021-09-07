const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE_URL;

mongoose.connect(DB).then(() => console.log('Database connected successfully'));

const PORT = process.env.PORT || 8270;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
