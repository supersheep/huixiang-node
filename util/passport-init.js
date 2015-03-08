var config = require('config');
var passport = require('passport');
var User = require('services').User;
var WeiboStrategy = require('passport-weibo').Strategy;
var DoubanStrategy = require('passport-douban').Strategy;

passport.use(new WeiboStrategy({
    clientID: config.auth_weibo_key,
    clientSecret: config.auth_weibo_secret,
    callbackURL: config.auth_weibo_callback
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreateByWeiboId(profile.id, function (err, user) {
      return done(err, user);
    });
  }
));


passport.use(new DoubanStrategy({
    clientID: config.auth_douban_key,
    clientSecret: config.auth_douban_secret,
    callbackURL: config.auth_douban_callback
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreateByDoubanId(profile.id, function (err, user) {
      return done(err, user);
    });
  }
));



// passport.use(new LocalStrategy({
//     passReqToCallback: true
// }, function (req, username, password, done) {
//     if (!User) {
//         User = req.services.User;
//     }

//     User.verify(username, password, function(err, user){
//         if(err){
//             return done(null, false, {
//                 message: err
//             });
//         }

//         done(null, user)
//     });
// }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (req, id, done) {
  User.get(id, function (err, user) {
      if (err || !user) {
          return done(null, false);
      }
      done(null, user);
  });
});