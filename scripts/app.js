var riot = require("riot");
var routerTag = require('../tags/app-router.tag');

if(riot.render && module.exports){
	module.exports = riot.render('app-router',{location:'/'});
}else{
	riot.mount('*');
}