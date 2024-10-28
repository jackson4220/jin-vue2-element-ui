<template>
	<div class="layout-view">
		<div class="layout-view-left">
			<LayoutBar />
		</div>
		<div class="layout-view-main">
			<router-view />
		</div>
	</div>
</template>

<script>
import LayoutBar from './components/LayoutBar';
export default {
	name: 'Layout',
	components: {
		LayoutBar,
	},
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {},
};
</script>
<style lang="scss" scoped>
.layout-view {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	.layout-view-main {
		flex: 1;
		overflow: auto;
	}
}
</style>
