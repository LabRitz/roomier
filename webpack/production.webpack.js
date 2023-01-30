const commonConfig = require('./common.webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const production = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
            name: "node_vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
        }
      }
    }
  },
};

module.exports = { ...commonConfig, ...production };