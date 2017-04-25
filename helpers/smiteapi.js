var md5 = require('md5');
var request = require('request');

var config = require('../config');
var devid = config.devid;
var authkey = config.authkey;
var apiendpoint = config.apiendpoint;
var timestamp = getUTCTimestamp();

function getUTCTimestamp(){
    var d = new Date();
    timestamp = "";
    timestamp += d.getUTCFullYear();
    timestamp += (d.getUTCMonth() < 10) ? '0' + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1);
    timestamp += (d.getUTCDate() < 10) ? "0" + d.getUTCDate() : d.getUTCDate();
    timestamp += (d.getUTCHours() < 10) ? "0" + d.getUTCHours() : d.getUTCHours();
    timestamp += (d.getUTCMinutes() < 10) ? "0" + d.getUTCMinutes() : d.getUTCMinutes();
    timestamp += (d.getUTCSeconds() < 10) ? "0" + d.getUTCSeconds() : d.getUTCSeconds();
    
    return timestamp;
};

function createSignature(method, callback){
    var signature = devid + method + authkey + timestamp;
    callback(md5(signature));
};

exports.createSession = function(callback){
    createSignature("createsession", function(signature){
        
        var uri = apiendpoint + "createsessionJson/" + devid + "/" + signature + "/" + timestamp;

        request({method: 'GET', uri: uri}, function (err, response, body) {
            callback(err, response, body);
        });
    });
};

exports.testSession = function(callback){
    createSignature("testsession", function(signature){

        var uri = apiendpoint + "testsessionJson/" + devid + "/" + signature + "/" + "03739D2ED5674EA7874DAA7AD2E0879A" + "/" + timestamp;
        
        request({method: 'GET', uri: uri}, function (err, response, body) {
            callback(err, response, body);
        });
    });
};

exports.getGods = function(callback){
    createSignature("getgods", function(signature){
        var uri = apiendpoint + "getgodsJson/" + devid + "/" + signature + "/" + "03739D2ED5674EA7874DAA7AD2E0879A" + "/" + timestamp + "/1";
        
        request({method: 'GET', uri: uri}, function (err, response, body) {
            body = JSON.stringify(JSON.parse(body)[11]);
            callback(err, response, body);
        });
    });
};
// /getgods[ResponseFormat]/{developerId}/{signature}/{session}/{timestamp}