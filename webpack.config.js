const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Development'
		}),
		new VueLoaderPlugin()
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
		historyApiFallback: true
	},
	resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
  	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compile Sass to CSS
					'sass-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			/* {
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'aseet/resource',
			} */
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.m?jsx$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-transform-runtime',
							"@babel/plugin-syntax-dynamic-import"
						]
					}
				}
			}
		]
	},
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	}
};