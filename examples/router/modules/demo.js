/** 常用组件 路由 **/

import Layout from '@/layout';
/* 定义component */
const JinTable = () => import('@/views/demo/JinTable');
const JinForm = () => import('@/views/demo/JinForm');

const demoRouter = {
	path: '/',
	component: Layout,
	redirect: '/jin-table',
	name: 'demo',
	meta: {
		title: '测试页面',
		icon: 'job',
		showMenu: true,
	},
	children: [
		{
			path: 'jin-table',
			name: 'demo-jin-table',
			component: JinTable,
			meta: { title: 'JinTable', showMenu: true },
		},
		{
			path: 'jin-form',
			name: 'demo-jin-form',
			component: JinForm,
			meta: { title: 'JinForm', showMenu: true },
		},
	],
};

export default demoRouter;
