var passport = require('passport');

exports.get = [function(req,res,next){
  var handler = passport.authenticate(
    req.params.type,
    { failureRedirect: '/login' });

  handler(req,res,next);

}, function(req,res){
	res.redirect("/");
}];