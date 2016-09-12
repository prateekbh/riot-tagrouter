import router from './router.tag';

<app-routes>
    <router>
        <route path='user'>
            <route path='/profile/:user' component='tag-user'></route>
        </route>
        <route path='messages'>
            <route path='/:from-:to' component='tag-msgs'></route>
        </route>
    </router>
    <script>
        this.prplFunc=new Promise((a,b)=>{});
    </script>
</app-routes>
