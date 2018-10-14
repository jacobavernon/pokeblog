var express = require('express');
var router = express.Router();


const users = [
  {
    1: {
      name: 'marquitos',
      occ: 'is a noob, does not slay',
    }
  }
]

/* GET users listing. */
router.get('/:id', (req, res) => {
  // res.render('users'), {
  //   id: users[req.params.id].name
  // }
  res.send('users')
});

module.exports = router;
