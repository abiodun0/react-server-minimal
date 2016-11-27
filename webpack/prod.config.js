const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./common.config.js');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');

const webpackIsomorphicToolsPlugin = new IsomorphicPlugin(require('./isomorphic.config')); // eslint-disable-line

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      minimize: true,

    }),
    webpackIsomorphicToolsPlugin,

  ],
});
