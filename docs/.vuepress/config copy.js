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
						// Add other components here
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
		config.resolveLoader.modules.add('node_modules');
		config.resolve.modules.add('node_modules');
	},
	configureWebpack: {
		resolve: {
			alias: {
				'~': 'packages',
				'throttle-debounce/debounce': 'throttle-debounce/dist/index.cjs.js',
				'throttle-debounce/throttle': 'throttle-debounce/dist/index.cjs.js',
				'throttle-debounce': 'throttle-debounce/dist/index.cjs.js',
			},
			mainFields: ['browser', 'module', 'main'], // Ensure these fields are resolved
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
									'@babel/preset-env', // For ES6 syntax
									'@vue/babel-preset-jsx', // For JSX syntax
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
					// All ts-loader options can be specified here
				},
			},
		],
		// Uncomment if needed
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
	base: '/jin-vue2-element-ui/',
};
