import router from './router.tag';

<app-routes>
    <router>
        <route path='user' component='user'>
            <route path='/profile/*' component={prplFunc}></route>
        </route>
    </router>
    <script>
        this.prplFunc=new Promise((a,b)=>{});
    </script>
</app-routes>