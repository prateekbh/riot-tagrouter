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
});

describe('Basic navigation tests', function() {
  it('home route works', function(done) {
    expect(document.querySelector('h1').innerText).to.be('home');
    done();
  });
});

/**		
* Test cases:		
* Router exist		
* Route exist		
* Navigate exist		
* Home navigation works		
* Promise based navigation works		
* RouteChanged event is fired		
* Not found event is fired		
* unmounting of tags are happening		
* Error in mount of tag does not kill Router		
* showRoutes works		
* baseUrl works
*/