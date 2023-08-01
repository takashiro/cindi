module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'consistent-return': 'off',
		'import/extensions': [
			'error',
			{
				ts: 'never',
				tsx: 'never',
				js: 'never',
				jsx: 'never',
			},
		],
		'import/no-unresolved': 'off',
		indent: [
			'error',
			'tab',
		],
		'linebreak-style': 'off',
		'no-await-in-loop': 'off',
		'react/jsx-indent': [
			'error',
			'tab',
		],
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.tsx'],
			},
		],
		'no-plusplus': 'off',
		'no-redeclare': 'off',
		'no-restricted-syntax': [
			'error',
			'WithStatement',
		],
		'no-shadow': 'off',
		'no-tabs': 'off',
		'no-unused-vars': 'off',
		'no-use-before-define': 'off',
		semi: 'off',
		'@typescript-eslint/no-use-before-define': 'error',
	},
};
