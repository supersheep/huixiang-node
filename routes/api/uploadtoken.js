var ok = require('okay');
var config = require('config');
var qiniu = require('qiniu');
var moment = require('moment');

exports.get = function(req, res, next){
	qiniu.conf.ACCESS_KEY = config.qiniu_key;
  qiniu.conf.SECRET_KEY = config.qiniu_secret;
  var policy = new qiniu.rs.PutPolicy("huixiang");
	  policy.expires = 30;
  var uptoken = policy.token();
  var fileName = [req.user.id, +new Date()].join("_");
  res.send(200, {
  	"token":uptoken,
  	"fileName":fileName
  });
}