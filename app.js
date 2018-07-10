var express = require('express');
global.app = express();
var config = require('./config');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
global.jwt    = require('jsonwebtoken');
var methodOverride = require('method-override');
var cors=require('cors');
var nodemailer = require('nodemailer');
var multer = require('multer');

global.upload = multer({ dest: './public/images'});
app.set('superSecret', config.secret); // secret variable
//var config = require('config'); // get our config file
var Authenticates = require('./routes/Authenticates');
//var Tasks=require('./routes/Tasks');
var Countries=require('./routes/Countries');
var Cities=require('./routes/Cities');
var EnrollMethods = require('./routes/EnrollMethods');
var Exercises = require('./routes/Exercises');
var ExerciseEnrolls = require('./routes/ExerciseEnrolls');
var ExerciseResults = require('./routes/ExerciseResults');
var Grades = require('./routes/Grades');
var index = require('./routes/index');
var Languages = require('./routes/Languages');
var Lessons = require('./routes/Lessons');
var LessonEnrolls = require('./routes/LessonEnrolls');
var Parents = require('./routes/Parents');
var ParntTransactions = require('./routes/ParntTransactions');
var PaymentMethods = require('./routes/PaymentMethods');
var Subjects = require('./routes/Subjects');
var Schools = require('./routes/Schools');
var Students = require('./routes/Students');
var StdTransactions = require('./routes/StdTransactions');
var TranTypes = require('./routes/TranTypes');
var TranStatus = require('./routes/TranStatus');
var Units = require('./routes/Units');
var users = require('./routes/users');
var UserTypes = require('./routes/UserTypes');
var Resellers = require('./routes/Resellers');
var ResellerUsers = require('./routes/ResellerUsers');
var Transactions = require('./routes/Transactions');
var UnitEnrollments = require('./routes/UnitEnrollments');
var Vouchers = require('./routes/Vouchers');
var StdEWallets = require('./routes/StdEWallets');
var ParntEWallets = require('./routes/ParntEWallets');
var DeviceCheck = require('./routes/DeviceCheck');
// var options = {
//     service_id: "9e2bbe66ba0547ead413e49bef815dd0", // public service ID
//     secret:     "0d9896bfb72ab4e8cff107c73020076d"  // secret service token
// }				
// view engine setup

// view engine setup


app.use(express.static(path.join(__dirname,'public/dist')));

// var FortumoSMSServer = require("./node_modules/fortumo/lib/fortumo").FortumoSMSServer;

// var options = {
//     service_id: "9e2bbe66ba0547ead413e49bef815dd0", // public service ID
//     secret:     "0d9896bfb72ab4e8cff107c73020076d"  // secret service token
// }

// var fortumo = new FortumoSMSServer(options);
// fortumo.listen(8000);

// fortumo.on("sms", function(sms, response){
//     console.log(sms); // outputs the sms data to the console
//     response("received!");
// });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', config.secret); // secret variable

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/deviceIdCheck', DeviceCheck);
app.use('/authenticate',Authenticates);
app.use('/units',Units);
app.use('/subjects',Subjects);
app.use('/exerciseresults', ExerciseResults);
app.use('/grades',Grades);
app.use('/cities',Cities);
app.use('/countries',Countries);
app.use('/enrollmethods',EnrollMethods);
app.use('/exercises',Exercises);
app.use('/exerciseenrolls', ExerciseEnrolls);
app.use('/languages',Languages);
app.use('/lessons',Lessons);
app.use('/lessonenrolls', LessonEnrolls);
app.use('/parents',Parents);
app.use('/parnt',ParntTransactions);
app.use('/paymentmethods', PaymentMethods);
app.use('/parntewallets',ParntEWallets);
app.use('/students',Students);
app.use('/schools',Schools);
app.use('/std', StdTransactions);
app.use('/trantypes',TranTypes);
app.use('/transtatus',TranStatus);
//app.use('/Tasks',Tasks);
app.use('/users', users);
app.use('/usertypes',UserTypes);
app.use('/resellers', Resellers);
app.use('/resellerusers',ResellerUsers);
app.use('/transactions', Transactions);
app.use('/unitenrollments',UnitEnrollments);
app.use('/vouchers', Vouchers);
app.use('/stdewallet', StdEWallets);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// var fortumo = new FortumoSMSServer(options);
// fortumo.listen(8100);

// fortumo.on("sms", function(sms, response){
//     console.log(sms); // outputs the sms data to the console
//     response("received!");
// });

module.exports = app;
