// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var querystring = require('querystring');
var app = express();
var morgan = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8000; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/locator'); // connect to our database
var Coordinate = require('./app/models/coordinate');
var PushToken = require('./app/models/PushToken');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

router.route('/notify')
    .post(function (req, res) {
      console.log('Device: ' + req.body.deviceId);
      PushToken.find(function (err, tokens) {
        handleError(err, res);

          var postTokens = [];
          for (var i = 0; i < tokens.length ; i++) {
              postTokens.push(tokens[i].token);
          }

          var post_data = {
              "tokens" : postTokens,
              "profile": "dev",
              "notification": {
                  "message" : req.body.deviceId + " alarm on"
              }
          };

          var post_options = {
              "host": "api.ionic.io",
	      "port": 443,
              "path": "/push/notifications",
              "method": "POST",
              "headers": {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTI0YWE5OS1jY2Q3LTRiY2ItYTZmMS00NTUwOTRmMzc4OGYifQ.qMwuWmSeFJG8aFcBjVaExj101MkL-NDQABgCmPJ7UqI"
              }
          };

          // Set up the request
          var post_req = http.request(post_options, function(res) {
              res.setEncoding('utf8');
              res.on('data', function (chunk) {
                  console.log('Response: ' + chunk);
              });
          });
	    
	console.log(post_data);
	console.log(post_options);

          // post the data
          post_req.write(post_data);
          post_req.end();

//          res.json(tokens);
      });
    });

router.route('/token')
    .post(function (req, res) {
      console.log('Device: ' + req.body.deviceId);
      console.log('Token: ' + req.body.token);

      PushToken.findOneAndUpdate({ 'deviceId' :  req.body.deviceId }, req.body, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        PushToken.find(function (err, token) {
          handleError(err, res);
          res.json(token);
        });
      });
    })

    .get(function (req, res) {
      PushToken.find(function (err, tokens) {
        handleError(err, res);
        res.json(tokens);
      });
    })

    .delete(function (req, res) {
      console.log(req.body);
      PushToken.findOneAndRemove({'_id' : req.body.id}, function (err,offer){
        return res.send("Succesfully deleted: " + req.body.id);
      });
    });


router.route('/coords')
    .post(function (req, res) {
      console.log('Device: ' + req.body.deviceId);
      console.log('Longitude: ' + req.body.longitude);
      console.log('Latitude: ' + req.body.latitude);

      Coordinate.findOneAndUpdate({ 'deviceId' :  req.body.deviceId }, req.body, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        Coordinate.find(function (err, coordinates) {
            handleError(err, res);
            res.json(coordinates);
        });
      });



    })
    .get(function (req, res) {
      Coordinate.find(function (err, coordinates) {
        handleError(err, res);
        res.json(coordinates);
      });
    })
    .delete(function (req, res) {
      console.log(req.body);
      Coordinate.findOneAndRemove({'_id' : req.body.id}, function (err,offer){
        return res.send("Succesfully deleted: " + req.body.id);
      });

    });

function handleError(err, res) {
  if (err) {
    console.log(err);
    res.send(err);
  }
}

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
