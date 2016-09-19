<home>
    <h1>home</h1>
	<navigate to='/user/profile/prateek'>Prateek</navigate>
</home>

<msg-component>
    <h1>message component</h1>
</msg-component>

<user-component>
	<h1>user component for {this.opts.user}</h1>
</user-component>

<app-route>
		<router show-routes={true} on-routechange={fireRouteChange} on-tagnotfound={fireTagnotfound}>
				<route path='/' component='home'></route>
				<route path='user'>
						<route path='/profile/:user' component='user-component'></route>
				</route>
				<route path='messages'>
						<route path='/outbox' component='msg-outbox'></route>
						<route path='/:from-:to' component='{prplFunc}'></route>
				</route>
				<dummy></dummy>
		</router>
		<script>
			var self=this;
			this.prplFunc = function(){
				return new Promise(function(resolve, reject){
					//do webpack.require here
					resolve('msg-component');
				});
			}

			this.fireRouteChange = function(){
				self.trigger('routeChanged');
			}

			this.fireTagnotfound = function(){
				self.trigger('tagNotFound');
			}
		</script>
</app-route>
