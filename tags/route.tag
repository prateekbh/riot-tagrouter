<route>
		<script>
				this.on('mount',(e)=>{
						//this.parent.setRoute(this.opts.path)
						console.log('mounting',this.opts);
				});

				//recursive function provider
				this.setRoute = function(path, component){
					console.log('sending',this.opts);
				}
		</script>
</route>