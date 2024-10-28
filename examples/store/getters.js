const getters = {
	// sidebar: state => state.app.sidebar,
	isLogin: (state) => state.router.isLogin,
	asyncRouter: (state) => state.router.asyncRouter,
	whiteList: (state) => state.router.whiteList,
	menuList: (state) => state.router.menuList,
	activeName: (state) => state.router.activeName,
};
export default getters;
