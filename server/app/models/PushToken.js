var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PushTokenSchema = new Schema({
    deviceId : String,
    token : string
});

PushTokenSchema.methods.from = function(req) {
    this.deviceId = req.body.deviceId;
    this.token = req.body.token;
    return this;
};

module.exports = mongoose.model('PushToken', PushTokenSchema);