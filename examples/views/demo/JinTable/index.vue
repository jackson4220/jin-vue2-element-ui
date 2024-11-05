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
import { allFields } from './allField.js';
import tableMixins from '~/mixins/table.js';
import {
	options as searchFieldOptions,
	columns as searchFieldColumns,
} from './searchField.js';
export default {
	mixins: [tableMixins],
	data() {
		return {
			allFields,
			searchFieldOptions,
			searchFieldColumns,
			filters: {
				status: 0,
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
