const {Router} = require('express');

const router = Router();

router.get('/info', (req, res) => res.json({author: '24059'}));

module.exports = router;