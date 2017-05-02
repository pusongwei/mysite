// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Resource from 'vue-resource'
import App from './App'
import router from './router'
import Swiper from 'vue-awesome-swiper'
import quillEditor from 'vue-quill-editor'
Vue.use(quillEditor)
Vue.use(Resource)
Vue.use(Vuex)
Vue.use(Swiper)
Vue.config.productionTip = false
var store = new Vuex.Store({

    state:{
        loadingShow : false
    },
    mutations:{
        showUserName( event,flag){
            store.state.loadingShow = flag;
        }
    }
})
Vue.http.interceptors.push((request, next)  =>{
  store.commit('showUserName',true);

  next((response) => {

    store.commit('showUserName',false);
    return response;
  });

});
new Vue({
	el: '#app',
	components: {Swiper},
	router,
	store:store,
	methods: {
	onSlideChangeStart (currentPage) {
		
		},
	onSlideChangeEnd (currentPage) {
		
		}
	},
	template: '<App/>',
	components: { App }
})
