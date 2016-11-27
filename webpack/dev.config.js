const webpackMerge = require('webpack-merge');
const commonConfig = require('./common.config.js');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new IsomorphicPlugin(require('./isomorphic.config')); // eslint-disable-line

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  plugins: [
    webpackIsomorphicToolsPlugin.development(),
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    contentBase: './build',
  },
});
