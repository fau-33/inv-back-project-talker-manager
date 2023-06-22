const express = require('express');
const { readTalker } = require('./talkerFuntions');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Req 1
app.get('/talker', async (_req, res) => {
  const talkers = await readTalker();
  if (talkers.length === 0) return res.status(200).json([]);
  res.status(200).json(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
