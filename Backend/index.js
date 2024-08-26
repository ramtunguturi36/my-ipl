const express = require('express');
const cors = require('cors'); // middleware
const connectToMongo = require('./db');
const homeRoute = require('./routes/HomeRoute');
const userRoute = require('./routes/UserRoute');
const newsRoute = require('./routes/NewsRoute');
connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', homeRoute);

app.use('/api/user', userRoute);
app.use('/api', newsRoute); 

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
