const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const METADATA = {
  host: HOST,
  port: PORT
};

module.exports = {
  entry: {
    vendor: [
      'aframe',
      'aframe-extras',
      'aframe-environment-component',
      'aframe-text-geometry-component'
    ],
    main: './src/main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: function (a, b) {
          const entryPoints = ["styles","vendor","main"];
          return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
        },
        inject: 'head'
      }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      {from: 'src/assets', to: 'assets'}
    ]),

  ],
  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true
  },
};
