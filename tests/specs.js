/*setup router and app-route*/
var _appTag = document.createElement('app-route');
document.body.appendChild(_appTag);
riot.mount('app-route');

/* end setup */
describe('Router structure tests', function() {
  it('mounts app router tag', function(done) {
    this.timeout(1000);
    setTimeout(function(){
      expect(document.querySelector('h1').innerText).to.be('home');
      done();
    },500);
  });
});