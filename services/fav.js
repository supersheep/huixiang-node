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


/**
 * args.showPrivate
 * args.userId
 * args.per
 * args.page
 */
exports.userFavPageCount = function(args, callback){
  db("fav")
    .join("piece", "piece.id","fav.pieceid")
    .join("user", "user.id","fav.userid")
    .count("piece.id as count")
    .where({
      "user.id":args.userId
    })
    .exec(function(err, results){
      callback(null, results[0].count);
    });
};

/**
 * args.showPrivate
 * args.userId
 * args.per
 * args.page
 */
exports.userFavs = function(args, callback){
  var showPrivate = args.showPrivate || false;

  db("fav")
    .join("piece","piece.id","fav.pieceid")
    .join("user", "user.id","fav.userid")
    .leftJoin("work","work.id","piece.work")
    .leftJoin("author","author.id","piece.author")
    .select(
      "piece.id","piece.private","piece.addtime",
      "piece.id","piece.content","piece.pics",
      "author.name as author_name", "work.title as work_title")
    .where({
      "user.id": args.userId
    })
    .orderBy("piece.addtime","desc")
    .limit(args.per)
    .offset((args.page - 1) * args.per)
     .on('query', function(data) {
       console.log(data);
     })
    .exec(function(err, favs){
      if(!showPrivate){
        favs = favs.filter(function(item){
          return item["private"];
        });
      }
      callback(null, favs);
    });
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
};