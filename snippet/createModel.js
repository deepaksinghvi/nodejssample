models.createModels(mongoose, function() {
  app.TestUser = TestUser = mongoose.model('TestUser');
  db = mongoose.connect('mongodb://localhost/testdb');
  console.log("Database Started");
})