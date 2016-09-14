'use strict';

riot.tag2('navigate', '<a href="{opts.to}" onclick="{nagivateToRoute}"><yield></yield></a>', '', '', function (opts) {
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
        if (currTag) {
            console.log(currTag);
            debugger;
        }
    }

    function createRouteWithTagName(tagName) {

        var tag = '<' + tagName + ' class="route-' + tagName + '" ';
        for (var param in routeParams) {
            tag = tag + param + '="' + routeParams[param] + '" ';
        }
        tag = tag + '></' + tagName + '>';

        unmountCurrRoute();

        $appRoot.innerHTML = tag;
        var mountedTag = riot.mount(tagName + '.' + tagName);
        if (mountedTag.length === 0) {
            self.trigger('tagNotFound', tagName);
            if (self.opts['on-tagnotfound'] && self.opts['on-tagnotfound'] instanceof Function) {
                self.opts['on-tagnotfound'](tagName);
            }
        } else {
            self.trigger('routeChanged', tagName);
            if (self.opts['on-routechange'] && self.opts['on-routechange'] instanceof Function) {
                self.opts['on-routechange'](tagName);
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
            params = params.map(function (param) {
                return param.length > 0 ? param.substring(1) : '';
            });

            path = path.replace(tokenRegExp, '*');

            riot.route(path, function () {
                var _arguments = arguments;


                routeParams = {};

                params.forEach(function (param, index) {
                    routeParams[param] = _arguments[index];
                });

                changeRoute(component);
            });
        })(path, component);
    };

    this.on('mount', function (e) {

        if (!_this2.opts.showRoutes) {
            var routeContainer = _this2.root.querySelector('.route-container');
            routeContainer.remove && routeContainer.remove();
        }

        $appRoot = _this2.root.querySelector('.riot-root');
        riot.route.start(true);
    });
});
//# sourceMappingURL=routerlib.js.map
