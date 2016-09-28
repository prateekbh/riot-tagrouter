<rtr-header>
	<nav>
    <material-tabs tabchanged={changeRoute} tabs="[\{title:'Home'\},\{title:'APIs'\},\{title:'Isomorphism'\},\{title:'PRPL'\}]"></material-tabs>
  </nav>
 <div id='logo'>&lt;Router /&gt;</div> 
	<h1>A declarative router for <a href='http://riotjs.com'>RiotjS</a></h1>
	<script>
		this.changeRoute=function(e){
			var route = e.title.toLowerCase();
			route === "home" ? route ='' : route = route;
			riot.route(route);
		}
	</script>
</rtr-header>