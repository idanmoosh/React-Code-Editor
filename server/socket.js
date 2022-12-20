function socket(server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', async socket => {
    console.log(`user ${socket.id} just connected`);

    socket.on('getCase', caseName => {
      const data = 'this is the data loaded';
      socket.join(caseName);
      socket.emit('loadCase', data);
      socket.on('sendChanges', value => {
        socket.broadcast.to(caseName).emit('getChanges', value);
      });
    });
  });
}

module.exports = socket;
