const express = require('express');
const app = express();

const PORT = 3001;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log(`user ${socket.id} just connected`);
});

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
