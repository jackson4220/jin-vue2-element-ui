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
