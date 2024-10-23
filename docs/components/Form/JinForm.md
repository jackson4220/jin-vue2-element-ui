# JinForm 组件

## 介绍

`JinForm` 是一个基于 Element UI 的表单组件，提供了简单易用的接口。

## 基本用法

::: demo 适用广泛的基础表单

```vue
<template>
	<div>
		<JinForm
			v-model="form"
			ref="formRef"
			label-width="80px"
			:inline="false"
			size="normal"
			:options="options"
			:columns="columns"
		>
		</JinForm>
	</div>
</template>

<script>
const cityOptions = [
	{
		value: 'zhinan',
		label: '指南',
		children: [
			{
				value: 'shejiyuanze',
				label: '设计原则',
				children: [
					{
						value: 'yizhi',
						label: '一致',
					},
				],
			},
			{
				value: 'daohang',
				label: '导航',
				children: [
					{
						value: 'cexiangdaohang',
						label: '侧向导航',
					},
				],
			},
		],
	},
	{
		value: 'zujian',
		label: '组件',
		children: [
			{
				value: 'basic',
				label: 'Basic',
				children: [
					{
						value: 'layout',
						label: 'Layout 布局',
					},
				],
			},
			{
				value: 'form',
				label: 'Form',
				children: [
					{
						value: 'radio',
						label: 'Radio 单选框',
					},
				],
			},
			{
				value: 'data',
				label: 'Data',
				children: [
					{
						value: 'table',
						label: 'Table 表格',
					},
				],
			},
			{
				value: 'notice',
				label: 'Notice',
				children: [
					{
						value: 'alert',
						label: 'Alert 警告',
					},
				],
			},
			{
				value: 'navigation',
				label: 'Navigation',
				children: [
					{
						value: 'menu',
						label: 'NavMenu 导航菜单',
					},
				],
			},
			{
				value: 'others',
				label: 'Others',
				children: [
					{
						value: 'dialog',
						label: 'Dialog 对话框',
					},
				],
			},
		],
	},
	{
		value: 'ziyuan',
		label: '资源',
		children: [
			{
				value: 'axure',
				label: 'Axure Components',
			},
		],
	},
];
const deptData = [
	{
		label: '一级 1',
		children: [
			{
				label: '二级 1-1',
				children: [
					{
						label: '三级 1-1-1',
					},
				],
			},
		],
	},
	{
		label: '一级 2',
		children: [
			{
				label: '二级 2-1',
				children: [
					{
						label: '三级 2-1-1',
					},
				],
			},
			{
				label: '二级 2-2',
				children: [
					{
						label: '三级 2-2-1',
					},
				],
			},
		],
	},
	{
		label: '一级 3',
		children: [
			{
				label: '二级 3-1',
				children: [
					{
						label: '三级 3-1-1',
					},
				],
			},
			{
				label: '二级 3-2',
				children: [
					{
						label: '三级 3-2-1',
					},
				],
			},
		],
	},
];
export default {
	/* components: {
		JinForm,
	}, */
	data() {
		return {
			form: {
				name: '123',
				phone: '456',
				sex: 1,
				birthday: '',
				hobbys: [1],
				status: 1,
				mark: 0,
				hide: false,
				test: '',
				remark: '',
				slider: 50,
				grade: 0,
				sort: 0,
				city: [],
				dept: [],
				file: [
					'https://inews.gtimg.com/om_bt/Os3eJ8u3SgB3Kd-zrRRhgfR5hUvdwcVPKUTNO6O7sZfUwAA/641',
				],
			},
			options: {
				form: {
					labelWidth: '80px',
					size: 'mini',
				},
				btns: { hide: true },
				col: { xs: 24, sm: 12 },
			},
			columns: [
				{
					type: 'group-title',
					label: '基本信息',
					field: 'base-title',
					span: 24,
					item: { labelColStyle: { display: 'none' } },
				},
				{
					type: 'input',
					label: '姓名',
					field: 'name',
					props: { maxLength: 4 },
					rules: [
						{ required: true, message: '请输入姓名' },
						{ maxLength: 4, message: '姓名不超过4个字符' },
						{ match: this.$regexp.OnlyCh, message: '仅支持中文姓名' },
					],
				},
				{
					type: 'input',
					label: '手机',
					field: 'phone',
					props: { maxLength: 11 },
					rules: [
						{ required: true, message: '请输入手机号' },
						{ match: this.$regexp.Phone, message: '手机号格式不正确' },
					],
				},
				{
					type: 'select',
					label: '性别',
					field: 'sex',
					options: [
						{ label: '男', value: 1 },
						{ label: '女', value: 0 },
					],
				},
				{
					type: 'date-picker',
					label: '生日',
					field: 'birthday',
				},
				{
					type: 'checkbox-group',
					label: '爱好',
					field: 'hobbys',
					span: 24,
					options: [
						{ label: '电影', value: '1' },
						{ label: '音乐', value: '2' },
						{ label: '旅行', value: '3' },
						{ label: '游戏', value: '4' },
					],
				},
				{
					type: 'input-number',
					label: '排序',
					field: 'sort',
					props: { min: 0 },
				},
				{
					type: 'radio-group',
					label: '状态',
					field: 'status',
					options: [
						{ label: '启用', value: 1 },
						{ label: '禁用', value: 0 },
					],
				},
				{
					type: 'input',
					label: '测试',
					field: 'test',
					disabled: (i) => i.status === 0,
					item: { extra: '查看这里效果请切换状态' },
				},
				{
					type: 'rate',
					label: '评分',
					field: 'mark',
				},
				{
					type: 'switch',
					label: '是否隐藏',
					field: 'hide',
					item: { extra: '隐藏成绩项' },
				},
				{
					type: 'slider',
					label: '成绩',
					field: 'grade',
					span: 24,
					hide: (i) => {
						i.hide && (i.grade = 0);
						return i.hide === true;
					},
				},
				{
					type: 'group-title',
					label: '分组标题1',
					field: 'group-title1',
					span: 24,
					item: { labelColStyle: { display: 'none' } },
				},
				{
					type: 'cascader',
					label: '城市',
					span: 10,
					field: 'city',
					options: cityOptions,
					disabled: (i) => i.status === 0,
				},
				{
					type: 'tree-select',
					label: '部门',
					field: 'dept',
					span: 24,
					data: deptData,
					props: {
						defaultProps: {
							children: 'children',
							label: 'label',
						},
					},
					disabled: (i) => i.status === 0,
				},
				{
					type: 'group-title',
					label: '分组标题2',
					field: 'group-title2',
					span: 24,
					item: { labelColStyle: { display: 'none' } },
				},
				{
					type: 'textarea',
					label: '备注',
					field: 'remark',
					span: 24,
					item: { extra: '这里是额外信息' },
				},
				{
					type: 'upload',
					label: '附件',
					field: 'file',
					span: 24,
					props: {
						listType: 'picture-card',
						action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
						headers: {
							Token: '12456',
						},
					},
					item: {
						extra: '上传文件只支持zip、rar、doc、docx、pdf、jpg、png格式',
					},
				},
			],
		};
	},
	created() {},
	mounted() {},
	methods: {},
};
</script>
<style scoped></style>
```

:::
