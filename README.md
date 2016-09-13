# riot-tagrouter

Riot js comes with a pretty rock solid [router](http://riotjs.com/api/route/) along with the library file. 
This router however is purely imperitive and maintaining it in a large codebase can go out of hand pretty easily.

riot-tagrouter is a declarative wrapper around the same, it uses the same riot router in its core and 
auto starts the riot router upon its mount.

##Motivation
This router aims to expose a more simpler and declarative way to Router for riotjs apps that not only can work super easily out of the box, 
but also has first class support for lazy loading of the routes and [PRPL](https://www.polymer-project.org/1.0/toolbox/server) for app.

##API
The API is kept pretty clean and minimal, a minimal router config would be declared as follows:

``` html
    <router base-route='/'>
        <route path='/' component='home'></route>
        <route path='/user/:user' component='user-profile'></route>
        <route path='/messages'>
            <route path='/:from-:to' component='msg-component'></route>
        </route>
    </router>
```

> in the above example base-route will be the route base customizable as per the [riot router](http://riotjs.com/api/route/), this sets the root url for your entire app.


This router as promised also has first class support for lazy loaded routes again in a declarative way. The component attribute of the router takes one of the two parameter

 1. A string type name of the component to be mounted
 2. A Promise which at the end needs to be resolved with a string type name of the component

``` html
	<router base-route='/'>
        <route path='/' component='home'></route>
        <route path='/user/*' component='user-profile'></route>
        <route path='/messages'>
            <route path='/:from-:to' component={getMessegesComponent()}></route>
        </route>
    </router>
    .
    .
    .
    <script>
	    this.getMessegesComponent = function (){
		    return new Promise((resolve,reject){
			    //some webpack or require magic here to load the tags now
			    resolve('msg-component');
		    });
		}
    </script>
```

> see [Lazy Loading your Riotjs SPA](medium.com/@prateek.bh/lazy-loading-your-riotjs-spa-5f4e73011663) for hints on webpack stuff

##Custom navigation element
*<navigate>* element bundled with this package uses *riot.route* internally to navigate to any route, for a11y purpose all navigate elements will be '<a>' tags.  

``` html
    <navigate to='/user/john' title='John' replace={true}>
        <svg>
        .
        .
        .
        </svg>
    </navigate>
```
##Route values to components
The component specified in the route tag(or passed via promise) will recieve all the route params in opts of the component.

e.g. in above example, path '/user/:user' the component 'user-profile' wil recieve an opts 'user' with the route value.

##Events
Following two events will be published on 'Router' tag's tag defination(using .trigger) and also via .opts (i.e. 'on-' attributes)

1. *Route Changed*: Whenever the route is changing a 'routeChange' event will be triggered on the tag implementation and also if a function is passed to 'on-routechange' attribute
then that will be called too.
2. *Tag not found*: Whenever a while mounting a tag is not found a 'tagNotFound' event will be triggered on the tag implementation and also if a function is passed to 'on-tagnotfound' attribute
then that will be called too.

##Usage
Tell ppl how can this be added in their project? (script tags, webpack, grunt etc)

###Note
All '*:slugs*' are replaced by '\*' internally, you can however use all the rules that you can use in riot router, however url params will be passed as oopts only for '*:slug*' keys