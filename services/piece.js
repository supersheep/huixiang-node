var ok = require('okay');
var db = require('db');
module.exports = {
	getRandom: function(limit, callback){
		return db.raw("select id,content,link from piece order by rand() limit " + limit)
                .exec(ok(callback, function(results){
                	callback(null, results[0]);
                }));
	}
}