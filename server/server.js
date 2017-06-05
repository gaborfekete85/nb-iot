// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
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
var Todo = require('./app/models/todo');
var User = require('./app/models/user');
var Coordinate = require('./app/models/coordinate');

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

router.route('/coords')
    .post(function (req, res) {
      console.log('Device: ' + req.body.devideId);
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
router.route('/user')

  // create a bear (accessed at POST http://localhost:8080/bears)
  .post(function (req, res) {
      console.log('provider: ' + req.body.provider);
      console.log('name: ' + req.body.name);
      console.log('id: ' + req.body.id);

      User.find({'provider' :  req.body.provider, 'id' : req.body.id}, function (err, dbUser) {
      handleError(err, res);
      console.log('dbUser: ' + dbUser);
      if( dbUser == '') {
        var user = new User().from(req);		// create a new instance of the Todo model
        user.save(function (err) {
          handleError(err, res);
          res.json(user);
        })
      }
    })
  })
  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function (req, res) {
    User.find(function (err, todos) {
      handleError(err, res);
      res.json(todos);
    });
  })

  // delete the bear with this id
    .delete(function (req, res) {
        User.remove({}, function (err, bear) {
          if (err)
            res.send(err);
          res.json({});
        })
    });

// on routes that end in /bears
// ----------------------------------------------------
router.route('/todos')

  // create a bear (accessed at POST http://localhost:8080/bears)
  .post(function (req, res) {
    var todo = new Todo().from(req);		// create a new instance of the Todo model
    todo.default().save(function (err) {
      handleError(err, res);
      res.json(todo);
    });
  })

  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function (req, res) {
    Todo.find({})
      .populate('responsible')
      .exec(function (err, todos) {
        handleError(err, res);
        res.json(todos);
      });
  });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/todos/:todo_id')

  // get the bear with that id
  .get(function (req, res) {
    Todo.findById(req.params.todo_id)
      .populate('responsible')
      .exec(function (err, todo) {
        handleError(err, res);
        res.json(todo);
      });
  })

  // update the bear with this id
  .put(function (req, res) {
    Todo.findById(req.params.todo_id)
      .populate('responsible')
      .exec(function (err, todo) {
        handleError(err, res);
        todo.from(req).save(function (err) {
          handleError(err, res);
          res.json(todo);
        });
      });
  })

  // delete the bear with this id
  .delete(function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
      Todo.remove({
        _id: req.params.todo_id
      }, function (err, bear) {
        if (err)
          res.send(err);

        res.json(todo);
      })
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
