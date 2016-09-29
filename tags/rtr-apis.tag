<rtr-apis>
	<h2>APIs</h2>
	<p>
		<div>riot-tagrouter uses the riot's router internally to provide you a declarative layer on top of it, hence it also enable you to use all the functionality of riot's routing library.</div>
		<div>feel free to use riot.route to navigate around</div>
	</p>
	<p>
		However riot-tagrouter comes with following three tags to help you in your entire navigation stuff:
		<ol>
			<li>Navigate: use this as "&lt;navigate to='/path'&gt;your html here&lt;/navigate&gt;. This makes sure that all the routing happening is internal to this SPA only. Use a regular "a" tag to navigate freely outside the app</li>
			<li>Route: use this tag to declare a path and a component against a component or a prosive that resolves to a string naming a component</li>
			<li>Router: The mothership tag that declares all the routes and their callbacks.</li>
		</ol>
	</p>
	<p>

	</p>
</rtr-apis>