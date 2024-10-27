<template>
	<el-container>
		<el-header>
			<div class="header">顶部导航栏</div>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<div class="sidebar">侧边栏</div>
			</el-aside>
			<el-main>
				<!-- <div class="main-content">主内容区</div> -->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	name: 'LayoutExample',
};
</script>

<style scoped>
.header {
	background-color: #409eff;
	color: white;
	text-align: center;
	padding: 15px;
}

.sidebar {
	background-color: #f5f5f5;
	padding: 15px;
}

.main-content {
	padding: 15px;
}
</style>
