const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, 'public') }],
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    }),
    // more information about momentjs optimization could be found here https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
//       When app gets bigger check which cacheGroups/defaultVendors configuration is better
//       cacheGroups: {
//         ckeditorVendor: {
//           test: /[\\/]node_modules[\\/](@ckeditor)[\\/]/,
//           name: 'ckeditorVendor',
//           enforce: true,
//           chunks: 'all',
//         },
//         utilityFirstVendorsChunk: {
//           test: /[\\/]node_modules[\\/](next|@apollo|@stryberventures)[\\/]/,
//           name: 'utilityFirstVendorsChunk',
//           enforce: true,
//           chunks: 'all',
//         },
//         utilitySecondVendorsChunk: {
//           test: /[\\/]node_modules[\\/](react-dom|react-jss|lodash|graphql|react-multi-carousel)[\\/]/,
//           name: 'utilitySecondVendorsChunk',
//           enforce: true,
//           chunks: 'all',
//         },
//       };
      cacheGroups: {
        // defaultVendors: {
        //   chunks: 'all',
        //   test: /[\\/]node_modules[\\/]/,
        //   name(module) {
        //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
        //     return `npm.${packageName.replace('@', '')}`;
        //   },
        // },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
        },
      },
    },
  },
});
