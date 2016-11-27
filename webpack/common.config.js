const webpack = require('webpack');
const path = require('path');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new IsomorphicPlugin(require('./isomorphic.config')); // eslint-disable-line
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const development = (process.env.NODE_ENV || 'development') === 'development';
const cssNames = development ? '[name].css' : '[name].[hash].css';
const extractCSS = new ExtractTextPlugin(cssNames);
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    app: './src/client',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    publicPath: isDev ? `http://localhost:${+process.env.PORT + 1}/public/` : '',
    path: path.resolve(__dirname, '../dist/assets'),
    filename: isDev ? '[name].js' : '[name].[hash].js',
    chunkFilename: isDev ? '[id].chunk.js' : '[id].[hash].chunk.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components|libs)/,
      query: {
        presets: ['es2015', 'react', 'stage-0'],
      },

    },
    {
      test: /\.css$/, // Only .css files
      loader: 'style!css', // Run both loaders
    },
    // LESS
    {
      test: /\.less$/,
      loader: 'style!css!less',
    },
    // SASS
     { test: /\.scss$/i, loader: extractCSS.extract(['css', 'postcss-loader', 'sass']) },
    { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' },
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'svg-loader' },
    {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url-loader?name=images/[name].[ext]&limit=10240',
    },
  ],
  },
  plugins: [
    extractCSS,
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  postcss: [autoprefixer({ browsers: [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 20',
    'Firefox >= 24',
    'Explorer >= 8',
    'iOS >= 6',
    'Opera >= 12',
    'Safari >= 6',
  ] })],
  devtool: 'source-map',
  keepalive: true,
  debug: true,
  cache: true,
};
