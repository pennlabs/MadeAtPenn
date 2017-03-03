var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: { type: String, default: '', trim: true },
  password: { type: String, default: '', trim: true },
  approved: { type: Number, default: 1 },
});

var user = mongoose.model("User", UserSchema);

module.exports = {
  User: user
};
