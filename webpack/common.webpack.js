/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { PROTOCOL, DOMAIN, PORT, SERVER_PORT } = require('config')

module.exports = {
  entry: {
    app: './client/index.js'
  },

  devtool: 'inline-source-map',

  devServer: {
    host: DOMAIN,
    port: PORT,
    static: {
      directory: path.resolve(__dirname) + '../../dist',
      publicPath: '/'
    },
    client: {
      progress: true,
    },
    hot: true,
    proxy: {
      '/': `${PROTOCOL}${DOMAIN}:${SERVER_PORT}`,
      compress: true,
      port: PORT,
    },
  },

  output: {
    publicPath: ``,
    path: path.resolve(__dirname) + '../../dist',
    filename: '[name].[contenthash]].js',
    clean: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/index.html'),
      filename: 'index.html',
      // favicon: "favicon.ico"
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: path.resolve(__dirname, './node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
      }
    ]
  }

}