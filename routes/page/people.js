var ok = require('okay');
var async = require('async');

exports.get = function(req,res,next){

  var user = req.user;
  var page_user_id = req.params.id;
  var per = 5;
  var page = req.query.page || 1;

  var Fav = req.services.Fav;
  var User = req.services.User;


  User.get(page_user_id, ok(next, function(page_user){
    if(!page_user){
      return res.send(404, "user not found");
    }
    var isMyPage = user && user.id == page_user_id;
    if(page < 1){ page = 1;}

    async.parallel([
      function(done){
        Fav.userFavs({
          page: page,
          per: per,
          userId: page_user_id,
          showPrivate: isMyPage
        }, done);
      },
      function(done){
        Fav.userFavPageCount({
          userId: page_user_id,
          per: 5,
          showPrivate: isMyPage
        }, done);
      }
    ], ok(next, function(results){
      var favs = results[0];
      var pages_count = results[1];

      console.log(results);
      if(favs.length == 0){
        favs = [{"content":"如果有收藏过喜欢的句子，他们会出现在这里。","pics":null,"private":null,"author_name":null,"work_title":null,"id":null}]
      }

      var pages = Math.ceil(pages_count/per);

      res.render("people", {
        favs: favs,
        page_user: page_user,
        pages: pages,
        page: +page
      });
    }));
  }));
};
