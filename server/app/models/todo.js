var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TodoSchema   = new Schema({
	description: String,
	isComplete : Boolean,
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

TodoSchema.methods.from = function(req) {
  this.description = req.body.description;
  this.isComplete = req.body.isComplete;
  this.responsible = req.body.responsible;
  return this;
};

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users
TodoSchema.methods.default = function() {
  // add some stuff to the users name
  this.isComplete = false;
  return this;
};

module.exports = mongoose.model('Todo', TodoSchema);
