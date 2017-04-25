var config = require('../config');
var devid = config.devid;
var authkey = config.authkey;
var apiendpoint = config.apiendpoint;

var md5 = require('md5');
var request = require('request');

function getTimestamp(callback){
    var currentdate = new Date();
    timestamp = "";
    timestamp += currentdate.getUTCFullYear();
    var month = currentdate.getUTCMonth() + 1;
    if(month <10){ month = "0" + month; }
    timestamp += month;
    timestamp += currentdate.getUTCDate();
    timestamp += currentdate.getUTCHours();
    timestamp += currentdate.getUTCMinutes();
    timestamp += currentdate.getUTCSeconds();
    callback(timestamp);
};

function createSignature(method, callback){
    getTimestamp(function(err, timestamp){
        var signature = devid + method + authkey + timestamp;
        callback(md5(signature), timestamp);
    });
};

exports.createSession = function(callback){
    createSignature("createsession", function(signature, timestamp){
        
        var uri = apiendpoint + "createsessionJson/" + devid + "/" + signature + "/" + timestamp;

        request({method: 'GET', uri: uri}, function (err, response, body) {
            //console.log('error:', error); // Print the error if one occurred 
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            //console.log('body:', body); // Print the HTML for the Google homepage. 
            callback(err, response, body);
        });
    });
};