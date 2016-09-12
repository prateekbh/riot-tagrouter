<router>
    <div class='route-container'>
			<yield></yield>
    </div>
    <div class="riot-root">
    </div>
    <script>
        var $appRoot = null;
        var currTag = null;

        this.routeParams = {};

        function unmountCurrRoute(){
            if(currTag){
                console.log(currTag);
                debugger;
            }
        }

        function createRouteWithTagName(tagName){
            $appRoot.innerHTML = '<'+tagName+' class="route-'+tagName+'"></'+tagName+'>';
            var mountedTag = riot.mount(tagName+'.'+tagName);
            if(mountedTag.length === 0){
                throw (new Error('Riot Element Not Found')); 
            }
            else{
                unmountCurrRoute();
                currTag = mountedTag[0];
            }
        }

        function changeRoute(newRoute){
            if(typeof(newRoute) === 'string'){
                createRouteWithTagName(newRoute);
            } else if (window.Promise && Promise.resolve(newRoute) === newRoute){
                //PRPL function
            }
        }

        this.setRoute = function(path, component){
            (function(path, component){

                //regex to take out :slugs
								var tokenRegExp = /:([a-z]*)/ig;

								//take out slugs as keys
            		var params = path.match(tokenRegExp);
								params = params.map(param=> param.length>0 ? param.substring(1): '');

								//converting to riot router understandable format
								path = path.replace(tokenRegExp,'*');
								
								//actual callback
                riot.route(path,function() {
										//empty the route params
										this.routeParams={};

										//build the new route param dictionary
										params.forEach((param,index) => {
											this.routeParams[param] = arguments[index];
										});
										console.log(this.routeParams);
										//change route
                    changeRoute(component); 
                });
            })(path, component)
        }

        this.on('mount',(e)=>{
						//remove the ugly routes from DOM unless flag says not to
						if(!this.opts.showRoutes){
							var routeContainer = this.root.querySelector('.route-container');
							routeContainer.remove && routeContainer.remove();
						}

            $appRoot = this.root.querySelector('.riot-root');
            riot.route.start(true);
        });
        
    </script>
</router>