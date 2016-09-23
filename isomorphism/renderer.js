var riot = require('riot');
var appRouteTag = require('./app-route.js');
console.log(riot.render('app-route', {location: '/user/profile/john'}));