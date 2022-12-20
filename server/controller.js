const codeBlockDBManager = require('./models/mongodb.js');

module.exports = async app => {
  app.get('/', async (req, res) => {
    const blocks = await codeBlockDBManager.getBlocks();

    res.json(blocks);
  });
  app.get('/cases/:case', async (req, res) => {
    const caseLink = req.params;
    const block = await codeBlockDBManager.getBlock(caseLink);

    res.json(block);
  });
  app.post('/cases/:case', async (req, res) => {
    const caseLink = req.params;
    const value = req.body;

    const updatedBlock = await codeBlockDBManager.updateBlock(caseLink, value);

    res.json(updatedBlock);
  });
};
