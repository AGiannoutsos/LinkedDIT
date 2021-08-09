import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from '../store';
import getters from '../store/module-example/getters'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    


    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    
    console.log("ela toraa" ,getters.isLogedin())
    if (to.matched.some(record => record.meta.auth)){
      if( !getters.isLogedin() ){
        next({name: 'error'});
      }
      else next();
    }
    else if (to.matched.some(record => record.meta.authAdmin)){
      if( !getters.isLogedinAdmin() ){
        next({name: 'error'});
      }
      else next();
    }
    else next();
  })

  return Router
})
