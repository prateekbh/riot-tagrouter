<navigate>
    <a href='{document.querySelector('router').getBasePath()+opts.to}' onclick={nagivateToRoute}>
        <yield></yield>
    </a>
    <script>
        var self = this;
        this.nagivateToRoute = function(e){
            e.preventDefault();
            riot.route(self.opts.to,self.opts.title||null,self.opts.replace?true:false);
        }
    </script>
</navigate>