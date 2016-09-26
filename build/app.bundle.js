webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	var _routerlib = __webpack_require__(3);

	var _routerlib2 = _interopRequireDefault(_routerlib);

	var _rtrHeader = __webpack_require__(4);

	var _rtrHeader2 = _interopRequireDefault(_rtrHeader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	riot.mount('*', {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

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
	riot.tag2('router', '<div class="route-container"><yield></yield></div><div class="riot-root"></div>', '', '', function (opts) {
			var _this2 = this;

			var self = this;
			var $appRoot = null;
			var currTag = null;

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
							mountedTag = riot.mount(tagName + '.route-' + tagName, routeParams);
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

							riot.route(path, function () {
									var _arguments = arguments;

									routeParams = {};

									params && params.forEach(function (param, index) {
											routeParams[param] = _arguments[index];
									});

									changeRoute(component);
							});

							riot.route.start(true);
					})(path, component);
			};

			this.on('mount', function (e) {

					if (!_this2.opts.showRoutes) {
							var routeContainer = _this2.root.querySelector('.route-container');
							routeContainer.remove && routeContainer.remove();
					}
					$appRoot = _this2.root.querySelector('.riot-root');

					_this2.opts.baseRoute && riot.route.base(_this2.opts.baseRoute);

					_this2.root.getBasePath = function () {
							return self.opts.baseRoute || '#';
					};
			});
	});
	//# sourceMappingURL=routerlib.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(1);

	riot.tag2('rtr-header', '<div id="logo">&lt;Router /&gt;</div>', '', '', function(opts) {
	});

/***/ }
]);