const express = require('express');
const app = express();
const socket = require('./socket');
const mongodb = require('./models/mongodb');
const PORT = process.env.PORT || 3001;

const http = require('http').Server(app);
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(mongodb);

//Routes

//get all codeblocks

socket(http);

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
