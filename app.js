var express       = require('express');
var app           = module.exports = express();
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var port          = process.env.PORT || 3000;
var config        = require('./config');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.set('env', 'development');

app.set('views', __dirname + '/views');
app.engine('hbs', require('hbs').__express);
app.set('view engine', 'hbs');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
//config.createAdmin();

//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(require('./controllers'));

require('./middlewares/errorHandler')(app);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});