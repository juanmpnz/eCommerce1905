const express = require("express");
const app = express();
const db = require("./db");
const routes = require("./routes");

//Auth requirementes
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { User } = require('./models')
const FacebookUser = require('./models/FacebookUser')
const GoogleUser = require('./models/GoogleUser')

//Logging middleware
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

//Bodyparsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Static middleware
app.use(express.static(path.join(__dirname, "/public")));

// Auth
app.use(cookieParser());
app.use(session({ secret: "bootcamp" }));
// Passport
app.use(passport.initialize());
app.use(passport.session());
// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) return done(null, false);
          user
            .hashPassword(password, user.salt)
            .then((hash) =>
              hash !== user.password ? done(null, false) : done(null, user)
            );
        })
        .catch(done);
    }
  )
);

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: "274893610571304",
  clientSecret: "6b627b32109529de1647f01c6d0860dd",
  callbackURL: "http://localhost:1905/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  FacebookUser.findByPk(profile._json.id/1000000000000).then((user)=>{
      if(user)
      {
        return cb(null, user);
      }
      else
      {
        FacebookUser.create({facebookId: profile._json.id/1000000000000, name: profile._json.name}).then((user)=>{
          return cb(null, user);
        })
      }
  })
}
));

app.get('/auth/facebook',
passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
passport.authenticate('facebook', null,),
function(req, res) {
  // Successful authentication
  res.redirect("http://localhost:1905/")
});

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: "570193821321-5d1b6tqpmr8hn6bc3rsvromjro95s37h.apps.googleusercontent.com",
  clientSecret: "9CBtlUlYkaC8KY4PlAc-den7",
  callbackURL: "http://localhost:1905/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  GoogleUser.findByPk(profile.id/1000000000000).then((user)=>{
    if(user)
    {
      return cb(null, user);
    }
    else
    {
      GoogleUser.create({googleId: profile.id/1000000000000, name: profile.displayName}).then((user)=>{
        return cb(null, user);
      })
    }
  })
}
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', null),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:1905/")
  });

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  if(user.id){
    User.findByPk(user.id)
    .then((user) => done(null, user)).catch(done);
  }  
  else{
    if(user.facebookId){
       FacebookUser.findByPk(user.facebookId)
      .then((user) => done(null, user)).catch(done);
    }
    else{
      GoogleUser.findByPk(user.googleId)
      .then((user) => done(null, user)).catch(done);
    }    
  }      
});

//Router middleware
app.use("/api", routes);

//Index rendering middleware
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Error handler endware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

//Server & data base setting
db.sync({ force: false })
  .then(() =>
    app.listen(1905, () => {
      console.log("Server listening on port 1905");
    })
  )
  .catch((err) => console.log(err));
