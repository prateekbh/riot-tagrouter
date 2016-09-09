# riot-tagrouter
__________________

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
        <route path='/user/*' component='user-profile'></route>
        <route path='/messages'>
            <route path='/inbox' component='msg-inbox'></route>
            <route path='/sent' component='msg-sent'></route>
        </route>
    </router>
```

> in the above example base-route will be the route base customizable as per the [riot router](http://riotjs.com/api/route/), this sets the root url for your entire app.

This router as promised also has first class support for lazy loaded routes again in a declarative way. The component attribute of the router takes one of the two parameter

 1. A string type name of the component to be mounted
 2. A function which returns a promise which returns a promise, this promise at the end needs to be resolved with a string type name of the component

``` html
	<router base-route='/'>
        <route path='/' component='home'></route>
        <route path='/user/*' component='user-profile'></route>
        <route path='/messages'>
            <route path='/inbox' component='msg-inbox'></route>
            <route path='/sent' component={getOutboxComponent}></route>
        </route>
    </router>
    .
    .
    .
    <script>
	    this.getOutboxComponent = function (){
		    return new Promise((resolve,reject){
			    //some webpack or require magic here to load the tags now
			    resolve('msg-sent');
		    });
		}
    </script>
```

> see [Lazy Loading your Riotjs SPA](medium.com/@prateek.bh/lazy-loading-your-riotjs-spa-5f4e73011663) for hints on webpack stuff

##Custom navigation element
Create a custom element like 'link' in react-router to ensure navigation does not trigger a full refresh, also need to check if we can create a custom element named 'link' cuz react.mount('*') might conflict with link tags

##Route values to components
TBD, this gets complicatd as now to pass the values to the component

##Errors
TBD, how to propagate errors if the component is not available

