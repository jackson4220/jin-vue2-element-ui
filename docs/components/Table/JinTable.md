# JinTable 组件

## 介绍

`JinTable` 是一个基于 Element UI 的表格组件，提供了简单易用的接口。

## 使用示例

<details>
<summary>点击查看代码示例</summary>

```vue
<template>
	<JinTable :data="tableData">
		<el-table-column prop="date" label="日期" width="180"></el-table-column>
		<el-table-column prop="name" label="姓名" width="180"></el-table-column>
		<el-table-column prop="address" label="地址"></el-table-column>
	</JinTable>
</template>

<script>
export default {
	data() {
		return {
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				// 更多数据...
			],
		};
	},
};
</script>
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
