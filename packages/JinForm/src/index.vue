<template>
	<el-form :model="form" :rules="rules" ref="formRef">
		<slot></slot>
	</el-form>
</template>

<script>
export default {
	name: 'JinForm',
	props: {},
	data() {
		return {
			form: {},
			rules: {},
		};
	},
	methods: {
		validate(callback) {
			this.$refs.formRef.validate(callback);
		},
		resetFields() {
			this.$refs.formRef.resetFields();
		},
	},
};
</script>
