/**
 * 权限校验：
 *  Vue Router中的 前置钩子函数 beforeEach(to, from, next)
 * 当进行路由跳转之前，进行判断 是否已经登录 过，登录过则允许访问非登录页面，否则 回到登录页
 * 
 * to:  即将要进入的目标路由对象
 * from: 即将要离开的路由对象
 * next: 是一个方法，可以指定路由地址，进行路由跳转
 */

 import router from './router'
 import store from './store'

router.beforeEach((to, from , next) => {
    // 1. 获取token
    const token = store.state.user.token
    console.log('token', token)
    
    if(!token) {
        // 1.1 如果没有获取到，
        // 要访问非登录页面，则不让访问，加到登录页面 /login
        if(to.path !== '/login') {
            next({path: '/login'})
        }else {
            // 请求登录页面 /login
            next()
        }
    }else {
        // 1.2 获取到token, 
        // 1.2.1 请求路由 /login ，那就去目标路由
        if(to.path === '/login') {
            next()
        }else {
            // 1.2.2 请求路由非登录页面，先在本地查看是否有用户信息，
     
            const userInfo = store.state.user.user 
            console.log('userInfo', userInfo)
            if(userInfo) {
                // 本地获取到，则直接让它去目标路由
                next()
            }else {
                console.log('获取用户信息')
                // 如果本地没有用户信息， 就通过token去获取用户信息，
                store.dispatch('GetUserInfo').then(response => {
                    if(response.flag) {
                        next()
                    }else {
                        next({path: '/login'})
                    }
                }).catch(error => {

                })
            }
            
        }
    }
    

 })