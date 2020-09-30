const path = require('path');
const webpack = require('webpack');
const dirs = require('./base/dirs');
const { pages } = require('./base/pages');
const base = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dllManifestOfVendorFrame = require('../lib/frame.manifest.json');

const plugins = [].concat(pages);

const config = {
  ...base,

  mode: 'production',

  output: {
    path: dirs.dist,
    publicPath: '/',
    filename: 'js/bundle_[name].[chunkhash].min.js',
  },

  devtool: false,

  plugins: plugins.concat([
    new MiniCssExtractPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: dllManifestOfVendorFrame,
    }),
    new AddAssetHtmlWebpackPlugin([{
      typeOfAsset: 'js',
      includeSourcemap: false,
      filepath: path.resolve(dirs.lib, '**/*.dll.js'),
      publicPath: '/js', // 绝对路径：'/js',
      outputPath: './js',
    }]),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CopyPlugin([
      {
        from: path.resolve(dirs.src, '.public/'),
        to: 'static/',
      }
    ])
  ])
};

module.exports = config;

