var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pokeblog Posts' });
  var blog = document.querySelector("#blog");
  var blogprinter = document.querySelector("#blogprinter");
  var submits = document.querySelector("#submits");
  
  submits.addEventListener("click", blogSubmit);
  submits.addEventListener("Enter", blogSubmit);
  submits.addEventListener("Enter", console.log('Enter worked'));
  submits.addEventListener("click", console.log('click worked'));

  function blogSubmit(){
    blogprinter.innerHTML = `${blog.value}`;
  }
  console.log(blog.value);

});

module.exports = router;
