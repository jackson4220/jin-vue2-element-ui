<template>
	<div id="app">
		<!-- <img src="./assets/logo.png" /> -->
		<!-- test -->
		<!-- <TestC /> -->
		123
		<router-view />
	</div>
</template>

<script>
// import TestC from './components/TestC.vue';
export default {
	name: 'app',
	components: {
		// TestC,
	},
};
</script>

<style>
html,
body {
	height: 100%;
	width: 100%;
	margin: 0;
	padding: 0;
}
#app {
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	overflow: hidden;
	/* .env_tag {
		position: absolute;
		z-index: 901;
		top: 0;
		right: 0;
		padding: 0 6px;
		background-color: red;
		border-radius: 0 0 0 4px;
		color: #fff;
		font-size: 12px;
	} */
}
</style>
