import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import horizontalScroll from 'el-table-horizontal-scroll';
import 'element-ui/lib/theme-chalk/index.css';
import JinUi from '../packages';
import store from './store';

Vue.config.productionTip = false;

Vue.use(horizontalScroll);
Vue.use(ElementUI);
Vue.use(JinUi);

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
