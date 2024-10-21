module.exports = {
	title: 'My Component Library',
	description: 'A custom component library based on Element UI',
	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Components', link: '/components/' },
		],
		sidebar: [
			{
				title: '组件',
				collapsable: false,
				children: [
					'/components/JinTable',
					'/components/JinForm',
					// 如果有其他组件，继续添加
				],
			},
		],
	},
};
