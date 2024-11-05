# JinTable 组件

## 介绍

`JinTable` 是一个基于 Element UI 的表格组件，提供了简单易用的接口。

## 使用示例

```vue
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
export default {
	data() {
		return {
			filters: {
				status: 1,
			}, // 查询表单的数据
		};
	},
	async mounted() {
		const { allFields } = await import('./allField.js');
		const tableMixins = await import('../../../packages/mixins/table.js');
		const { options: searchFieldOptions, columns: searchFieldColumns } =
			await import('./searchField.js');

		this.allFields = allFields;
		this.searchFieldOptions = searchFieldOptions;
		this.searchFieldColumns = searchFieldColumns;
		this.mixins = [tableMixins.default];
	},
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
```

</details>

## 属性

| 参数 | 说明     | 类型  | 可选值 | 默认值 |
| ---- | -------- | ----- | ------ | ------ |
| data | 表格数据 | Array | —      | []     |

## 事件

| 事件名    | 说明                         | 参数               |
| --------- | ---------------------------- | ------------------ |
| row-click | 当某一行被点击时会触发该事件 | row, event, column |

## 插槽

| 插槽名 | 说明           |
| ------ | -------------- |
| —      | 自定义列的内容 |
