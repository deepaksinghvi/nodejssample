function createModels(mongoose, fn) {
  var Schema = mongoose.Schema;
      //ObjectId = Schema.ObjectId;

  /**
    * Model: TestUser
    */
  TestUser = new Schema({
    'username': String,
    'password': String,
  });
  mongoose.model('TestUser', TestUser);
   fn();
}

exports.createModels = createModels; 