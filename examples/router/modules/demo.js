/** 常用组件 路由 **/

import Layout from '@/layout';
/* 定义component */
const JinTable = () => import('@/views/JinTable');

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
			path: 'test66',
			name: 'test66',
			component: JinTable,
			meta: { title: 'JinTable', showMenu: true },
		},
	],
};

export default demoRouter;
