const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./common.webpack');

const development = {
  mode: 'development',
  plugins: [
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/index.html'),
      filename: 'index.html',
      favicon: path.join(__dirname, '..', 'client/assets/roomier.svg'),
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = { ...commonConfig, ...development };
