<template>
	<el-menu
		class="menu-wrap"
		:default-active="menuActiveName || 'home'"
		:active="menuActiveName || 'home'"
		:collapse="sidebarFold"
		:collapseTransition="false"
		:unique-opened="true"
		@select="selectItem"
	>
		<template>
			<el-menu-item @click="sidebarFold = !sidebarFold">
				<i v-show="!sidebarFold" class="el-icon-s-fold"></i>
				<i v-show="sidebarFold" class="el-icon-s-unfold"></i>
				<span slot="title" class="sidebar-one">导航列表</span>
			</el-menu-item>
		</template>
		<!--    <side-bar-item :list="menuList"></side-bar-item>-->
		<template v-for="(item, index) in menuList" class="menu">
			<!-- 标题 -->
			<template v-if="item.children.length">
				<el-submenu :key="index" :index="item.name" class="sub-menu-item">
					<template :index="item.index" slot="title">
						<!--            <i :class="item.icon"></i>-->
						<i class="iconfont icon-danganjianying"></i>
						<span>{{ item.name }}</span>
					</template>
					<el-menu-item-group class="menu-item-group">
						<SideBarItem :list="item.children"></SideBarItem>
					</el-menu-item-group>
				</el-submenu>
			</template>
			<!-- 选项 -->
			<template v-else>
				<el-menu-item :key="index" :index="item.name" class="menu-item">
					<!--          <i :class="item.icon"></i>-->
					<i class="iconfont icon-danganjianying"></i>
					<span>{{ item.name }}</span>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script>
export default {
	name: 'LayoutBar',
	components: {
		SideBarItem: () => import('@/layout/components/SideBarItem'),
	},
	data() {
		return {};
	},
	mounted() {},
	methods: {
		selectItem(name, path) {
			// alert(name)
			// this.$router.push(path);
			// this.$store.commit('common/updateMenuActiveName', name);
		},
	},
	computed: {
		/* menuList: {
			get() {
				return this.$store.state.router.menuList;
			},
			set(val) {
				// this.$store.commit('common/updateMenuList', val);
			},
		}, */
		menuList() {
			return this.$store.state.router.menuList;
		},
		menuActiveName: {
			get() {
				// return this.$store.state.common.menuActiveName;
			},
			set(val) {
				// this.$store.commit('common/updateMenuActiveName', val);
			},
		},
		sidebarFold: {
			get() {
				// return this.$store.state.common.sidebarFold;
			},
			set(val) {
				// this.$store.commit('common/updateSidebarFold', val);
			},
		},
	},
};
</script>
<style lang="scss" scoped>
/* .menu-wrap {
	width: 200px;
	min-height: 1020px;
	// background: url('../../assets/img/sidebar_bg.png') no-repeat;
	background-size: 100% 100%;
}

::v-deep .el-menu {
	background-color: transparent !important;
	.iconfont {
		font-size: 18px;
		vertical-align: sub;
		margin-right: 5px;
		display: inline-block;
		width: 20px;
		text-align: center;
	}
}

::v-deep .el-menu-item,
::v-deep .el-submenu__title {
	color: #fff;

	.iconfont {
		color: #fff;
	}
}

::v-deep .el-menu-item span,
::v-deep .el-submenu__title span {
	padding-left: 10px;
}

::v-deep .el-menu-item.is-active {
	-webkit-box-shadow: inset 5px 100px 0px -2px #0064b6;
	box-shadow: inset 5px 100px 0px -2px #0064b6;
}

::v-deep .el-submenu__title:hover,
::v-deep .el-menu-item:hover {
	background: #0064b6;
}

::v-deep .el-menu-item-group__title {
	padding: 0;
} */
</style>
