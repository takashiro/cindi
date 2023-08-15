/** @type {import('ts-jest').JestConfigWithTsJest} */
const commonOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/test/',
	],
};

const projects = [
	'qbittorrent',
	'spider',
	'vigilia',
];

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	projects: projects.map((project) => ({
		...commonOptions,
		displayName: project,
		testMatch: [
			`<rootDir>/test/${project}/*.spec.ts`,
		],
	})),
};
