const express = require('express');

const PORT = 3001;

const app = express();

app.use(express.json());

// routes

app.use(require('./routes/info'));
app.use(require('./routes/hello'));
app.use(require('./routes/store'));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Enabled on port ${PORT}...`);
});