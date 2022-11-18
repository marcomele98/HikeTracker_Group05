'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult, validator, body } = require('express-validator'); // validation middleware
const cors = require('cors');
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const crypto = require('crypto');


const User = require('./Services/user');
const user = new User;

const {HikeDescription , HikesView}  = require('./Services/hike');
const {ParkingLotsDescription} = require('./Services/parkin_lots');
const parkin_lot = new ParkingLotsDescription;
const hike = new HikeDescription;
const hikeviews = new HikesView;

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
  function (username, password, done) {
    user.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Username and/or password wrong. Try again.' });
      return done(null, user);
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  user.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Format express-validate errors as strings
  return `${location}[${param}]: ${msg}`;
};

// init express
const app = express();
const port = 3001;



// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));




// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'Capuvulata',
  resave: false,
  saveUninitialized: false
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());


// POST /sessions 
// login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});



// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});



// API



app.post('/api/hike', isLoggedIn, (req, res) => {
    return hike.newHikeDescription(req, res);
});

app.get('/api/hikes', (req, res) => {
  return hikeviews.getAllHikes(req,res);}
);

app.get('/api/hike/:hikeId', (req, res) => {
  return hikeviews.getHikeById(req,res);}
);

app.get('/api/parkingLots', (req, res) => {
  return parkin_lot.getAllParking_lots(req,res);}
);

app.get('/api/parkingLot/:parkingLotId', (req, res) => {
  return parkin_lot.getParkingLotById(req,res);}
);

// Registration form backend validation

const validationBodyRules = [
  body('name', 'name is required').notEmpty(),
  body('surname', 'surname is required').notEmpty(),
  body('role', 'role is not on the list of possible roles').isIn(['local guide', 'hiker', 'hut worker', 'platform manager']),
  body('password', 'password is required').notEmpty(),
  body('email', 'email format is wrong').isEmail(),
  body('phone_number', 'phone number is required').notEmpty(),
];

const checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  next()
};


// POST to register new user
app.post('/api/register', validationBodyRules, checkRules, async (req, res) => {
  try {
    await user.registerUser(req.body);
    res.status(201).end();
  } catch(err) {
    console.log(err);
    if(err.includes("SQLITE_CONSTRAINT")) {
      res.status(400).json({error: `The user is already registered`});
    } else {
      res.status(500).json({error: `Database error during the registration`});
    }
  }
});




// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
