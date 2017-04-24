var express = require('express');
var router = express.Router();
var app = require('../app');

//router.use('/comments', require('./comments'));

router.get('/', function(req, res) {

    var apihelper = require('../helpers/smiteapi');
    apihelper.createSession('createsession', function(signature){
        res.render('index', {
            title: 'Valhalla'
        });
    });
    
});

module.exports = router;