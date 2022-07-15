const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './client/index.js',
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '/index.html'),
    filename: 'index.html'
  })],
  devtool: 'inline-source-map',
  devServer: {
    static: {
        directory: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    proxy: {
      '/imdb': 'http://localhost:3000',
      '/profile': 'http://localhost:3000'
    },
    compress: true,
    port: 8080,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },  

  module: {
    rules: [
      { 
        test: /\.jsx?/, 
        // exclude: /(node_modules)/,
        exclude: path.resolve(__dirname, './node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
      }
    ]
  }
}