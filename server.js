const express = require('express');

const infoRouter = require('./routes/info');
const helloRouter = require('./routes/hello');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(infoRouter);
app.use(helloRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Enabled on port ${PORT}...`);
});