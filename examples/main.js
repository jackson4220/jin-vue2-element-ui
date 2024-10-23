import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import JinUi from '../packages';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(JinUi);

new Vue({
	render: (h) => h(App),
}).$mount('#app');
