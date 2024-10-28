import Vue from 'vue';
import Router from 'vue-router';
// import Layout from '@/layout';
import store from '@/store';
/**
 * 静态模块路由
 */
import demoRouter from './modules/demo.js'; // 测试页面
// import commonRouter from './modules/common'; // 常用组件
// import TTableRouter from './modules/TTable'; // TTable组件
// import TFormRouter from './modules/TForm'; // TForm组件
// import TQueryConditionRouter from './modules/TQuery'; // 条件查询组件
import { loopRouter } from '~/js';

Vue.use(Router);

const baseRouter = [
	/*  {
		path: '/login',
		component: () => import('@/views/login'),
		hidden: true,
	}, */
	{
		path: '/404',
		name: '404',
		meta: {
			title: '页面不存在..',
		},
		component: () => import('@/views/error/404'),
	},
	/* {
		path: '/:pathMath(.*)',
		component: () => import('@/views/error/404'),
	}, */
];

// 公共路由
export const constantRoutes = [
	demoRouter,

	/* {
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('@/views/JinTable'),
			},
		],
	}, */
	// commonRouter,
	// TTableRouter,
	// TFormRouter,
	// TQueryConditionRouter,
];
const lastRouter = loopRouter(constantRoutes, store.getters.asyncRouter);
store.commit('router/SET_MENU_LIST', lastRouter);

const router = new Router({
	base: '/',
	routes: [...baseRouter, ...lastRouter],
	mode: 'history',
});

// let whiteList = ['login'];
const whiteList = store.getters.whiteList;

router.beforeEach((to, from, next) => {
	const isLogin = store.getters.isLogin;
	const asyncRouter = store.getters.asyncRouter;
	// NProgress.start();
	document.title = String(to.meta.title);
	if (to.name == '404') {
		next();
		return;
	}
	// 登录后逻辑
	if (isLogin) {
		// 判断权限是否通过
		if (asyncRouter.includes(String(to.name))) {
			next();
		} else {
			next({ name: '404' });
		}
		return;
	}

	if (!isLogin) {
		// 未登录逻辑
		if (whiteList.includes(String(to.name))) {
			next();
		} else {
			next({ name: 'login' });
		}
	}
});
// 获取原型对象push函数
const originalPush = Router.prototype.push;

// 获取原型对象replace函数
const originalReplace = Router.prototype.replace;

// 修改原型对象中的push函数
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

// 修改原型对象中的replace函数
Router.prototype.replace = function replace(location) {
	return originalReplace.call(this, location).catch((err) => err);
};

export default router;
