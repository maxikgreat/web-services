const {Router} = require('express');

const router = Router();

router.post('/hello/:name', (req, res) => {
  const {params: {name}} = req;
  if (!name.match(/^[a-zA-Z]{1,10}$/g)) return res.status(400).end('No valid name');
  res.end(`Hello ${name}`);
});

module.exports = router;