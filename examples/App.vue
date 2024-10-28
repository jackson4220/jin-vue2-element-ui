<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'app',
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
}
</style>
