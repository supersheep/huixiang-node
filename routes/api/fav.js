var async = require('async');
var ok = require('okay');

exports.post = function(req,res,next){
	if(!req.user){return res.send(403,"not logged");}
	var Fav = req.services.Fav;

	var userId = req.user.id;
	var pieceId = req.body.pieceid;

	async.waterfall([
		function(done){
			Fav.faved(userId, pieceId, done);
		},
		function(faved, done){
			console.log("faved?", faved);
			if(faved){return done();}
			Fav.fav(userId, pieceId, done);
		}
	], ok(next, function(){
		res.send({id: pieceId});
	}));
}