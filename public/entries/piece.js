var $ = require('jquery');
var poplogin = require("../mod/poplogin");
var liked_elems = $(".icon-heart,.people ul");
var likebtn = $(".icon-heart");
var id = likebtn.attr("data-id");

var picCount = $(".pics li").length;
var next = $(".pics .next");
var last = $(".pics .last");
if(picCount > 1){
    last.show();
    next.show();
}

last.on("click",function(){

});

next.on("click",function(){

});

likebtn.on("click",function(){
    var LIKED = "liked";
    if(likebtn.hasClass(LIKED)){
        $.ajax({
            url:"/api/unfav",
            type:"post",
            data:{pieceid:id}
        }).success(function(){
            liked_elems.removeClass(LIKED);
        }).fail(function(){
            poplogin();
        });
    }else{
        $.ajax({
            url:"/api/fav",
            type:"post",
            data:{pieceid:id}
        }).success(function(){
            liked_elems.addClass(LIKED);
        }).fail(function(){
            poplogin();
        });
    }
})