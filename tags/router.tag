<router>
    <yield></yield>
    <script>
        this.setRoute = function(path, component){
            console.log(path, component);
        }

        this.on('mount',(e)=>{
            console.log('router mounted');
        });
        
    </script>
</router>