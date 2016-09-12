import router from './router.tag';

<app-routes>
    <router>
        <route path='user' component='user'>
            <route path='/profile/:user' component={prplFunc}></route>
        </route>
        <route path='messages' component='user'>
            <route path='/:from-:to' component={prplFunc}></route>
        </route>
    </router>
    <script>
        this.prplFunc=new Promise((a,b)=>{});
    </script>
</app-routes>
