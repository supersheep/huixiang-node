var db = require('db');
var ok = require('okay');

exports.post = function(req,res,next){
	if(!req.user){return res.send(403,"not logged");}
	var Fav = req.services.Fav;
	var pieceId = req.body.pieceid;
	var userId = req.user.id;


	Fav.unfav(userId, pieceId, ok(next, function(piece){
		res.send("ok");
	}));

}