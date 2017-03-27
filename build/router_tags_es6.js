riot.tag2('navigate', '<a href="{document.querySelector(\'router\').getBasePath()+opts.to}" onclick="{navigateToRoute}"><yield></yield></a>', '', '', function(opts) {
        var self = this;
        this.navigateToRoute = function(e){
            e.preventDefault();
            riot.route(self.opts.to,self.opts.title||null,self.opts.replace?true:false);
        }
});
riot.tag2('route', '<yield></yield>', '', '', function(opts) {
				this.on('mount',(e) => {
						if(Object.keys(this.tags).length===0){
							this.parent && this.parent.setRoute && this.parent.setRoute(this.opts.path, this.opts.component );
						}
				});

				this.setRoute = function(path, component){
					this.parent && this.parent.setRoute && this.parent.setRoute(this.opts.path + path, component );
				}
});
riot.tag2('router', '<div ref="riotcontainer" class="route-container"><yield></yield></div><div ref="riotroot" class="riot-root"></div>', '', '', function(opts) {
				var self = this;
				var $appRoot = null;
				var currTag = null;

				var _isRouteRendedered = false;
				var routeParams = {};

				function unmountCurrRoute(){
						if(currTag && currTag.unmount){
									currTag.unmount();
						}
				}

				function createRouteWithTagName(tagName){

						var tag = '<'+tagName+' class="route-'+tagName+'"></'+tagName+'>';

						unmountCurrRoute();

						$appRoot.innerHTML = tag;
						var mountedTag;
						try{
							if(typeof window === 'undefined'){

								$appRoot.innerHTML = riot.render(tagName,routeParams);
							} else {
								mountedTag = riot.mount(tagName + '.route-' + tagName, routeParams);
							}
						}
						catch(e){

							console.error(e);
						}
						if(!mountedTag || mountedTag.length === 0){
								self.trigger('tagNotFound',tagName);
								if(self.opts['onTagnotfound'] && self.opts['onTagnotfound'] instanceof Function){
									self.opts['onTagnotfound'](tagName);
								}

						}
						else{
								self.trigger('routeChanged',tagName);
								if(self.opts['onRoutechange'] && self.opts['onRoutechange'] instanceof Function){
									self.opts['onRoutechange'](tagName);
								}
								currTag = mountedTag[0];
						}
				}

				function changeRoute(newRoute){
						if(typeof(newRoute) === 'string'){
								createRouteWithTagName(newRoute);
						} else if (newRoute instanceof Function){
								var result = newRoute();
								if(typeof(result) === 'string'){
									createRouteWithTagName(newRoute);
								} else if(result instanceof Promise){
									result.then(tagName  => {
										createRouteWithTagName(tagName);
									});
								}
						}
				}

				this.setRoute = function(path, component){
						(function(path, component){

								var tokenRegExp = /:([a-z]*)/ig;

								var params = path.match(tokenRegExp);
								params = params && params.map(param => param.length>0 ? param.substring(1): '') || params;

								path = path.replace(tokenRegExp,'*');

								if(typeof window === 'undefined' && !_isRouteRendedered){
									var serverSidePath = new RegExp(path.replace(/\*/g,'([^/?#]+?)').replace(/\.\./g,'.*')+'$');
									var loc = self.opts.location || self.parent&&self.parent.opts.location;

									if(serverSidePath.test(loc)){
										var matches=loc.match(serverSidePath)
										matches.length&&matches.shift();

										routeParams = {};
										params && params.forEach(function (param, index) {
												routeParams[param] = matches[index];
										});

										_isRouteRendedered = true;
										changeRoute(component);
									}

								} else if(typeof window !== 'undefined') {

									riot.route(path,function() {

											routeParams={};

											params && params.forEach((param,index) => {
												routeParams[param] = arguments[index];
											});

											changeRoute(component);
									});

									riot.route.start(true);
								}
						})(path, component)
				}

				this.on('mount',(e)=>{

						if(!this.opts.showRoutes){
							var routeContainer = this.refs.riotcontainer;
							routeContainer.remove && routeContainer.remove();
						}

						$appRoot = this.refs.riotroot;

						this.opts.baseRoute && riot.route.base(this.opts.baseRoute);

						this.root.getBasePath = function(){
							return self.opts.baseRoute||'#';
						}
				});
});

