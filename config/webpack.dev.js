const dotenv = require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

const env = dotenv.parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: parseInt(process.env.PORT, 10) || 3000,
    historyApiFallback: true,
    overlay: true,
    open: false,
    stats: 'errors-only',
    hot: true,
  },
  plugins: [new webpack.DefinePlugin(envKeys)],
});
