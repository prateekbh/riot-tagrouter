function check(done, f) {
	try {
		f();
		done();
	} catch (e) {
		done(e);
	}
}

describe('Router Test Suite => ', function() {
	describe('Basic setup test: ', function() {
		it('Router, Route and navigate are available', (done) => {
			check(done, () => {
				var _router = document.querySelector('app-route router');
				var _route = document.querySelector('app-route router route');
				var _navigate = document.querySelector('navigate');
				expect(_router._tag).to.be.an('Object');
				expect(_router._tag).to.be.an('Object');
				expect(_navigate._tag).to.be.an('Object');
			});
		});
		it('Navigation is auto started and home is mounted',(done)=>{
			check(done, () => {
				expect(document.querySelector('h1').innerText).to.be.equals('home');
			});
		});
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