const mongoose = require('mongoose');

const CodeBlocks = new mongoose.Schema({
  _id: String,
  data: Object,
  answer: Object,
});

module.exports = mongoose.model('CodeBlocks', CodeBlocks);
