var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('coplayer', { 
    pageTitle: 'CoPlayer',
    headerTitle: 'CoPlayer' });
});

module.exports = router;