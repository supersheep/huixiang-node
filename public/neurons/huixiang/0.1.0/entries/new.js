(function(){
function mix(a,b){for(var k in b){a[k]=b[k];}return a;}
var _0 = "huixiang@0.1.0/entries/app.js";
var _1 = "huixiang@0.1.0/entries/header.js";
var _2 = "huixiang@0.1.0/entries/index.js";
var _3 = "huixiang@0.1.0/entries/new.js";
var _4 = "huixiang@0.1.0/entries/people.js";
var _5 = "huixiang@0.1.0/entries/piece.js";
var _6 = "jquery@^1.9.1";
var _7 = "huixiang@0.1.0/mod/uploader.js";
var _8 = "uploader@~0.1.4";
var _9 = "events@^1.0.5";
var _10 = "util@^1.0.4";
var _11 = "huixiang@0.1.0/mod/uploader-template.js";
var entries = [_0,_1,_2,_3,_4,_5];
var asyncDepsToMix = {};
var globalMap = asyncDepsToMix;
define(_3, [_6,_7], function(require, exports, module, __filename, __dirname) {
var $ = require('jquery');
var uploader = require('../mod/uploader');
var share_btns = $(".toweibo,.todouban");
var private_el = $("#private");
var toggle_private = false;

var uploadInstance = uploader.init(".icon-image");
var uploading = {};
var handlers = {
    "success":function(e){
        var self = this;
        var imgSrc = "http://huixiang.qiniudn.com/" + e.data.key + "?imageView/1/w/90/h/90";
        var img = $("<img />").attr("src",imgSrc);

        var block = uploading[e.file.id] && uploading[e.file.id].block;
        if(!block){return;}
        img.load(function(){
            block.find(".percent").remove();
            block.find(".pic").append(img);
            block.data("key",e.data.key);
            img.css("display","none");
            img.fadeIn();
        });
    },
    "error":function(e){
        var errors = {
            "-100":"一次最多上传四张"
        }
        errors[e.code] && alert(errors[e.code]);
    }
};

for(var k in handlers){
    uploadInstance.on(k,handlers[k]);
}

share_btns.on("click",function(e){
    if(private_el.prop("checked")){return;}
    var elem = $(this).toggleClass("active");
});

private_el.on("click",function(){
    if(!toggle_private){
        $(".share").hide();
        share_btns.each(function(i,el){
            el = $(el)
            el.data("selected",el.hasClass("active")).removeClass("active");
        });
    }else{
        $(".share").show();
        share_btns.each(function(i,el){
            el = $(el)
            if(el.data("selected")){
                el.addClass("active");
            }
        });
    }
    toggle_private = !toggle_private;
});

$(".new-form").on("submit",function(){
    if(!$(".textarea").val().trim()){
        alert("请填写内容");
        return false;
    }
    if($(".pic .percent").length){
        alert("图还没传完呢");
        return false;
    }
    $("#pics").val($(".pic-wrapper").map(function(i,el){
        return $(el).data("key");
    }).get().join(","));
    return true;
});
}, {
    entries:entries,
    map:mix({"../mod/uploader":_7},globalMap)
});

define(_7, [_8,_9,_10,_6,_11], function(require, exports, module, __filename, __dirname) {
var Uploader = require('uploader');
var events = require('events');
var util = require('util');
var $ = require('jquery');


function beforeUpload(file, done){
  var uploader = this;
  $.ajax({
    url:"/api/upload/token",
    dataType:"json",
    success:function(json){
      var fileName = json.fileName; // random file name generated
      var token = json.token;
      var type = file.ext;
      uploader.set('data',{
        token: token,
        key:"pic/" + fileName + type
      });
      done();
    }
  });
}

function init(selector){
	var u = new Uploader(selector, {
    multipleLen:10,
    action:"http://up.qiniu.com",
    name:"file",
    queueTarget:".pic-row",
    theme:require('./uploader-template'),
    beforeUpload: beforeUpload,
    swf_config:{
    	flash_url : "/static/swfupload/swfupload.swf"
    }
	}).on("load",function(){
	    $("#uploader_wrap .text").text("上传");
	});

	return u;
}

module.exports = {
	init:init
}
}, {
    entries:entries,
    map:mix({"./uploader-template":_11},globalMap)
});

define(_11, [], function(require, exports, module, __filename, __dirname) {
module.exports = {
    template: '<div id="J_upload_item_<%=id%>" class="pic-wrapper">'
        +'<div class="pic"><div class="percent"></div></div>'
        +'<div class="icon-delete J_upload_remove" />'
    +'</div>',
    success: function(e){
        var elem = e.elem;
        var data = e.data;
        var imgSrc = "http://huixiang.qiniudn.com/" + data.key + "?imageView/1/w/90/h/90";
        var img = $("<img />").attr("src",imgSrc);
        if(!elem){return;}
        img.load(function(){
            elem.find(".percent").remove();
            elem.find(".pic").append(img);
            elem.data("key",data.key);
            img.css("display","none");
            img.fadeIn();
        });
    },
    error: function(e){
        console && console.log("e")
    },
    remove: function(e){
        var elem = e.elem;
        elem && elem.remove();
    }
};
}, {
    entries:entries,
    map:globalMap
});
})();