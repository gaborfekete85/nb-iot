var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PushTokenSchema = new Schema({
    deviceId : String,
    token : String
});

PushTokenSchema.methods.from = function(req) {
    this.deviceId = req.body.deviceId;
    this.tokens = req.body.token;
    return this;
};

module.exports = mongoose.model('PushToken', PushTokenSchema);
