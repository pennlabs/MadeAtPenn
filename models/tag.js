var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var setTag = function(tag) {
  return tag.toLowerCase().trim();
};

var TagSchema = new Schema({
  tag: { type: String, set: setTag, default: '' },
  app_name: { type: String, default: '' }
});

TagSchema.statics = {
  list: function(tagName, cb) {
    this.find({tag: tagName}).exec(cb);
  },
  search: function(string, cb) {
    var regex = new RegExp(string, "i");
    this.distinct('tag', { 'tag': regex }).exec(cb);
  }
};

var tag = mongoose.model("Tag", TagSchema);

module.exports = {
  Tag: tag
};
