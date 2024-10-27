import JinForm from './JinForm';
import JinSelect from './JinSelect';
import JinCheckbox from './JinCheckbox';
import JinRadio from './JinRadio';

// import JinStickyTable from './JinStickyTable';
import JinTable from './JinTable';
import JinImage from './JinImage';

import pkg from '../package.json'; // 使用默认导出
const { version } = pkg; // 解构获取 version

// 存储组件列表
const components = [
	JinForm,
	JinSelect,
	JinCheckbox,
	JinRadio,
	// JinStickyTable,
	JinImage,
	JinTable,
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
	// 判断是否安装
	if (install.installed) return;
	install.installed = true;
	// 遍历注册全局组件
	components.map((component) => Vue.component(component.name, component));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}
// 按需引入
export {
	JinForm,
	JinSelect,
	JinCheckbox,
	JinRadio,
	// JinStickyTable,
	JinImage,
	JinTable,
};
export default {
	version,
	...components,
	// 导出的对象必须具有 install，才能被 Vue.use() 方法安装
	install,
};
