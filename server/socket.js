function socket(server) {
  const io = require('socket.io')(server, {
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
}

module.exports = socket;
