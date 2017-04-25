var express = require('express');
var router = express.Router();
var app = require('../app');

router.get('/session', function(req, res, next){
    var apihelper = require('../helpers/smiteapi');
    apihelper.createSession(function(err, response, body){
        if(err) return next(err);
        res.render('test', { content: body});
    });
});

module.exports = router;