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

exports.faved = function(userId, pieceId, callback){
  db
    .select('*')
    .from("fav")
    .where({
      userid: userId,
      pieceid: pieceId
    })
    .exec(ok(callback, function(favs){
      callback(null, !!favs.length);
    }));
}

exports.fav = function(userId, pieceId, callback){
  db("fav")
    .insert({
      userid: userId,
      pieceid: pieceId,
      addtime: new Date()
    })
    .exec(ok(callback, function(id){
      callback(null, id);
    }));
}

exports.unfav = function(userId, pieceId, callback){
  db("fav")
    .where({
      userid: userId,
      pieceid: pieceId
    })
    .del()
    .exec(callback);
}