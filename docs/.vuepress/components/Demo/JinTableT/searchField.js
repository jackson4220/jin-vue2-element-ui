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
	fold: { index: 2, enable: true, defaultCollapsed: true },
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
		disabled: (i) => i.status === 0,
		/* hide: (i) => {
			i.status && (i.city = []);
			return i.status === 0;
		}, */
	},
];
