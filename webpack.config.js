const webpack = require("webpack");
const path = require('path');
module.exports = {
	entry: './src/js/entry.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'index.js',
	},
	module: {
		loaders: [
            {test: /\.js$/, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(jpg|png|gif|svg)$/, loader: 'url-loader?limit=8192'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {
			test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
			loader: 'file-loader?name=[hash].[ext]'
			}
		]
	},
	plugins:[
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery":"jquery"
    })
  ]
}
