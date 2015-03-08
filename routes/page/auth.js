var passport = require('passport');

exports.get = [function(req,res,next){
	if(req.user){
		res.render('logged');
	}
	passport.authenticate(req.params.type)(req, res, function(err){
		if(err){
			console.log(err);
			res.render('logged',{
				err: err
			});
		}else{
			res.render('logged');
		}
	});
}];