// import Cookies from 'js-cookie';

const state = {
	isLogin: true,
	asyncRouter: ['demo', 'demo-jin-table'], //权限路由name
	whiteList: ['login', '404'], //白名单name
	menuList: [], //菜单列表
};

const mutations = {
	SET_LOGIN: (state, isLogin) => {
		state.isLogin = isLogin;
	},
	SET_ROUTER: (state, asyncRouter) => {
		state.asyncRouter = asyncRouter;
	},
	SET_MENU_LIST: (state, menuList) => {
		state.menuList = menuList;
	},
};

const actions = {
	setLogin({ commit }, isLogin) {
		commit('SET_LOGIN', isLogin);
	},
	setRouter({ commit }, asyncRouter) {
		commit('SET_ROUTER', asyncRouter);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
