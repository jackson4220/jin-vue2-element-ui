module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', '@vue/standard'],
	rules: {
		'no-new-func': 'off',
		'no-console': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'space-before-function-paren': 0,
		'no-tabs': 'off',
		eqeqeq: 'off',
		'no-unused-vars': 'off',
		semi: 'off',
		'comma-dangle': 'off',
		indent: 'off',
		'spaced-comment': 'off',
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};
