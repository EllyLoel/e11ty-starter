export default [
	{
		root: true,
		plugins: ["prettier"],
		extends: ["eslint:recommended", "prettier"],
		rules: {
			"no-console": "warn",
			"prettier/prettier": "error",
			"no-unused-vars": "warn",
			"sort-imports": "error",
			"sort-keys": "error",
			"sort-vars": "error",
		},
	},
];
