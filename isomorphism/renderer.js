var riot = require('riot');
var appRouteTag = require('./app-route.js');
var reg = /<div id="riotroot" class="riot-root">(.*?)<\/div>/ig;
var html=riot.render('app-route',{location:'/user/profile/prateek'});
html=html.match(reg);
console.log('tag:',appRouteTag,html[0]?html[0]:"");