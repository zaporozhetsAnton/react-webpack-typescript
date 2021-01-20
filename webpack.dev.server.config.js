const path = require('path');
const { merge } = require('webpack-merge');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
    hot: true,
    open: true,
    overlay: true,
    progress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    // if you need public url for your dev server uncomment below lines
    // host: '0.0.0.0',
    // public: require('os').hostname().toLowerCase() + ':8080',
  },
  plugins: [new CaseSensitivePathsPlugin()],
});
