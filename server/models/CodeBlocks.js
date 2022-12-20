const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

const CodeBlocks = new mongoose.Schema({
  _id: String,
  title: String,
  link: String,
  data: String,
  answer: String,
});

module.exports = mongoose.model('CodeBlocks', CodeBlocks);
