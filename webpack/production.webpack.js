const commonConfig = require('./common.webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const production = {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};

module.exports = { ...commonConfig, ...production };