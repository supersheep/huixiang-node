var express = require('express');
var path = require('path');



function generateRoute(dir, routes){
    var router = express.Router();
    for(var k in routes){
        var controller = require( "./" + dir + "/" + routes[k]);
        ["get","post","put","delete"].forEach(function(verb){
            if(controller[verb]){
                router[verb].apply(router, [k].concat(controller[verb]));
            }
        });
    }

    return router;
}

exports.pages = generateRoute('page', {
    "/": "index",
    '/new': 'new',
    '/piece/:id': 'piece',
    '/people/:id': 'people',
    // '/login': 'login',
    '/logout': 'logout',
    // '/tools': 'tools',
    // '/about': 'about',
    // '/app': 'app',
    // '/bookmarklet': 'bookmarklet',
    '/auth/:type': 'auth',
    '/auth/redirect/:type': 'auth_redirect'
});

exports.api = generateRoute('api', {
    '/pieces':'pieces',
    // '/userinfo':'userinfo',
    // '/mine/favs':'myfavs',
    // '/authuser':'authuser',
    // '/add':'add',
    '/fav':'fav',
    '/unfav':'unfav',
    // '/remove':'remove',
    // '/upload/token':'uploadtoken',
    // '/upload/callback':'uploadcallback',
    // '/authtoken/weibo': 'auth'
});