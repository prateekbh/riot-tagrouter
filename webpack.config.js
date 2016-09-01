var webpack = require('webpack');

module.exports = {
  entry: './index',
  output: {
    path: __dirname + '/public',
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.tag$|\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: { presets: ['es2015'] }
	    }, 
	    {
	        test: /\.tag$/,
	        loader: 'tag'
	    }
	  ]
  },
  devServer: {
      contentBase: '/public'
  }
};
