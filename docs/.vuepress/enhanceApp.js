// enhanceApp.js
//TODO
// import VueHighlightJS from 'vue-highlight.js';
//TODO
// import 'highlight.js/styles/atom-one-dark.css';
import ElementUI from 'element-ui';
// import 'babel-polyfill'
// import Es6Promise from 'es6-promise'
// import Tui from '../../src/components/baseComponents/index.js'
import JinUi from '../../packages';
// import { message } from './public/utils/resetMessage'; // 防止重复点击重复弹出message弹框
// import * as filters from './public/utils/filters' // global filters

//TODO
// import './public/utils/directives'; // 自定义指令
import 'element-ui/lib/theme-chalk/index.css';
//TODO
// import '../.vuepress/public/css/index.scss';
import dayjs from 'dayjs';
// moment.suppressDeprecationWarnings = true; // 去掉警告
// 解决低版本浏览器不支持es6
// Es6Promise.polyfill()
import * as Regexp from '../../packages/js';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 或其他主题

export default ({ Vue, options, router, siteData }) => {
	// Vue.use(VueHighlightJS),
	Vue.use(ElementUI),
		Vue.use(JinUi),
		// (Vue.prototype.$messageUpload = message),
		(Vue.prototype.$message = ElementUI.Message),
		(Vue.prototype.$loading = ElementUI.Loading.service),
		(Vue.prototype.$msgbox = ElementUI.MessageBox),
		(Vue.prototype.$alert = ElementUI.MessageBox.alert),
		(Vue.prototype.$confirm = ElementUI.MessageBox.confirm),
		(Vue.prototype.$prompt = ElementUI.MessageBox.prompt),
		(Vue.prototype.$dayjs = dayjs),
		(Vue.prototype.$Regexp = Regexp);

	// 过滤器
	// Object.keys(filters).forEach(key => {
	//   Vue.filter(key, filters[key])
	// })

	Vue.directive('highlight', {
		deep: true,
		bind(el, binding) {
			const blocks = el.querySelectorAll('pre code');
			blocks.forEach((block) => {
				hljs.highlightBlock(block);
			});
		},
		componentUpdated(el) {
			const blocks = el.querySelectorAll('pre code');
			blocks.forEach((block) => {
				hljs.highlightBlock(block);
			});
		},
	});
};
