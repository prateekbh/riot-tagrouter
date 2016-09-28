webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	var routerTag = __webpack_require__(3);
	var routerTag = __webpack_require__(9);
	var riotmui = __webpack_require__(8);

	if (riot.render && module.exports) {
		module.exports = riot.render('rtr-router', { location: '/' });
	} else {
		riot.mount('*');
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	var routerTag = __webpack_require__(4);
	var routeTag = __webpack_require__(5);
	var navigateTag = __webpack_require__(6);
	var homeTag = __webpack_require__(7);
	var apiTag = __webpack_require__(10);

	riot.tag2('rtr-router', '<router> <route path="/" component="rtr-home"></route> <route path="/apis" component="rtr-apis"></route> <route path="/isomorphism" component="rtr-isomorphism"></route> <route path="/prpl" component="rtr-prpl"></route> </router>', '', '', function(opts) {
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	riot.tag2('router', '<div id="riotcontainer" class="route-container"> <yield></yield> </div> <div id="riotroot" class="riot-root"> </div>', '', '', function(opts) {
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

								setTimeout(function(){
									throw(e);
								},0);
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
							} else if (newRoute instanceof Promise){
									newRoute.then(tagName  => {
										createRouteWithTagName(tagName);
									});
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
								var routeContainer = this.riotcontainer;
								routeContainer.remove && routeContainer.remove();
							}

							$appRoot = this.riotroot;

							this.opts.baseRoute && riot.route.base(this.opts.baseRoute);

							this.root.getBasePath = function(){
								return self.opts.baseRoute||'#';
							}
					});
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	riot.tag2('navigate', '<a href="{document.querySelector(\'router\').getBasePath()+opts.to}" onclick="{nagivateToRoute}"> <yield></yield> </a>', '', '', function(opts) {
	        var self = this;
	        this.nagivateToRoute = function(e){
	            e.preventDefault();
	            riot.route(self.opts.to,self.opts.title||null,self.opts.replace?true:false);
	        }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	riot.tag2('rtr-home', '<h2>motivation</h2> <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>', '', '', function(opts) {
	});

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	riot.tag2('rtr-header', '<nav> <material-tabs tabchanged="{changeRoute}" tabs="[\\{title:\'Home\'\\},\\{title:\'APIs\'\\},\\{title:\'Isomorphism\'\\},\\{title:\'PRPL\'\\}]"></material-tabs> </nav> <div id="logo">&lt;Router /&gt;</div> <h1>A declarative router for <a href="http://riotjs.com">RiotjS</a></h1>', '', '', function(opts) {
			this.changeRoute=function(e){
				var route = e.title.toLowerCase();
				route === "home" ? route ='' : route = route;
				riot.route(route);
			}
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	riot.tag2('rtr-apis', '<h2>APIs</h2>', '', '', function(opts) {
	});

/***/ }
]);