var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	name: String,
    provider: {type: String, enum: ['FACEBOOK','GOOGLE']},
    id : String,
    last_login_dt : { type: Date, default: Date.now }
});

UserSchema.methods.from = function(req) {
  this.name = req.body.name;
  this.provider = req.body.provider;
  this.id = req.body.id;
  return this;
};

module.exports = mongoose.model('User', UserSchema);
