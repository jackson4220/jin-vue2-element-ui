<template>
	<el-table :data="data" :height="height" :border="border">
		<slot></slot>
	</el-table>
</template>

<script>
export default {
	name: 'JinTable',
	props: {
		data: {
			type: Array,
			required: true,
		},
		height: {
			type: [String, Number],
			default: 'auto',
		},
		border: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
