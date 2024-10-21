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
	},
});
