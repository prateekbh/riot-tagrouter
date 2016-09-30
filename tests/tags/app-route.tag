<home>
    <h1>home</h1>
	<navigate to='/user/profile/prateek'>Prateek</navigate>
</home>

<msg-component>
	<h1>message from {this.opts.from} to {this.opts.to}</h1>
</msg-component>

<user-component>
	<h1>user component for {this.opts.user}</h1>
</user-component>

<tag-404>
	<h1>Page not found :(</h1>
</tag-404>

<msg-404>
	<h1>Msg not found :(</h1>
</msg-404>

<tag-error>
	<h1>check console for error</h1>
	<script>
		this.on('mount',function(){
			throw new Error('dummy err');
		});
	</script>
</tag-error>

<app-route>
		<router show-routes={true} on-routechange={fireRouteChange} on-tagnotfound={fireTagnotfound}>
				<route path='/' component='home'></route>
				<route path='/error' component='tag-error'></route>
				<route path='user'>
						<route path='/profile/:user' component='user-component'></route>
				</route>
				<route path='messages'>
						<route path='/outbox' component='msg-outbox'></route>
						<route path='/:from-:to' component={this.parent.parent.prplFunc}></route>
						<route path='/..' component='msg-404'></route>
				</route>
				<route path='/..' component='tag-404'></route>
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
