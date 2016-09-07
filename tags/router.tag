<router>
    <yield></yield>
    <div class="riot-root">
    </div>
    <script>
        var $appRoot = null;
        var currTag = null;

        function unmountCurrRoute(){
            if(currTag){
                console.log(currTag);
                debugger;
            }
        }

        function createRouteWithTagName(tagName){
            $appRoot.innerHTML = '<'+tagName+' class="route-'+tagName+'"></'+tagName+'>';
            var mountedTag = riot.mount(tagName+'.'+tagName);
            if(mountedTag.length === 0){
                throw (new Error('Riot Element Not Found')); 
            }
            else{
                unmountCurrRoute();
                currTag = mountedTag[0];
            }
        }

        function changeRoute(newRoute){
            if(typeof(newRoute) === 'string'){
                createRouteWithTagName(newRoute)
            } else if (window.Promise && Promise.resolve(newRoute) === newRoute){
                //PRPL function
            }
        }

        this.setRoute = function(path, component){
            riot.route(path,()=>{
                changeRoute(component);
            });
        }

        this.on('mount',(e)=>{
            console.log('router mounted');
            $appRoot = this.root.querySelector('.riot-root');
            riot.route.start(true);
        });
        
    </script>
</router>