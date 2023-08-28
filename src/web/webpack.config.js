/* eslint-disable global-require, @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname, '..', '..');

/**
 * Configure Webpack
 * @param {Record<string, string>} env environment variables
 * @param {Record<string, string>} argv command-line arguments
 * @returns {import('webpack').Configuration} webpack configuration
 */
module.exports = function config(env, argv) {
	const mode = argv?.mode === 'development' ? 'development' : 'production';
	return {
		mode,
		entry: path.resolve(__dirname, 'index.tsx'),
		output: {
			filename: '[name].js',
			path: path.join(rootDir, 'dist', 'web'),
		},
		resolveLoader: {
			modules: [path.join(rootDir, 'node_modules')],
		},
		resolve: {
			extensions: [
				'.ts',
				'.tsx',
				'.js',
			],
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /node_modules/,
						name: 'vendor',
						enforce: true,
						chunks: 'all',
					},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: 'ts-loader',
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false,
								sourceMap: mode === 'development',
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: mode === 'development',
							},
						},
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'index.ejs'),
			}),
		],
		devtool: mode === 'development' ? 'source-map' : undefined,
		devServer: {
			port: 8585,
			static: path.join(rootDir, 'dist', 'web'),
			hot: true,
			proxy: {
				'/api': {
					target: 'http://localhost:8586',
					pathRewrite: { '^/api': '' },
				},
			},
		},
	};
};
