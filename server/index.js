const express = require('express');
const app = express();
const socket = require('./socket');
const pool = require('./db');
const PORT = process.env.PORT || 3001;

const http = require('http').Server(app);
const cors = require('cors');

app.use(express.json());
app.use(cors());

//Routes

//get all codeblocks

app.get('/', async (req, res) => {
  try {
    const allCodeBlocks = await pool.query('SELECT * FROM codeblocks');
    res.json(allCodeBlocks.rows);
  } catch (error) {
    console.error(error.massage);
  }
});

//get codeblock
app.get('/cases/:codeblock', async (req, res) => {
  try {
    const { link } = req.params;
    const codeBlock = await pool.query(
      'SELECT * FROM codeblocks WHERE link = $1 ',
      [link]
    );
    res.json(codeBlock.rows[0]);
  } catch (error) {
    console.error(error.massage);
  }
});
//update codeblock
app.put('/cases/:codeblock', async (req, res) => {
  try {
    const { link } = req.params;
    const { code } = req.body;
    const updateCodeBlock = await pool.query(
      'UPDATE codeblock SET content = $1 WHERE link = $2 ',
      [code, link]
    );
    res.json('block updated');
  } catch (error) {
    console.error(error.massage);
  }
});

socket(http);

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
