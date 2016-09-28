var routerTag = require("./core/router.tag");
var routeTag = require("./core/route.tag");
var navigateTag = require("./core/navigate.tag");
var homeTag = require("./rtr-home.tag");

<rt-router>
	<router>
		<route path ='/' component="rtr-home"/>
		<route path ='/apis' component="rtr-apis"/>
		<route path ='/isomorphism' component="rtr-isomorphism"/>
		<route path ='/prpl' component="rtr-prpl"/>
	</router>
</rt-router>