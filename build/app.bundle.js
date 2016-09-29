webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	var routerTag = __webpack_require__(3);
	var routerTag = __webpack_require__(11);
	var riotmui = __webpack_require__(12);

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
	var apiTag = __webpack_require__(8);
	var isomorphismTag = __webpack_require__(9);
	var prplTag = __webpack_require__(10);

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
					this.on('mount',function (e) {
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

	riot.tag2('rtr-home', '<h2>motivation</h2> <p> This router aims to expose a more simpler and declarative way to Router for riotjs apps that not only can work super easily out of the box, but also has first class support for lazy loading of the routes and <a href="https://www.polymer-project.org/1.0/toolbox/server">PRPL</a> for app. </p> <p> <div>Riot js comes with a pretty rock solid <a href="http://riotjs.com/api/route/">router</a> along with the library file.</div> <div>This router however is purely imperitive and maintaining it in a large codebase can go out of hand pretty easily.</div> </p> <p> <div>riot-tagrouter is a declarative wrapper around the same, it uses the same riot router in its core and auto starts the riot router upon its mount.</div> </p> <blockquote> npm i --save riot-tagrouter </blockquote>', '', '', function(opts) {
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	riot.tag2('rtr-apis', '<h2>APIs</h2> <p> <div>riot-tagrouter uses the riot\'s router internally to provide you a declarative layer on top of it, hence it also enable you to use all the functionality of riot\'s routing library.</div> <div>feel free to use riot.route to navigate around</div> </p> <p> However riot-tagrouter comes with following three tags to help you in your entire navigation stuff: <ol> <li>Navigate: use this as "&lt;navigate to=\'/path\'&gt;your html here&lt;/navigate&gt;. This makes sure that all the routing happening is internal to this SPA only. Use a regular "a" tag to navigate freely outside the app</li> <li>Route: use this tag to declare a path and a component against a component or a prosive that resolves to a string naming a component</li> <li>Router: The mothership tag that declares all the routes and their callbacks.</li> </ol> </p> <p> </p>', '', '', function(opts) {
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	riot.tag2('rtr-isomorphism', '<h2>ISOMORPHIC apps with riot-tagrouter</h2> <p> Riot router has been built ground up while keeping in mind #isomorphism. <div> Lets say my-tag.tag implements router tag inside it. e.g. </div> <blockquote> <div>&lt;my-tag&gt;</div> <div>&nbsp;&nbsp;&lt;router&gt;</div> <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path =\'/\' component="rtr-home"/&gt;</div> <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path =\'/apis\' component="rtr-apis"/&gt;</div> <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path =\'/isomorphism\' component="rtr-isomorphism"/&gt;</div> <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path =\'/prpl\' component="rtr-prpl"/&gt;</div> <div>&nbsp;&nbsp;&lt;/router&gt;</div> <div>&lt;/my-tag&gt;</div> </blockquote> <div> in this case with the help of <a target="_blank" href="https://github.com/ilearnio/riot-ssr">riot-ssr</a>, a simple riot.render(\'my-tag\',{location:urlToRender}); would yield the exact code that your page needs. </div> <div> also your page itself just needs this yielded code and not the my-tag itself. For reference check this page\'s source itself :) </div> <div>&nbsp;</div> <div>&nbsp;</div> <div> P.S.: Its highly advised to use router tag inside another riot tag to capture its event/ provide function based components </div> </p>', '', '', function(opts) {
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	riot.tag2('rtr-prpl', '<h2>PRPL with riot-tagrouter</h2>', '', '', function(opts) {
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	riot.tag2('rtr-header', '<nav> <material-tabs tabchanged="{changeRoute}" tabs="[\\{title:\'Home\'\\},\\{title:\'APIs\'\\},\\{title:\'Isomorphism\'\\},\\{title:\'PRPL\'\\}]"></material-tabs> </nav> <div id="logo">&lt;Router /&gt;</div> <h1>A declarative router for <a href="http://riotjs.com">RiotjS</a></h1>', '', '', function(opts) {
			this.changeRoute=function(e){
				var route = e.title.toLowerCase();
				route === "home" ? route ='' : route = route;
				riot.route(route);
			}
	});

/***/ }
]);