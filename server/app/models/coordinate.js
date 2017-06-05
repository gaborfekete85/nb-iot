var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CoordinateSchema = new Schema({
    deviceId : String,
    longitude : Number,
    latitude : Number
});

CoordinateSchema.methods.from = function(req) {
    this.deviceId = req.body.deviceId;
    this.longitude = req.body.longitude;
    this.latitude = req.body.latitude;
    return this;
};

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users
CoordinateSchema.methods.default = function() {
    // add some stuff to the users name
    this.longitude = 0;
    this.latitude = 0;
    return this;
};

module.exports = mongoose.model('Coordinate', CoordinateSchema);
