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
import * as Regexp from '@/JinUtils/modules/regexp';
export default {
	data() {
		return {
			form: {
				name: '',
				phone: '',
				sex: '',
				birthday: '',
				hobbys: [],
				status: 1,
				mark: 0,
				hide: false,
				test: '',
				remark: '',
			},
			options: {
				form: {},
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
						{ match: Regexp.OnlyCh, message: '仅支持中文姓名' },
					],
				},
				{
					type: 'input',
					label: '手机',
					field: 'phone',
					props: { maxLength: 11 },
					rules: [
						{ required: true, message: '请输入手机号' },
						{ match: Regexp.Phone, message: '手机号格式不正确' },
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
						{ label: '电影', value: '01' },
						{ label: '音乐', value: '02' },
						{ label: '旅行', value: '03' },
						{ label: '游戏', value: '04' },
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
					hide: (i) => i.hide && (i.grade = 0),
					return: (i) => i.hide === true,
				},
				{
					type: 'group-title',
					label: '分组标题1',
					field: 'group-title1',
					span: 24,
					item: { labelColStyle: { display: 'none' } },
				},
				/* {
					type: 'cascader',
					label: '城市',
					field: 'city',
					options: cityOptions,
					disabled: (i) => i.status === 0,
				},
				{
					type: 'tree-select',
					label: '部门',
					field: 'dept',
					data: deptData,
					disabled: (i) => i.status === 0,
				}, */
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
						action: '/',
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
