const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Enabled on port ${PORT}...`);
});