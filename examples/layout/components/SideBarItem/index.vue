<template>
	<div class="menu">
		<template v-for="(item, index) in list">
			<!-- 标题 -->
			<template v-if="item.children && item.children.length">
				<el-submenu :key="item.name" :index="item.name" class="sub-menu-item">
					<template :index="item.name" slot="title">
						<!--            <i :class="item.icon"></i>-->
						<i class="iconfont icon-danganjianying"></i>
						<span>{{ item.name }}</span>
					</template>
					<el-menu-item-group class="menu-item-group">
						<side-bar-item :list="item.children"></side-bar-item>
					</el-menu-item-group>
				</el-submenu>
			</template>
			<!-- 选项 -->
			<template v-else>
				<el-menu-item
					:key="item.name"
					:index="item.name"
					class="menu-item"
					@click="selectItem(item.name, item.path)"
				>
					<!--          <i :class="item.icon"></i>-->
					<i class="iconfont icon-danganjianying"></i>
					<span>{{ item.name }}</span>
				</el-menu-item>
			</template>
		</template>
	</div>
</template>
<script>
export default {
	name: 'SideBarItem',
	props: {
		list: {
			type: Array || '',
		},
	},
	data() {
		return {};
	},
	mounted() {
		this.loadSysMenu();
	},
	methods: {
		loadSysMenu() {},
		selectItem(name, path) {
			this.$router.push({ name });
			this.$store.commit('router/UPDATE_MENU_ACTIVE_NAME', name);
		},
	},
};
</script>
<style lang="scss" scoped>
/* .menu {
	width: 100%;

	.sub-menu-item ::v-deep .el-submenu__title,
	.menu-item {
		height: 60px;
		line-height: 60px;
		text-align: left;
		//padding-left: 30px !important;
		//border-bottom: 1px solid #000;
		//border-right: 1px solid #000;
		color: #fff;
	}

	.sub-menu-item .el-menu-item {
		padding-right: 0;
	}

	::v-deep .el-menu-item .is-active {
		background-color: #0087df;
	}

	.menu-item:hover,
	::v-deep .el-submenu__title:hover {
		background-color: #0087df;
	}

	.menu-item span,
	.sub-menu-item ::v-deep .el-submenu__title > span {
		font-weight: 700;
	}

	.menu-item-group ::v-deep .el-menu-item-group__title {
		padding: 0 !important;
	}

	.menu-item-group .menu-item {
		// background: url('../../assets/img/sidebar_bg.png') no-repeat;
	}

	.el-menu-item-group span {
		font-weight: normal;
	}
} */
</style>
