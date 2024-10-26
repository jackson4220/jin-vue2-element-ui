const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');

module.exports = defineConfig({
	transpileDependencies: true,
	pages: {
		index: {
			entry: 'examples/main.js', // 入口文件
			template: 'public/index.html', // 模板文件
			filename: 'index.html', // 输出文件名
		},
	},
	css: {
		extract: false, // 强制内联CSS
		loaderOptions: {
			sass: {
				additionalData: `@import "~element-ui/lib/theme-chalk/index.css";`,
			},
		},
	},
	configureWebpack: (config) => {
		config.resolve.alias['@'] = resolve('examples'); // 设置别名
		config.resolve.alias['components'] = resolve('examples/components'); // 设置别名
		config.resolve.alias['~'] = resolve('packages'); // 设置别名
		// 生产环境配置
		if (process.env.NODE_ENV === 'production') {
			config.mode = 'production';
			// 打包文件大小配置
			config.performance = {
				maxEntrypointSize: 10000000,
				maxAssetSize: 30000000,
			};
		}

		// 更新sass-loader配置
		config.module.rules.forEach((rule) => {
			if (rule.test.toString().includes('scss')) {
				rule.use = [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'), // 使用新的API
						},
					},
				];
			}
		});

		// 确保vue-loader正确配置了scss
		config.module.rules.push({
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					scss: [
						'vue-style-loader',
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass'), // 使用新的API
							},
						},
					],
				},
			},
		});

		config.devServer = {
			hot: true,
			port: 81,
			open: true,
			allowedHosts: 'all',
			client: {
				overlay: {
					warnings: true,
					errors: true,
				},
			},
			proxy: {
				'/staticCondrive': {
					target: 'https://static.test.com/',
					changeOrigin: true,
					pathRewrite: {
						'^/staticCondrive': '',
					},
				},
				'/platform': {
					target: 'https://rs.wzznft.com/',
					changeOrigin: true,
					pathRewrite: {
						// '^/api': ''
					},
				},
				'/uploadFile': {
					target: 'https://rs.wzznft.com/',
					changeOrigin: true,
					pathRewrite: {
						// '^/api': ''
					},
				},
				'/uploadImg': {
					target: 'https://rs.wzznft.com/',
					changeOrigin: true,
					pathRewrite: {
						// '^/api': ''
					},
				},
				'/api': {
					target: 'https://rs.wzznft.com/',
					changeOrigin: true,
					pathRewrite: {
						'^/api': '',
					},
				},
			},
		};
	},
});
