<router>
    <div class='route-container'>
			<yield></yield>
    </div>
    <div class="riot-root">
    </div>
    <script>
			var self = this;
			var $appRoot = null;
			var currTag = null;

			var routeParams = {};

			function unmountCurrRoute(){
					if(currTag){
							console.log(currTag);
							debugger;
					}
			}

			function createRouteWithTagName(tagName){
					//construct the tag
					var tag = '<'+tagName+' class="route-'+tagName+'" ';
					for(var param in routeParams){
						tag = tag + param + '="' + routeParams[param] + '" ';
					}
					tag = tag + '></'+tagName+'>';

					//remove current tag
					unmountCurrRoute();

					//mount new tag
					$appRoot.innerHTML = tag;
					var mountedTag = riot.mount(tagName+'.route-'+tagName);
					if(mountedTag.length === 0){
							self.trigger('tagNotFound',tagName);
							if(self.opts['on-tagnotfound'] && self.opts['on-tagnotfound'] instanceof Function){
								self.opts['on-tagnotfound'](tagName);
							}
							//right now throwing this error halts the entire router
							//throw (new Error('Riot Element Not Found')); 
					}
					else{
							self.trigger('routeChanged',tagName);
							if(self.opts['on-routechange'] && self.opts['on-routechange'] instanceof Function){
								self.opts['on-routechange'](tagName);
							}
							currTag = mountedTag[0];
					}
			}

			function changeRoute(newRoute){
					if(typeof(newRoute) === 'string'){
							createRouteWithTagName(newRoute);
					} else if ((window.Promise) && (newRoute instanceof window.Promise)){
							newRoute.then(tagName  => {
								createRouteWithTagName(tagName);
							});
					}
			}


			this.setRoute = function(path, component){
					(function(path, component){

							//regex to take out :slugs
							var tokenRegExp = /:([a-z]*)/ig;

							//take out slugs as keys
							var params = path.match(tokenRegExp);
							params = params && params.map(param => param.length>0 ? param.substring(1): '') || params;

							//converting to riot router understandable format
							path = path.replace(tokenRegExp,'*');
							
							//actual callback
							riot.route(path,function() {
									//empty the route params
									routeParams={};

									//build the new route param dictionary
									params && params.forEach((param,index) => {
										routeParams[param] = arguments[index];
									});

									//change route
									changeRoute(component); 
							});

							//start the router
							//riot.route.start does not do exec everytime so you can be safe about the fact that callback will be called multiple times
							riot.route.start(true);
					})(path, component)
			}

			this.on('mount',(e)=>{
					//remove the ugly routes from DOM unless flag says not to
					if(!this.opts.showRoutes){
						var routeContainer = this.root.querySelector('.route-container');
						routeContainer.remove && routeContainer.remove();
					}
					$appRoot = this.root.querySelector('.riot-root');
					
			});
    </script>
</router>

