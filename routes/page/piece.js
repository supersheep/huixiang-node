var ok = require('okay');
var async = require('async');

exports.get = function(req,res,next){
	var Piece = req.services.Piece;
	var Fav = req.services.Fav;

	var pieceId = req.params.id;
  var user = req.user;
  var userId = user ? user.id : 0;

  async.parallel([
  	function(done){
  		Piece.get(pieceId, done);
  	},
  	function(done){
  		Fav.getByPieceId(pieceId, done);
  	}
	], ok(next, function(results){
		var piece = results[0];
		var favers = results[1];
		if(!piece){return next();}

	  piece.pics = piece.pics ? piece.pics.split(",") : null;

	  res.render('piece', {
	  	piece: piece,
	  	favers: favers,
	  	liked: favers.some(function(faver){
	  		return faver.id == userId;
	  	}),
	  	fav_count: favers.length
	  });
	}));

  // work_id = cur_piece["work"]
  // work = work_model.get_by_id(work_id)
  // cur_piece["work_title"] = work and work["title"] or None

  // author_id = cur_piece["author"]
  // print "authorid" + str(author_id)
  // author = author_model.get_by_id(author_id)
  // cur_piece["author_name"] = author and author["name"] or None
}