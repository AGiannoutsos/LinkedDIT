import { store } from 'quasar/wrappers'
import { Vuex, createStore } from 'vuex'
import state from './module-example/state'
import getters from './module-example/getters'
import mutations from './module-example/mutations'
import actions from './module-example/actions'
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// export default new Vuex.Store({
  
// })

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state,
    getters,
    mutations,
    actions,
  })

  return Store
})
