'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      use: ['source-map-loader'],
    },{
      enforce: 'pre',
      test: /\.ts$/,
      use: ['source-map-loader'],
    },{
      test: /\.ts$/,
      loader: 'ts-loader',
    },{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback: 'style-loader',
      }),
    },{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader'],
        fallback: 'style-loader',
      }),
    },{
      test: /\.(png|woff|woff2|eot|ttf|svg|jpg|ico)$/,
      loader: 'url-loader?limit=100000',
    }]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.NormalModuleReplacementPlugin(
      /AsyncLoad\.js/,
      function (resource) {
        resource.request = resource.request.replace(/AsyncLoad/,"AsyncLoad-disabled");
      }
    )
  ],
};
