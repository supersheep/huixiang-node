module.exports = (function(dir){
	var fs = require('fs');
	var path = require('path');

	var dirs = fs.readdirSync(dir);

	var obj = {};

	dirs.forEach(function(file){
	  if(file !== "index.js"){
	  	var modname = file.replace(/\.js$/,'');
	  	console.log(modname);
	    obj[modname[0].toUpperCase() + modname.slice(1)] = require( path.join(dir, file) );
	  }
	});

	return obj;
})(__dirname);