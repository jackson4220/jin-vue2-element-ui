<template>
	<div id="app">
		<!-- <img src="./assets/logo.png" /> -->
		test
		<TestC />
	</div>
</template>

<script>
import TestC from './components/TestC.vue';
export default {
	name: 'app',
	components: {
		TestC,
	},
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
