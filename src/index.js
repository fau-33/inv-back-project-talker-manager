const express = require('express');
const bodyParser = require('body-parser');
const { readTalker, findById } = require('./talkerFunctions');
const generateToken = require('./generateToken');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

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

// Req 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await findById(Number(id));
  if (talker) return res.status(200).json(talker);
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// Req 3
app.post('/login', async (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

// Req 3 and 4 /
app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
