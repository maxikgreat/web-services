const {Router} = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const {parseObj} = require('../parsers');

const router = Router();

router.post('/parse', (req, res) => {
  const form = formidable({multiples: true});
  form.parse(req, (err, _, files) => {
    if (err) {
      next(err);
      return;
    }
    if (Object.keys(files).length === 0 || !files.hasOwnProperty('file')) {
      return res.status(400).end('No "file" field found!');
    }

    const file = fs.readFileSync(path.resolve(__dirname, files.file.path), { encoding: 'utf-8' });

    const objects = file.split(';');

    const jsonObj = {};

    objects.forEach((item) => {
      parseObj(jsonObj, item);
    });

    res.json(jsonObj);
  });
})

module.exports = router;
