<template>
	<div>
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
import { allFields } from './allFiles.js';
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
		console.log(this.allFields);
	},
	methods: {
		handleTapProp() {},
	},
};
</script>
<style scoped></style>
