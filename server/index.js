const express = require('express');
const app = express();
const socket = require('./socket');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const controller = require('./controller');

URI =
  'mongodb+srv://idanmoosh:idanmoosh123@cluster0.w5hg68l.mongodb.net/?retryWrites=true&w=majority';

const http = require('http').Server(app);
const cors = require('cors');
require('dotenv').config();

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('strictQuery', true);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Atlas database connection established successfully');
});

app.use(express.json());
app.use(
  cors({
    origin: 'https://react-code-editor-front.onrender.com',
  })
);
app.use(controller);

socket(http);

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
