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
	chainWebpack(config) {
		config.resolve.alias.set('core-js/library/fn', 'core-js/features');
	},
	configureWebpack: {
		resolve: {
			alias: {
				'~': 'packages',
			},
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: [
						'cache-loader',
						{
							loader: 'babel-loader',
							options: {
								babelrc: false,
								configFile: false,
								presets: [
									'@babel/preset-env', // 可以识别es6语法
									'@vue/babel-preset-jsx', // 解析jsx语法
								],
							},
						},
						{
							loader: 'ts-loader',
							options: {
								appendTsxSuffixTo: [/\.vue$/, /\.md$/],
							},
						},
					],
				},
			],
		},
	},
	plugins: [
		['demo-container'],
		['vuepress-plugin-code-copy', true],
		[
			'vuepress-plugin-typescript',
			{
				tsLoaderOptions: {
					// ts-loader 的所有配置项
				},
			},
		],
		// ['@vuepress/plugins-back-to-top', false],
		[
			'vuepress-plugin-gotop-plus',
			{
				// mobileShow: false,
				threshold: 150,
			},
		],
		'@vuepress-reco/extract-code',
	],
};
