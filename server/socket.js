function socket(server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', async socket => {
    let socketsList = [];
    socketsList.push(socket.id);

    console.log(`user ${socket.id} just connected`);

    socket.on('getCase', caseName => {
      const data = 'this is the data loaded';
      socket.join(caseName.case);

      socket.emit('loadCase', data);
    });
    socket.on('sendChanges', (value, caseName) => {
      socket.broadcast.to(caseName.case).emit('getChanges', value);
    });
  });
}

module.exports = socket;
