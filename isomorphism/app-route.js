
'use strict';
var riot = require('riot');
riot.tag2('navigate', '<a href="{document.querySelector(\'router\').getBasePath()+opts.to}" onclick="{nagivateToRoute}"><yield></yield></a>', '', '', function (opts) {
		var self = this;
		this.nagivateToRoute = function (e) {
				e.preventDefault();
				riot.route(self.opts.to, self.opts.title || null, self.opts.replace ? true : false);
		};
});
riot.tag2('route', '<yield></yield>', '', '', function (opts) {
		var _this = this;

		this.on('mount', function (e) {
				if (Object.keys(_this.tags).length === 0) {
						_this.parent && _this.parent.setRoute && _this.parent.setRoute(_this.opts.path, _this.opts.component);
				}
		});

		this.setRoute = function (path, component) {
				this.parent && this.parent.setRoute && this.parent.setRoute(this.opts.path + path, component);
		};
});
riot.tag2('router', '<div id="riotroutecontainer" class="route-container"><yield></yield></div><div id="riotroot" class="riot-root"></div>', '', '', function (opts) {
		var _this2 = this;

		var self = this;
		var $appRoot = null;
		var currTag = null;
		var _isRouteRendedered = false;

		var routeParams = {};

		function unmountCurrRoute() {
				if (currTag && currTag.unmount) {
						currTag.unmount();
				}
		}

		function createRouteWithTagName(tagName) {

				var tag = '<' + tagName + ' class="route-' + tagName + '"></' + tagName + '>';

				unmountCurrRoute();

				$appRoot.innerHTML = tag;
				var mountedTag;
				try {
						if(typeof window === 'undefined'){
							$appRoot.innerHTML = riot.render(tagName,routeParams);
						} else {
							mountedTag = riot.mount(tagName + '.route-' + tagName, routeParams);
						}
						
				} catch (e) {

						setTimeout(function () {
								throw e;
						}, 0);
				}
				if (!mountedTag || mountedTag.length === 0) {
						self.trigger('tagNotFound', tagName);
						if (self.opts['onTagnotfound'] && self.opts['onTagnotfound'] instanceof Function) {
								self.opts['onTagnotfound'](tagName);
						}
				} else {
						self.trigger('routeChanged', tagName);
						if (self.opts['onRoutechange'] && self.opts['onRoutechange'] instanceof Function) {
								self.opts['onRoutechange'](tagName);
						}
						currTag = mountedTag[0];
				}
		}

		function changeRoute(newRoute) {
				if (typeof newRoute === 'string') {
						createRouteWithTagName(newRoute);
				} else if (window.Promise && newRoute instanceof window.Promise) {
						newRoute.then(function (tagName) {
								createRouteWithTagName(tagName);
						});
				}
		}

		this.setRoute = function (path, component) {
				(function (path, component) {
						var tokenRegExp = /:([a-z]*)/ig;

						var params = path.match(tokenRegExp);
						params = params && params.map(function (param) {
								return param.length > 0 ? param.substring(1) : '';
						}) || params;

						path = path.replace(tokenRegExp, '*');

						/* CODE FOR ISOMORPHISM */
						if(typeof window === 'undefined' && !_isRouteRendedered){
							var serverSidePath = new RegExp(path.replace(/\*/g,'([^/?#]+?)').replace(/\.\./g,'.*')+'$');
							if(serverSidePath.test(self.parent.opts.location)){
								_isRouteRendedered = true;
								createRouteWithTagName(component);
							}

						} else {
							riot.route(path, function () {
								var _arguments = arguments;
								routeParams = {};
								params && params.forEach(function (param, index) {
										routeParams[param] = _arguments[index];
								});
								changeRoute(component);
							});

							riot.route.start(true);
						}
				})(path, component);
		};

		this.on('mount', function (e) {

				if (!_this2.opts.showRoutes) {
						var routeContainer = _this2.riotroutecontainer;
						routeContainer.remove && routeContainer.remove();
				}
				$appRoot = _this2.riotroot;

				_this2.opts.baseRoute && riot.route.base(_this2.opts.baseRoute);

				_this2.root.getBasePath = function () {
						return self.opts.baseRoute || '#';
				};
		});
});


riot.tag2('home', '<h1>home</h1> <navigate to="/user/profile/prateek">Prateek</navigate>', '', '', function(opts) {
});

riot.tag2('msg-component', '<h1>message from {this.opts.from} to {this.opts.to}</h1>', '', '', function(opts) {
});

riot.tag2('user-component', '<h1>user component for {this.opts.user}</h1>', '', '', function(opts) {
});

riot.tag2('tag-404', '<h1>Page not found :(</h1>', '', '', function(opts) {
});

riot.tag2('msg-404', '<h1>Msg not found :(</h1>', '', '', function(opts) {
});

riot.tag2('tag-error', '<h1>check console for error</h1>', '', '', function(opts) {
		this.on('mount',function(){
			throw new Error('dummy err');
		});
});

riot.tag2('app-route', '<router show-routes="{true}" on-routechange="{fireRouteChange}" on-tagnotfound="{fireTagnotfound}"> <route path="/" component="home"></route> <route path="/error" component="tag-error"></route> <route path="/user"> <route path="/profile/:user" component="user-component"></route> </route> <route path="messages"> <route path="/outbox" component="msg-outbox"></route> <route path="/:from-:to" component="{this.parent.parent.prplFunc()}"></route> <route path="/.." component="msg-404"></route> </route> <route path="/.." component="tag-404"></route> </router>', '', '', function(opts) {
			var self=this;
			this.prplFunc = function(){
				return new Promise(function(resolve, reject){
					resolve('msg-component');
				});
			}

			this.fireRouteChange = function(){
				self.trigger('routeChanged');
			}

			this.fireTagnotfound = function(){
				self.trigger('tagNotFound');
			}

});
