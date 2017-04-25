var express = require('express');
var router = express.Router();
var app = require('../app');

router.use('/api', require('./apiController'));

router.get('/', function(req, res){
    res.render('index', {
        title: 'Valhalla'
    });
});

module.exports = router;