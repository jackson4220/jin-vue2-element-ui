<template>
	<el-button :type="type" @click="handleClick">
		<slot></slot>
	</el-button>
</template>

<script>
export default {
	name: 'MyButton',
	props: {
		type: {
			type: String,
			default: 'primary',
		},
	},
	methods: {
		handleClick() {
			this.$emit('click');
		},
	},
};
</script>
