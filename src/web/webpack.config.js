/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const qbittorrent = fs.existsSync('qbittorrent.config.js')
	? require('./qbittorrent.config.js') // eslint-disable-line import/extensions
	: { server: 'http://192.168.10.15:8787' };

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
		entry: './src/web/index.tsx',
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, '..', '..', 'dist', 'web'),
		},
		resolveLoader: {
			modules: [path.resolve(__dirname, '..', '..', 'node_modules')],
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
		devServer: {
			port: 8585,
			static: path.join(__dirname, 'dist'),
			hot: true,
			proxy: qbittorrent ? {
				'/api': qbittorrent.server,
			} : undefined,
		},
	};
};
