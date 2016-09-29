<rtr-isomorphism>
	<h2>ISOMORPHIC apps with riot-tagrouter</h2>
	<p>
		Riot router has been built ground up while keeping in mind #isomorphism.
		<div>
			Lets say my-tag.tag implements router tag inside it. e.g.
		</div>
		<blockquote>
				<div>&lt;my-tag&gt;</div>
					<div>&nbsp;&nbsp;&lt;router&gt;</div>
						<div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path ='/' component="rtr-home"/&gt;</div>
						<div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path ='/apis' component="rtr-apis"/&gt;</div>
						<div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path ='/isomorphism' component="rtr-isomorphism"/&gt;</div>
						<div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;route path ='/prpl' component="rtr-prpl"/&gt;</div>
					<div>&nbsp;&nbsp;&lt;/router&gt;</div>
				<div>&lt;/my-tag&gt;</div>
		</blockquote>
		<div>
			in this case with the help of <a target="_blank" href='https://github.com/ilearnio/riot-ssr'>riot-ssr</a>, a simple riot.render('my-tag',{location:urlToRender}); would yield the exact code that your page needs.
		</div>
		<div>
			also your page itself just needs this yielded code and not the my-tag itself. For reference check this page's source itself :)
		</div>
		<div>&nbsp;</div>
		<div>&nbsp;</div>
		<div>
			P.S.: Its highly advised to use router tag inside another riot tag to capture its event/ provide function based components 
		</div>
	</p>
</rtr-isomorphism>