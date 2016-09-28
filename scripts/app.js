var riot = require("riot");
var routerTag = require('../tags/rtr-router.tag');

if(riot.render && module.exports){
	module.exports = riot.render('rtr-router',{location:'/'});
}else{
	riot.mount('*');
}