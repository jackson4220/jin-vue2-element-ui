module.exports = {
	title: 'My Component Library',
	description: 'A custom component library based on Element UI',
	themeConfig: {
		nav: [
			{ text: '首页', link: '/' },
			{ text: '组件', link: '/components/Form/JinForm' },
		],
		sidebar: {
			'/components/': [
				{
					title: '组件',
					collapsable: true,
					children: [
						'/components/Form/JinForm',
						'/components/Table/JinTable',
						// 如果有其他组件，继续添加
					],
				},
			],
			'/components/Form/': [
				{
					title: 'Form',
					collapsable: false,
					children: ['JinForm'],
				},
			],
			'/components/Table/': [
				{
					title: 'Table',
					collapsable: false,
					children: ['JinTable'],
				},
			],
		},
	},
	plugins: ['demo-container'],
	chainWebpack(config) {
		config.resolve.alias.set('core-js/library/fn', 'core-js/features');
	},
};
