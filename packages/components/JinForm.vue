<template>
	<el-form :model="form" :rules="rules" ref="formRef">
		<slot></slot>
	</el-form>
</template>

<script>
export default {
	name: 'CustomForm',
	props: {
		form: {
			type: Object,
			required: true,
		},
		rules: {
			type: Object,
			default: () => ({}),
		},
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
