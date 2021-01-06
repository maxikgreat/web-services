const {Router} = require('express');
const router = Router();

const values = [];

router.post('/store', (req, res) => {
  const { value } = req.body;
  if (!value) return res.status(400).end('No "value" field found');
  values.push(value);
  res.json(values);
})

module.exports = router;
