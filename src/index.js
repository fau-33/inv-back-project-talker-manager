const express = require('express');
const bodyParser = require('body-parser');
const { readTalker, findById, writeTalker, updateTalker } = require('./talkerFunctions');
const generateToken = require('./generateToken');
const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
// eslint-disable-next-line import/no-unresolved
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Req 1
app.get('/talker', async (_req, res) => {
  const talkers = await readTalker();
  res.status(200).json(talkers);
});

// Req 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await findById(Number(id));
  
  if (talker) return res.status(200).json(talker);

  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// Req 3 and 4
app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

// Req 5
app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const talker = await writeTalker(req.body);
    res.status(201).json(talker);
  },
);

// Req 6
app.put('/talker/:id', 
  validateToken, 
  validateName, validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const { id } = req.params;
  const talker = await updateTalker(Number(id), req.body);

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});