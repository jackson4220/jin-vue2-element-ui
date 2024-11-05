# JinTable 组件

## 介绍

`JinTable` 是一个基于 Element UI 的表格组件，提供了简单易用的接口。

## 使用示例

<Demo-JinTableT-index/>

## 代码

#### mixins

```js
import { omit, cloneDeep, debounce } from 'lodash';
import { getOriValue } from '../js';
const successCode = [0];

export default {
	data() {
		return {
			model: {
				isReplaceRouter: true,
			},

			loading: false,
			list: [], // 列表数据
			pager: {
				// 分页
				size: 10,
				page: 1,
				total: 0,
			},
			isFirst: true,
			showFields: [],

			multipleSelection: [],
		};
	},
	async mounted() {
		const query = this.$route.query;
		Object.keys(query).forEach((key) => {
			query[key] = getOriValue(query[key]);
		});

		if (this.model?.size) {
			this.pager.size = this.model.size;
		} else {
			this.pager.size = +(query.size || 10);
		}
		this.pager.page = +(query.page || 1);

		//有的页面读取地址栏的参数传给接口会有问题出现，默认读取<不写isGetUrlParams>
		if (this.model && !this.model.isGetUrlParams) {
			const params = omit(query, ['size', 'page']);
			this.filters = { ...this.filters, ...params };
			for (const key in this.filters) {
				if (
					this.filters[key] &&
					typeof this.filters[key] === 'string' &&
					this.filters[key].includes(',')
				) {
					this.filters[key] = this.filters[key].split(',');
				}
			}
		} else {
			this.filters = { ...this.filters };
			//检测是否能split(,)，如果能split(,)，则转换为数组
			for (const key in this.filters) {
				if (
					this.filters[key] &&
					typeof this.filters[key] === 'string' &&
					this.filters[key].includes(',')
				) {
					this.filters[key] = this.filters[key].split(',');
				}
			}
		}

		if (typeof this.init === 'function') {
			await this.init();
		}

		await this.initShowFields();

		//只需要上面的字段显示，不需要列表的情况不加这个会报警告
		if (JSON.stringify(this.model) == '{}') {
			return;
		}
		//有的并不需要一进来就call getList(),这里加一层断层，避免无用call Get API。【默认不写“isBreak”兼容之前的写法】
		if (this.model && this.model.isBreak) return;
		await this.getList();
	},
	methods: {
		searchReset() {
			this.filters = {};
			this.getList();
		},
		async initShowFields(th = []) {
			let allFields = cloneDeep(this.allFields);
			allFields = allFields.map((item) => {
				if (this.formatterMap && this.formatterMap[item.prop]) {
					item.formatter = this.formatterMap[item.prop];
				}
				return item;
			});

			const array = [];
			if (th.length) {
				th.forEach((item) => {
					const aItem = allFields.find((aItem) => item === aItem.prop);
					if (aItem) {
						array.push(aItem);
					}
				});
				this.showFields = array;
			} else {
				this.showFields = allFields;
			}
		},

		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		/**
		 * 每页显示条数变化
		 * @param size
		 */
		async handleSizeChange(size) {
			this.pager.page = 1;
			this.pager.size = size;
			this.getList();
			this.initShowFields();
		},
		/**
		 * 页码变化
		 * @param page
		 */
		handleCurrentChange(page) {
			this.pager.page = page;
			this.getList();
		},
		getSearchParams(filters) {
			const params = {};
			const obj = cloneDeep(filters);
			for (const key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					let value = obj[key];

					// 字符串剔除前后空格
					if (typeof value === 'string') {
						value = value.replace(/(^\s*)|(\s*$)/g, '');
					}
					if (value !== '' && value !== null) {
						if (Array.isArray(value)) {
							if (value.length > 0) {
								params[key] = value.join(',');
							}
						} else {
							params[key] = value;
						}
					}
				}
			}
			return params;
		},
		replaceRouter(pager, filters) {
			this.$router.replace({
				path: this.$route.path,
				query: {
					...omit(pager, ['total']),
					...filters,
				},
			});
		},
		async getFilters() {
			let filters = {};
			if (typeof this.hanldeFilters === 'function') {
				filters = await this.hanldeFilters();
			} else {
				filters = cloneDeep(this.filters);
			}

			if (
				this.model &&
				typeof this.model.isClearEmpty !== 'undefined' &&
				!this.model.isClearEmpty
			) {
				return filters;
			}
			return this.getSearchParams(filters);
		},
		async getList() {
			try {
				const params = await this.getFilters();
				const args = { ...params, ...this.pager };
				delete args.total;
				this.isFirst = false;
				if (
					this.model &&
					typeof this.model.isReplaceRouter !== 'undefined' &&
					this.model.isReplaceRouter
				) {
					this.replaceRouter(this.pager, params);
				}

				this.loading = true;
				// 回调函数，加载同步处理
				if (this.model && this.model.beforeLoadFun) {
					try {
						this.model.beforeLoadFun(args);
					} catch (err) {
						console.log(err);
					}
				}

				let res = null;
				if (
					this.model &&
					this.model.requestFun &&
					typeof this.model.requestFun === 'function'
				) {
					res = await this.model.requestFun(args);
				} else {
					this.$message.error('缺少表单请求方法');
				}

				if (res && successCode.includes(res.errorCode)) {
					this.multipleSelection = [];
					if (this.model.isData) {
						if (typeof this.formatListFn === 'function') {
							this.list = this.formatListFn(res.data);
						} else {
							this.list = res.data;
						}
						this.pager.total = this.list.length;
					} else {
						// 默认
						if (typeof this.formatListFn === 'function') {
							this.list = this.formatListFn(res.data.list);
						} else {
							this.list = res.data.list;
						}
						this.pager.total = res.data.total;
					}

					// 回调函数，加载同步处理
					if (this.model.afterLoadFun) {
						try {
							this.model.afterLoadFun();
						} catch (err) {
							console.log(err);
						}
					}
				}
			} catch (e) {
				console.log(e);
			} finally {
				this.loading = false;
			}
		},
		normalSearch: debounce(
			async function () {
				this.pager.page = 1;
				this.getList();
			},
			500,
			{
				leading: false,
				trailing: true,
			}
		),
	},
};
```

#### 表格内容项 allFields

```js
export const allFields = [
	{
		label: '违规编码',
		prop: 'violNo',
		fixed: false,
		required: true,
		sortable: false,
	},
	{
		label: '违规类型',
		prop: 'type',
		fixed: false,
		required: true,
		sortable: false,
		formatter: (row, store) => {
			return row.type?.name || '--';
		},
	},
	{
		label: '违规来源',
		prop: 'source',
		fixed: false,
		required: true,
		sortable: false,
		map: {
			1: '人工巡检',
			2: 'AI巡检',
		},
	},
	{
		label: '违规截图',
		prop: 'imgUrl',
		fixed: false,
		required: true,
		sortable: false,
		isUiImage: true,
		width: '120',
		showOverflowTooltip: false,
	},
	{
		label: '违规说明',
		prop: 'remarks',
		fixed: false,
		required: true,
		sortable: false,
	},
	{
		label: '发现时间',
		prop: 'createTime',
		fixed: false,
		required: true,
		sortable: false,
		dateFmt: 'YYYY-MM-DD HH:mm:ss',
	},
	{
		label: '状态',
		prop: 'state',
		fixed: false,
		required: true,
		sortable: false,
		map: {
			1: '待处理',
			2: '申诉中',
			3: '承建商确认',
			4: '申诉通过',
			5: '撤销',
		},
	},

	{
		label: '所属项目',
		prop: 'projectName',
		fixed: false,
		required: true,
		sortable: false,
		fn: true,
	},
	{
		label: '项目PM',
		prop: 'pmName',
		fixed: false,
		required: true,
		sortable: false,
	},
	{
		label: '申诉意见',
		prop: 'appealComment',
		fixed: false,
		required: true,
		sortable: false,
	},
	{
		label: '申诉时间',
		prop: 'appealTime',
		fixed: false,
		required: true,
		sortable: false,
		dateFmt: 'YYYY-MM-DD HH:mm:ss',
	},
	{
		label: '申诉附件',
		prop: 'appealUrls',
		fixed: false,
		required: true,
		sortable: false,
		dateFmt: 'YYYY-MM-DD HH:mm:ss',
	},
	{
		label: '申诉不通过原因',
		prop: 'appealNotPassComment',
		fixed: false,
		required: true,
		sortable: false,
	},
];
```

#### 表单搜索项 searchFieldOptions searchFieldColumns

```js
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
export const options = {
	form: {
		labelWidth: '80px',
		size: 'small',
	},
	// btns: { hide: true },
	btns: {
		hide: false,
		col: {
			push: 1,
		},
	},
	col: { xs: 24, sm: 12 },
	fold: {
		// index: 2,
		enable: true,
		defaultCollapsed: true,
	},
};

export const columns = [
	{
		type: 'input',
		label: '姓名',
		field: 'name',
		props: { maxLength: 4 },
		rules: [],
	},
	{
		type: 'input',
		label: '手机',
		field: 'phone',
		props: { maxLength: 11 },
		rules: [],
	},
	//请求远程示例
	{
		type: 'select',
		label: '性别',
		field: 'sex',
		options: [],
		init: true,
		request: async () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({
						data: [
							{ label: '男', value: 1 },
							{ label: '女', value: 0 },
						],
					});
				}, 1000);
			});
		},
	},
	{
		type: 'date-picker',
		label: '生日',
		field: 'birthday',
		props: {
			type: 'date',
			format: 'yyyy-MM-dd',
			'value-format': 'yyyy-MM-dd',
		},
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
		type: 'cascader',
		label: '城市',
		field: 'city',
		options: cityOptions,
		// disabled: (i) => i.status === 0,
		hide: (i) => {
			i.status === 0 && (i.city = []); //隐藏时清空值
			return i.status === 0;
		},
	},
];
```

#### vue

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
```

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
