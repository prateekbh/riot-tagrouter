webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	var routerTag = __webpack_require__(4);
	var routerTag = __webpack_require__(11);
	var riotmui = __webpack_require__(12);

	if (riot.render && module.exports) {
		module.exports = riot.render('rtr-router', { location: '/' });
	} else {
		riot.mount('*');
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(2);

	var routerTag = __webpack_require__(5);
	var routeTag = __webpack_require__(6);
	var navigateTag = __webpack_require__(7);
	var homeTag = __webpack_require__(8);
	var isomorphismTag = __webpack_require__(9);
	var prplTag = __webpack_require__(10);

	riot.tag2('rtr-router', '<router> <route path="/" component="rtr-home"></route> <route path="/apis" component="{this.parent.loadApiPage}"></route> <route path="/isomorphism" component="rtr-isomorphism"></route> <route path="/prpl" component="{this.parent.loadPrplPage}"></route> </router>', '', '', function(opts) {
			this.loadApiPage = function(){
				return new Promise((resolve,reject)=>{
					__webpack_require__.e/* nsure */(0, function(require){
						var apiTag = __webpack_require__(1);
						resolve("rtr-apis");
					});
				});
			}

			this.loadPrplPage = function(){
				return new Promise((resolve,reject)=>{
					__webpack_require__.e/* nsure */(2, function(require){
						var prplTag = __webpack_require__(10);
						resolve("rtr-prpl");
					});
				});
			}
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(2);

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
							} else if (newRoute instanceof Function){
									var routePromise = newRoute();
									routePromise.then(tagName  => {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(2);

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(2);

	riot.tag2('navigate', '<a href="{document.querySelector(\'router\').getBasePath()+opts.to}" onclick="{nagivateToRoute}"> <yield></yield> </a>', '', '', function(opts) {
	        var self = this;
	        this.nagivateToRoute = function(e){
	            e.preventDefault();
	            riot.route(self.opts.to,self.opts.title||null,self.opts.replace?true:false);
	        }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(2);

	riot.tag2('rtr-home', '<h2>motivation</h2> <p> This router aims to expose a more simpler and declarative way to Router for riotjs apps that not only can work super easily out of the box, but also has first class support for lazy loading of the routes and <a href="https://www.polymer-project.org/1.0/toolbox/server">PRPL</a> for app. </p> <p> <div>Riot js comes with a pretty rock solid <a href="http://riotjs.com/api/route/">router</a> along with the library file.</div> <div>This router however is purely imperitive and maintaining it in a large codebase can go out of hand pretty easily.</div> </p> <p> <div>riot-tagrouter is a declarative wrapper around the same, it uses the same riot router in its core and auto starts the riot router upon its mount.</div> </p> <blockquote> npm i --save riot-tagrouter </blockquote>', '', '', function(opts) {
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(2);

	riot.tag2('rtr-isomorphism', '<h2>ISOMORPHIC apps with riot-tagrouter</h2> <p> Riot router has been built ground up while keeping in mind #isomorphism. <div> Lets say my-tag.tag implements router tag inside it. e.g. </div> <blockquote> <div>&lt;my-tag&gt;</div> <div>&nbsp;&nbsp;&lt;router&gt;</div> <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path =\'/\' component="rtr-home"/&gt;</div> <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path =\'/apis\' component="rtr-apis"/&gt;</div> <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path =\'/isomorphism\' component="rtr-isomorphism"/&gt;</div> <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path =\'/prpl\' component="rtr-prpl"/&gt;</div> <div>&nbsp;&nbsp;&lt;/router&gt;</div> <div>&lt;/my-tag&gt;</div> </blockquote> <div> in this case with the help of <a target="_blank" href="https://github.com/ilearnio/riot-ssr">riot-ssr</a>, a simple riot.render(\'my-tag\',{location:urlToRender}); would yield the exact code that your page needs. </div> <div> also your page itself just needs this yielded code and not the my-tag itself. For reference check this page\'s source itself :) </div> <div>&nbsp;</div> <div>&nbsp;</div> <div> P.S.: Its highly advised to use router tag inside another riot tag to capture its event/ provide function based components </div> </p>', '', '', function(opts) {
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(2);

	riot.tag2('rtr-prpl', '<h2>PRPL with riot-tagrouter</h2> <p> <div>With the introduction of SPAs we quickly ran into a place where we were bundling more code than required to render the current URL(a more deep description here). Thus hitting the performance for the users who do not even wanted to visit some the areas of your page. Just to make this go away recently a PRPL pattern was introduced. Now considering the importance of PRPL we built a way to lazy load the routes in riot-tagrouter. Infact this very route itself is lazy loaded.</div> <div>To keep lazy loading really realy simple we introduced a method of loading your tags on fly, you only have to pass a function to the component which returns a PROMISE object, fetches your tags and resolves the promise with the desired tag name.</div> <blockquote> <pre>\n				&lt;rtr-router&gt;\n					&lt;router&gt;\n						&lt;route path =\'/\' component="rtr-home"/&gt;\n						&lt;route path =\'/apis\' component={this.parent.loadApiPage}/&gt;\n						&lt;route path =\'/isomorphism\' component="rtr-isomorphism"/&gt;\n						&lt;route path =\'/prpl\' component={this.parent.loadPrplPage}/&gt;\n					&lt;/router&gt;\n					&lt;script&gt;\n\n					&lt;/script&gt;\n				&lt;/rtr-router&gt;\n			</pre> </blockquote> <div>&nbsp;</div> <div> The above very example shows just how you can replace a component name with a function. </div> </p>', '', '', function(opts) {
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(2);

	riot.tag2('rtr-header', '<nav> <material-tabs tabchanged="{changeRoute}" tabs="[\\{title:\'Home\'\\},\\{title:\'APIs\'\\},\\{title:\'Isomorphism\'\\},\\{title:\'PRPL\'\\}]"></material-tabs> </nav> <div id="logo">&lt;Router /&gt;</div> <h1>A declarative router for <a href="http://riotjs.com">RiotjS</a></h1>', '', '', function(opts) {
			this.changeRoute=function(e){
				var route = e.title.toLowerCase();
				route === "home" ? route ='' : route = route;
				riot.route(route);
			}
	});

/***/ }
]);