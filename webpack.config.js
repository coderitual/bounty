module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'odoo.js',
    path: './lib/',
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'odoo'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
