module.exports = {
  devtool: 'source-map',
  cache: true,

  watch: true,

  entry: {
    'index': ['./src/index.js']
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader'}
    ]
  },

  resolve: {
    root: __dirname + '/build'
  }
};
