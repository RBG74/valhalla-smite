module.exports = {
    'database': 'mongodb://localhost:27017/valhalla',
    'secret': 'forearm confrontational airspace',
    'createAdmin': function(){
        var User = require('./models/user');
        User.findOne({ 'username': 'Admin' }, function (err, admin) {
            if(err){
                return next(err);
            } 
            if(!admin){
                new User({ 
                    username: 'Admin', 
                    password: config.adminPassword,
                    isAdmin: true 
                }).save(function(err) {
                    if (err) throw err;
                });
            }
        });
    },
    'devid': '1340',
    'authkey': 'F8EC16EAA851401DA626E4B90DA30086',
    'apiendpoint': 'http://api.smitegame.com/smiteapi.svc/',
};