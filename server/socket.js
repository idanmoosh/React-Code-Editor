const { updateBlock } = require('./models/mongodb.js');
const codeBlockDBManager = require('./models/mongodb.js');

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

    socket.on('getCase', async caseName => {
      const block = await codeBlockDBManager.getBlock(caseName.case);

      socket.join(caseName.case);

      socket.emit('loadCase', block[0]);
    });
    socket.on('sendChanges', async (value, caseName) => {
      await codeBlockDBManager.updateBlock(caseName.case, value);
      socket.broadcast.to(caseName.case).emit('getChanges', value);
    });
  });
}

module.exports = socket;
