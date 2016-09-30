var routerTag = require("./core/router.tag");
var routeTag = require("./core/route.tag");
var navigateTag = require("./core/navigate.tag");
var homeTag = require("./rtr-home.tag");
var isomorphismTag = require("./rtr-isomorphism.tag");
var prplTag = require("./rtr-prpl.tag");

<rtr-router>
	<router>
		<route path ='/' component="rtr-home"/>
		<route path ='/apis' component={this.parent.loadApiPage}/>
		<route path ='/isomorphism' component="rtr-isomorphism"/>
		<route path ='/prpl' component="rtr-prpl"/>
	</router>
	<script>
		this.loadApiPage = function(){
			return new Promise((resolve,reject)=>{
				require.ensure("./rtr-apis.tag",function(require){
					
					var apiTag = require("./rtr-apis.tag");
					resolve("rtr-apis");
				},"apis");
			});
		}
	</script>
</rtr-router>