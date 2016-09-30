var CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin");
var webpack = new require("webpack");
 
module.exports = {
			entry: {
							vendor: "./scripts/vendor.js",
							home: "./scripts/home.js",
							apis: "./scripts/api.js",
							app: "./scripts/app.js"
			},
		module:{
			loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a valid name to reference
				query: {
					presets: ['es2015']
				}
			},
			{
      test: /\.tag$/,
      loader: 'tag'
    }
		]
		},
		plugins: [
			new CommonsPlugin({
				minChunks: Infinity,
				name: "vendor"
			}),
			new webpack.ProvidePlugin({
					riot: "riot"
			})
		],
    output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        filename: "./build/[name].bundle.js",
        chunkFilename: "./build/[name].bundle.js"
    }
}