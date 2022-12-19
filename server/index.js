const express = require('express');
const app = express();
const _ = require('lodash');

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
  socket.on('sendChanges', value => {
    socket.broadcast.emit('getChanges', value);
  });
});

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
