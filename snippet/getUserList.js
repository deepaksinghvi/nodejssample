// User list
app.get('/userlist', function(req, res) {
  TestUser.find({}, function(err, user) {
	user = user.map(function(u) {
      return { username: u.username, password: d.password };
    });
    res.render('user/index.jade', {
      locals: { d: user }
    });
  });
});