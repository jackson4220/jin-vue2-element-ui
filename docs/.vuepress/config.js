module.exports = {
	title: 'My Component Library',
	description: 'A custom component library based on Element UI',
	themeConfig: {
		nav: [
			{ text: '首页', link: '/' },
			{ text: '组件', link: '/components/' },
		],
		sidebar: {
			'/components/': [
				{
					title: '组件',
					collapsable: false,
					children: [
						'JinTable',
						'JinForm',
						// 如果有其他组件，继续添加
					],
				},
			],
		},
	},
};
