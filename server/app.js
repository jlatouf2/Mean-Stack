// dependencies
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    localStrategy = require('passport-local' ).Strategy;
//var io = require('socket.io')(server);
//var server = require('http').Server(app);

// mongoose
mongoose.connect('mongodb://localhost/mean-auth-goodapp');

// user schema/model
var User = require('./models/user.js');
var Post = require('./models/post.js');
var Store = require('./models/storelocation.js');

// create instance of express
var app = express();

// require routes
var routes = require('./routes/api.js');

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// configure passport
passport.use(new localStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

	passport.serializeUser(function(user, done) {
		done(null, user.id);
		console.log('LSKDFJLSKJDFLKSJLDFKJSLKFJDSLJFFFFFFFFFFFFFFFFFFF' +user)
	//	console.log('LSKDFJLSKJDFLKSJLDFKJSLKFJDSLJFFFFFFFFFFFFFFFFFFF' +req.session.passport.user)

		 	//	req.session.passport.user

		/*
		 * to solve issue of having userdata variable be on when you save user info with seralization:
		 * go to a new page ang user $rootScope.userdata = data; there.
		 */
	});

	passport.deserializeUser(function(id, done) {
		User.findOne(
			{_id: id},
			'-password',
			function(err, user) {
				done(err, user);
			}
		);
	});

/*
app.use(session({
  store: new RedisStore({
    client: redis
  }),
  secret: 's3cret',
  resave: true,
  saveUninitialized: true
}));
*/


app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));


app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/index.html' }),
        function(req, res) {
            res.redirect('/#/register');
app.get('/confirm-login');
	/*
	    //     user : req.user // get the user out of session and pass to template
         //	sess=req.session;	
	//sess.data=req.user;

            res.cookie('userblog', JSON.stringify({
        'username': user
        //'role': role

	 */
        });
        
        /*
         * to coordinate facebook login with regular login using passport (determine if use is logged in already)
         * just make sure that facebook login button checks for something like userId or name before going to the
         * href ="facebook/login" part of the link.....
         * THIS WILL WORK!
         */

passport.use(new FacebookStrategy({
            clientID: '1508673329451547',
            clientSecret: 'c42fb352fa1a185823ddd34f6267551c',
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'link',  'photos', 'emails']

        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
          //     User.findOne({'facebook.id' : profile.id, 'facebook.name' : profile.name, 'facebook.email' : profile.email}, function (err, user) {
         User.findOne({'facebook.email' : profile.email}, function (err, user) {

                    console.log(profile);
                    if (err) return done(err);
                    if (user) {
                     return   done(null, user);
                    } else {
                        var newUser = new User();
  newUser.username = profile.emails[0].value;
                        newUser.facebook.token = accessToken;
                        newUser.facebookprofileUrl = profile.profileUrl;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.fbid = profile.id;
                        newUser.facebook.displayName = profile.displayName;
                        newUser.firstname =profile.name.givenName;
                        newUser.lastname=profile.name.familyName;
                                       console.log('ACCESSTOKEN' + accessToken) 
                                   console.log('EMAIL' + profile.emails[0].value)       	  
      	  /*
      	   * IF SOMETHING IS WRONG: TURN ALL newUser back to user
      	   */
                           newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                    }
                });
            });
        }
    ));



app.get('/confirm-login', function (req, res) {
	user = req.user
	res.send(user);
	
    });








app.get('/logout333', function(req, res, sess) {
        req.logout();
       // sess.destroy
        //       delete req.sess; // delete the password from the session
      //  req.sess = user;  //refresh the session value

        res.redirect('/');
    });



// routes
app.use('/user/', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;
