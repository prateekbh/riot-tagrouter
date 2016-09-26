const render = require('riot-ssr')
var appRouteTag = require('./isomorphism.js');

// asynchronously (can be used for sync tags as well)
render('app-route', {location: '/messages/john-jane'}, function (rendered) {
 console.log('Testing promise based server side rendering');
 if(rendered === '<app-route><router show-routes="true"><div id="riotcontainer" class="route-container"><route path="/" component="home"></route> <route path="/error" component="tag-error"></route> <route path="user"><route path="/profile/:user" component="user-component"></route></route> <route path="messages"><route path="/outbox" component="msg-outbox"></route> <route path="/:from-:to"></route> <route path="/.." component="msg-404"></route></route> <route path="/.." component="tag-404"></route></div><div id="riotroot" class="riot-root"><msg-component><h1>message from john to jane</h1></msg-component></div></router></app-route>'){

  console.log('PASSED: promise based server side rendering');
  console.log('Testing string based server side rendering');

  render('app-route', {location: '/user/profile/prateek'}, function (rendered) {
   if(rendered === '<app-route><router show-routes="true"><div id="riotcontainer" class="route-container"><route path="/" component="home"></route> <route path="/error" component="tag-error"></route> <route path="user"><route path="/profile/:user" component="user-component"></route></route> <route path="messages"><route path="/outbox" component="msg-outbox"></route> <route path="/:from-:to"></route> <route path="/.." component="msg-404"></route></route> <route path="/.." component="tag-404"></route></div><div id="riotroot" class="riot-root"><user-component><h1>user component for prateek</h1></user-component></div></router></app-route>'){
    console.log('PASSED: string based server side rendering');
    process.exit(0);
   }
   else{
    console.log('FAILED: string based server side rendering');
    process.exit(1);
   }
  })
 } else {
  console.log('FAILED: promise based server side rendering');
  process.exit(1);
 } 
 
})