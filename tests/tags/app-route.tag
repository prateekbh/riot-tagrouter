<app-route>
		<router>
				<route path='user'>
						<route path='/profile/:user' component='user-component'></route>
				</route>
				<route path='messages'>
						<route path='/outbox' component='msg-outbox'></route>
						<route path='/:from-:to' component='{prplFunc}'></route>
				</route>
		</router>
		<script>
				this.prplFunc=function(){
					return new Promise((resolve, reject)=>{
						console.log('lazy fetch here');
						resolve('msg-component');
					});
				}
		</script>
</app-route>

<msg-component>
    <h1> message component </h1>
</msg-component>

<user-component>
    <h1>user component</h1>
</user-component>