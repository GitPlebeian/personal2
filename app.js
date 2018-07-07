var express = require('express')
var mongoose = require('mongoose')
var passport = require('passport')
var bodyParser = require('body-parser')
var LocalStrategy = require('passport-local')
var passportLocalMongoose = require('passport-local-mongoose')
var striptags = require('striptags');
var User = require('./models/user')

var databaseName = 'personalSite'
mongoose.connect('mongodb://localhost/' + databaseName);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to database: ' + databaseName)
})

var app = express()
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(require('express-session')({
	secret: 'The bacon is not your friend',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs')
app.use(express.static("public"));

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get("/", isLoggedIn, function(req, res) {
	res.render("homepage");
});

app.get('/login', function(req, res) {
	res.render('login')
})

app.post('/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	}),
	function(req, res) {

	}
)
app.get('/signup', function(req, res) {
	res.render('signup', {
		thing: ''
	})
})
app.post('/signup', function(req, res) {
	var tmpUsername = striptags(req.body.username)
	var tmpPassword = striptags(req.body.password)
	var tmpPassword2 = striptags(req.body.password2)

	if (tmpUsername != req.body.username) {
		res.send('You have html tags in your username')
	} else if (tmpPassword != req.body.password) {
		res.send('You have html tags in your password2')
	} else if (tmpPassword2 != req.body.password2) {
		res.send('You have html tags in your password2')
	} else if (req.body.username.length < 5) {
		res.send('Username < 5')
	} else if (req.body.password != req.body.password2) {
		res.send('passwords do not match')
	} else if (req.body.username == req.body.password) {
		res.send('username and password are equal, no no no')
	} else if (req.body.password.length < 6) {
		res.send('password < 6')
	} else if (req.body.username.includes(' ')) {
		res.send('username cant contain spaces')
	} else {
		User.register(new User({
			username: req.body.username
		}), req.body.password, function(err, user) {
			if (err) {
				return res.render('signup', {
					thing: 'Username Taken'
				})
			}
			passport.authenticate('local')(req, res, function() {
				res.redirect('/')
			})
		})
	}
})
app.get('/logout', function(req, res) {
	req.logout()
	res.redirect('/login')
})
app.get('/userInfo', function(req, res) {
	res.send(req.user)
})

app.listen(443, function() {
	console.log("Starting Server");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

function isAdmin(req, res, next) {
	if (req.isAuthenticated() && req.user.powerLevel == 1) {
		return next()
	}
	res.redirect('/login')
}