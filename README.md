# riot-tagrouter
Riot js comes with a pretty rock solid [router](http://riotjs.com/api/route/) along with the library file. 
This router however is purely imperitive and maintaining it in a large codebase can go out of hand pretty easily.

riot-tagrouter is a declarative wrapper around the same, it uses the same riot router in its core and 
auto starts the riot router upon its mount.

###Motivation
This router aims to expose a more simpler and declarative way to Router for riotjs apps that not only can work super easily out of the box, 
but also has first class support for lazy loading of the routes and [PRPL](https://www.polymer-project.org/1.0/toolbox/server) for app.

###API
The API is kept pretty clean and minimal, a minimal router config would be declared as follows
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