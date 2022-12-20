const express = require('express');
const app = express();
const socket = require('./socket');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const controller = require('./controller');

const http = require('http').Server(app);
const cors = require('cors');
require('dotenv').config();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Atlas database connection established successfully');
});

app.use(express.json());
app.use(cors());

socket(http);

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
controller(app);
