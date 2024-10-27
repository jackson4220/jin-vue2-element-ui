/** 常用组件 路由 **/

import Layout from '@/layout';
/* 定义component */
const JinTable = () => import('@/views/JinTable');

const demoRouter = {
	path: '/',
	component: Layout,
	redirect: '/jin-table',
	name: '测试页面',
	meta: {
		title: '测试页面',
		icon: 'job',
	},
	children: [
		{
			path: 'jin-table',
			name: 'test',
			component: JinTable,
			meta: { title: 'TTable高度自适应' },
		},
	],
};

export default demoRouter;
