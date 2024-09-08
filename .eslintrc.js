// .eslintrc.js
export default {
	env: {
		node: true, // Recognizes Node.js globals
		es2021: true, // ECMAScript 2021 features
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended', // Optional: for Prettier integration
	],
	parserOptions: {
		ecmaVersion: 12, // ECMAScript 2021 syntax
		sourceType: 'module', // For ES modules
	},
	rules: {
		'no-unused-vars': ['warn', { args: 'none' }], // Customize this rule as needed
		'no-undef': 'error', // Ensure no undefined variables
	},
};
