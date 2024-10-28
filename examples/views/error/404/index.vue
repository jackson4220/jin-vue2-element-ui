<template>
	<div class="error-page">
		<el-row type="flex" justify="center" align="middle" class="error-container">
			<el-col :span="12">
				<div class="error-content">
					<i
						class="el-icon-warning"
						style="font-size: 100px; color: #f56c6c"
					></i>
					<h1 class="error-title">404</h1>
					<p class="error-message">页面未找到</p>
					<el-button type="primary" @click="goHome">返回首页</el-button>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	methods: {
		goHome() {
			this.$router.push('/');
		},
	},
};
</script>

<style lang="scss" scoped>
.error-page {
	height: 100vh;
	background-color: #f0f2f5;
}

.error-container {
	height: 100%;
}

.error-content {
	text-align: center;
}

.error-title {
	font-size: 80px;
	color: #333;
	margin: 20px 0;
}

.error-message {
	font-size: 24px;
	color: #666;
	margin-bottom: 30px;
}
</style>
