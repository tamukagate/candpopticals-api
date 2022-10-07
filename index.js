const express = require('express');
const app1 = express();
app1.disable('x-powered-by');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connection successful'))
  .catch((err) => {
    console.log(err);
  });

app1.use(express.json());
app1.use('/api/auth', authRoute);
app1.use('/api/products', productRoute);
app1.use('/api/users', userRoute);

app1.listen(process.env.PORT || 5000, () => {
  console.log('Backend server is running');
});
