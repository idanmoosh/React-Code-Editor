const codeBlock = require('./mongooseSchema.js');

class codeBlockDBManager {
  async getBlocks() {
    try {
      return await codeBlock.find({});
    } catch (err) {
      console.log(err.message);

      return [];
    }
  }

  async getBlock(link) {
    try {
      return await codeBlock.find({ link: link });
    } catch (err) {
      console.log(err.message);
    }
  }

  async updateBlock(link, content) {
    try {
      await codeBlock.findOneAndUpdate({ link: link }, { content: content });

      console.log('block updated');
    } catch (err) {
      console.log(err.message);
    }
  }

  async seedDatabase() {
    blocks = [
      {
        title: 'async case',
        link: 'async_case',
        content: 'console.log("async case")',
        solution: 'console.log("async case")',
      },
      {
        title: 'db case',
        link: 'db_case',
        content: 'console.log("db case")',
        solution: 'console.log("db case")',
      },
      {
        title: 'server case',
        link: 'server_case',
        content: 'console.log("server case")',
        solution: 'console.log("server case")',
      },
      {
        title: 'socket case',
        link: 'socket_case',
        content: 'console.log("socket case")',
        solution: 'console.log("socket case")',
      },
    ];

    try {
      await codeBlock.insertMany(blocks);

      console.log('database seeded');
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = new codeBlockDBManager();
