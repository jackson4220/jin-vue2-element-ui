const path = require('path');

module.exports = {
	title: 'My Component Library',
	description: 'A custom component library based on Element UI',
	base: '/jin-vue2-element-ui/',
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
						{ title: 'Form', path: '/components/Form/JinForm' },
						{ title: 'Table', path: '/components/Table/JinTable' },
					],
				},
			],
		},
	},
	configureWebpack: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, 'packages'),
				'throttle-debounce': path.resolve(
					__dirname,
					'../../node_modules/throttle-debounce'
				),
				'throttle-debounce/debounce': path.resolve(
					__dirname,
					'../../node_modules/throttle-debounce/debounce'
				),
				'throttle-debounce/throttle': path.resolve(
					__dirname,
					'../../node_modules/throttle-debounce/throttle'
				),
			},
		},
		externals: {
			'throttle-debounce': 'throttle-debounce',
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: [
						'babel-loader',
						{
							loader: 'ts-loader',
							options: {
								appendTsxSuffixTo: [/\.vue$/],
							},
						},
					],
				},
			],
		},
	},
	plugins: [
		['demo-container'],
		['vuepress-plugin-code-copy'],
		[
			'vuepress-plugin-typescript',
			{
				tsLoaderOptions: {
					configFile: path.resolve(__dirname, 'tsconfig.json'),
				},
			},
		],
	],
	chainWebpack: (config) => {
		config.resolve.modules
			.add(path.resolve(__dirname, '../../node_modules'))
			.add('node_modules')
			.end();
	},
};
