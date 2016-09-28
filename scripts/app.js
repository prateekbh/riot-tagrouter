var routerTag = require('../tags/rtr-router.tag');
var routerTag = require('../tags/rtr-header.tag');
var riotmui  = require('riot-mui');

if(riot.render && module.exports){
	module.exports = riot.render('rtr-router',{location:'/'});
}else{
	riot.mount('*');
}