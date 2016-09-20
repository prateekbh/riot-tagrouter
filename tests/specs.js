/*setup router and app-route*/
var _appTag = document.createElement('app-route');
document.body.appendChild(_appTag);
riot.mount('app-route');

/* end setup */
describe('Router structure tests', function() {
  it('router is a riot tag',function(done){
    this.timeout(1000);
    setTimeout(function(){
      expect(document.querySelector('router')._tag).to.be.an('object');  
      done();
    },500);
  });
  it('route is a riot tag',function(done){
    expect(document.querySelector('route')._tag).to.be.an('object');  
    done();
  });
  it('navigate is a riot tag',function(done){
    expect(document.querySelector('navigate')._tag).to.be.an('object');  
    done();
  });
  it('router should expose getBasePath',function(done){
    expect(document.querySelector('router').getBasePath).to.be.a('function');  
    done();
  });
  it('anchor link should have right link',function(done){
    expect(document.querySelector('navigate > a').getAttribute('href')).to.be(document.querySelector('router').getBasePath()+document.querySelector('navigate').getAttribute('to'));  
    done();
  });
});

describe('Basic navigation tests', function() {
  it('home route works', function(done) {
    expect(document.querySelector('h1').innerText).to.be('home');
    done();
  });
  it('Navigate link works', function(done) {
    var navBtn = document.querySelector('navigate>a');
    navBtn.click();
    expect(document.querySelector('h1').innerText).to.be('user component for prateek');
    expect(window.location.hash).to.be('#user/profile/prateek');
    done();
  });
  it('Back works', function(done){
    this.timeout(200);
    window.history.back();
    setTimeout(function(){
      expect(window.location.hash).to.be('');
      done();
    },100);
    
  });
  it('Promise based navigation works',function(done){
    this.timeout(200);
    riot.route('/messages/john-jane');
    setTimeout(function(){
      expect(document.querySelector('h1').innerText).to.be('message from john to jane');
      done();
    },100);
  });
  it('unmounting is happening',function(done){
    this.timeout(200);
    var _isunmounted = false;
    var currRoute = document.querySelector('msg-component')._tag;
    currRoute.one('unmount',function(){
      _isunmounted = true;
    });
    riot.route('/');
    setTimeout(function(){
      expect(_isunmounted).to.be.equal(true);
      done();
    },100);
  });
});

describe('Events are dispatched', function(){
  var router = document.querySelector('router');
  var appRouter = document.querySelector('app-route');
  it('routeChange event is being fired on tag object and opts as a function',function(done){
    var _isTriggeredOnTag = false;
    var _isTriggeredOnOpts = false;
    this.timeout(100);
    router._tag.one('routeChanged',function(){
      _isTriggeredOnTag = true;
    });
    appRouter._tag.one('routeChanged',function(){
      _isTriggeredOnOpts = true;
    });
    window.history.back();
    setTimeout(function(){
      if(!_isTriggeredOnTag || !_isTriggeredOnOpts){
        expect(false).to.be.equal(true);
      } else if(_isTriggeredOnTag && _isTriggeredOnOpts){
        expect(true).to.be.equal(true);
      } 
      done();
    },50);
  });
  
  it('not found event is being fired on tag object and opts as a function',function(done){
    var _isTriggeredOnTag = false;
    var _isTriggeredOnOpts = false;
    this.timeout(100);
    router._tag.one('tagNotFound',function(){
      _isTriggeredOnTag = true;
    });
    appRouter._tag.one('tagNotFound',function(){
      _isTriggeredOnOpts = true;
    });
    riot.route('/messages/outbox');
    setTimeout(function(){
      if(!_isTriggeredOnTag || !_isTriggeredOnOpts){
        expect(false).to.be.equal(true);
      } else if(_isTriggeredOnTag && _isTriggeredOnOpts){
        expect(true).to.be.equal(true);
      } 
      done();
    },50);
  });
});

describe('check for edge cases',function(){
  it('check for 404s',function(done){
    riot.route('/messages/abc');
    expect(document.querySelector('h1').innerText).to.be.equal('Msg not found :(');
    riot.route('/user/abc');
    expect(document.querySelector('h1').innerText).to.be.equal('Page not found :(');
    done();
  });
  it('check if an error while mounting the tag does not kill the router',function(done){
    window.onerror=undefined;
    riot.route('/error');
    expect(document.querySelector('h1').innerText).to.be.equal('check console for error');
    riot.route('/');
    expect(document.querySelector('h1').innerText).to.be.equal('home');
    done();
  });
});

describe('HTML5 instance of router test', function(){
  it('show routes works',function(done){
    this.timeout(1000);
    riot.route('/');
    var currRouteElems = document.querySelector('route');
    expect(currRouteElems).to.not.be(null);
    document.querySelector('router')._tag.unmount();
    document.querySelector('app-route').innerHTML='<router base-route="/"><route path="/" component="home" ></route></router>';
    riot.mount('router',{});
    setTimeout(function(){
      expect(document.querySelector('.riot-root')).to.not.be(null);
      expect(document.querySelector('route')).to.be(null);
      done();
    },200);
  });

  it('base URL works',function(done){
    this.timeout(1000);
    riot.route('/');
    setTimeout(function(){
      riot.route('/user/profile/prateek');
      expect(window.location.pathname).to.be.equal("/user/profile/prateek");
      done();
    },100);
  });
});