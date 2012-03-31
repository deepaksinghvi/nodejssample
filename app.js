//create an app server
var express = require('express'),    
    jade = require('jade'),
    app = module.exports = express.createServer(),
    mongoose = require('mongoose'),
    models = require('./models/model.js'),
    stylus = require('stylus'),
    db,
    TestUser;
	
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }))
  app.use(express.methodOverride());
  app.use(stylus.middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
});

models.createModels(mongoose, function() {
  app.TestUser = TestUser = mongoose.model('TestUser');
  db = mongoose.connect('mongodb://localhost/testdb');
  console.log("Database Started");
})

//set path to the views (template) directory
app.set('views', __dirname + '/views');
//set path to static files
app.use(express.static(__dirname + '/../public'));
//handle GET requests on /
app.get('/', function(req, res){res.render('index.jade', {title: 'Deepak Singhvi'});});


// show new user creationi page.
app.get('/newuser', function(req, res) {
  res.render('user/new.jade', {
    locals: { d: new TestUser()}
  });
});


// User list
app.get('/userlist', function(req, res) {
  TestUser.find({}, function(err, user) {
	user = user.map(function(u) {
      return { username: u.username, password: u.password };
    });
    res.render('user/index.jade', {
      locals: { d: user }
    });
  });
});




// Create user 
app.post('/newuser', function(req, res) {
  var d = new TestUser(req.body.d);
  //console.log(req);
  //console.log(req.body);
  //console.log(d);
  
  d.save(function() {
	TestUser.find({}, function(err, user) {
		user = user.map(function(u) {
		return { username: u.username, password: u.password };
    });
    res.render('user/index.jade', {
      locals: { d: user }
    });
    });
  });
});
app.get('/404', function(req, res) {
  throw new NotFound;
});

app.get('/500', function(req, res) {
  throw new Error('An expected error');
});

app.get('/bad', function(req, res) {
  unknownMethod();
});

//listen on localhost:3000
app.listen(3000);