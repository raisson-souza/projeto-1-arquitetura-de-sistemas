import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Projeto 1 - Arquitetura de Sistemas');
});

app.listen(port, () => {
  return console.log(`Express listening on http://localhost:${port}`);
});
