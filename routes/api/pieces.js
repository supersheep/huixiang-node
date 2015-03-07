var ok = require('okay');

exports.get = function(req, res, next){
	var Piece = req.services.Piece;
	Piece.getRandom(100, ok(next, res.send.bind(res)));
};