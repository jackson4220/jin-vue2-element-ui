<template>
	<div class="box">
		<JinForm
			v-model="filters"
			ref="formRef"
			label-width="80px"
			:inline="false"
			size="normal"
			:options="searchFieldOptions"
			:columns="searchFieldColumns"
			@reset="searchReset"
			@search="getList"
		>
		</JinForm>
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
import { allFields } from '../../../../../examples/views/demo/JinTable/allField.js';
import tableMixins from '../../../../../packages/mixins/table.js';
import {
	options as searchFieldOptions,
	columns as searchFieldColumns,
} from '../../../../../examples/views/demo/JinTable/searchField.js';
export default {
	name: 'JinTableT',
	mixins: [tableMixins],
	data() {
		return {
			allFields,
			searchFieldOptions,
			searchFieldColumns,
			filters: {
				status: 1,
			}, // 查询表单的数据
		};
	},
	watch: {},
	mounted() {},
	methods: {
		handleTapProp() {},
	},
};
</script>
<style lang="scss" scoped>
.box {
	width: 100%;
}
</style>
