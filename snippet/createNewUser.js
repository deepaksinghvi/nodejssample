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