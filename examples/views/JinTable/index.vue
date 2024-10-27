<template>
	<div>
		123
		<JinTable
			:list="list"
			:loading="loading"
			:pager="pager"
			:show-fields="showFields"
			:show-selection="true"
			@handleCurrentChange="handleCurrentChange"
			@handleSelectionChange="handleSelectionChange"
			@handleSizeChange="handleSizeChange"
			@tapProp="handleTapProp"
		/>
	</div>
</template>

<script>
import { allFields } from './all-file.js';
import tableMixins from '~/mixins/table.js';

export default {
	mixins: [tableMixins],
	data() {
		return {
			allFields,
		};
	},
	watch: {},
	mounted() {
		console.log(123);
	},
	methods: {
		handleTapProp() {},
	},
};
</script>
<style scoped></style>
