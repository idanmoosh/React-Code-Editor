const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
  title: String,
  link: String,
  content: String,
  solution: String,
});

module.exports = mongoose.model('codeBlock', codeBlockSchema);
