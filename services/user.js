var db = require('db');
var ok = require('okay');

exports.findOrCreateByWeiboId = function(weiboId, callback){
	db.select('*').from('user').where('weibo_id',weiboId).exec(ok(callback, function(users){
		callback(null, users[0]);
	}));
}

exports.findOrCreateByDoubanId = function(doubanId, callback){
	db.select('*').from('user').where('douban_id',doubanId).exec(ok(callback, function(users){
		callback(null, users[0]);
	}));
}

exports.get = function(id, callback){
	db.select('*').from('user').where('id', id).exec(ok(callback, function(users){
		callback(null,users[0]);
	}))
}