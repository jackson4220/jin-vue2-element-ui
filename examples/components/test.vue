<template>
	<div>
		<JinForm
			:model="form"
			ref="form"
			:rules="rules"
			label-width="80px"
			:inline="false"
			size="normal"
		>
		</JinForm>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {},
			rules: [],
		};
	},
	created() {},
	mounted() {},
	methods: {},
};
</script>
<style scoped></style>
