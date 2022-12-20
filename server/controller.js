const codeBlockDBManager = require('./models/mongodb.js');
const router = require('express').Router();

router.get('/cases', async (req, res) => {
  const blocks = await codeBlockDBManager.getBlocks();

  res.json(blocks);
});
router.get('/cases/:case', async (req, res) => {
  const caseLink = req.params;
  const block = await codeBlockDBManager.getBlock(caseLink);

  res.json(block);
});
router.post('/cases/:case', async (req, res) => {
  const caseLink = req.params;
  const value = req.body;

  const updatedBlock = await codeBlockDBManager.updateBlock(caseLink, value);

  res.json(updatedBlock);
});
codeBlockDBManager.getBlocks().then(async items => {
  if (!items.length) {
    await codeBlockDBManager.seedDatabase();
  }
});

module.exports = router;
