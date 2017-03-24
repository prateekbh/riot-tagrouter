<route>
		<yield/>
		<script>
				this.on('mount',(e) => {
						if(Object.keys(this.tags).length===0){
							this.parent && this.parent.setRoute && this.parent.setRoute(this.opts.path, this.opts.component );
						}
				});

				//recursive function provider
				this.setRoute = function(path, component){
					this.parent && this.parent.setRoute && this.parent.setRoute(this.opts.path + path, component );
				}
		</script>
</route>