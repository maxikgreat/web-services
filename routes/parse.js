const {Router} = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const router = Router();

const createObj = (obj, string) => {
  const components = string.split(':');

  const key = components.shift();
  const number = components.join(':');

  if (!isNaN(parseInt(number))) {
  	return obj[key] = number;
  } else if (number.search(',') !== -1) {
    const componentsDeep = number.split(',');
    const objInner = {};
    componentsDeep.forEach(item => {
      const [keyDeep, numberDeep] = item.split(':');
      objInner[keyDeep] = numberDeep;
      obj[key] = objInner;
    })
  } else {
    const [keyDeep, numberDeep] = number.split(':');
    const objInner = {
      [keyDeep]: numberDeep,
    };
    obj[key] = objInner;
  }
  
}


router.post('/parse', (req, res) => {
  const form = formidable({multiples: true});
  form.parse(req, (err, _, files) => {
    console.log(files)
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
      createObj(jsonObj, item);
    });

    res.json(jsonObj);
  });
})

module.exports = router;