var ok = require('okay');
var db = require('db');
exports.getByPieceId = function(pieceId, callback){
  db
  	.select("avatar","user.id")
  	.from("fav")
  	.where({"fav.pieceid":pieceId})
  	.join("user","user.id","=","fav.userid")
		.exec(ok(callback, function(favs){
			callback(null, favs);
		}));
};