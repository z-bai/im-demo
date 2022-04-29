const path = require('path');
const openBrowser = require('react-dev-utils/openBrowser');
const fs = require('fs');
const { merge } = require("webpack-merge");
const baseConfig = require('./webpack.base');

const config = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
  devServer: {
    port: 'auto',
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'public'),
      serveIndex: true,
    },
    client: {
      overlay: true,
    },
    compress: true,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, './ssl/localhost.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, './ssl/localhost.crt')),
    //   ca: fs.readFileSync(path.resolve(__dirname, './ssl/localhost.pem')),
    // },
    historyApiFallback: true,
    devMiddleware: {
      index: true,
      writeToDisk: false
    },
    onListening(devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      const { port } = devServer.server.address();
      openBrowser(`https://localhost:${port}`);
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
  ]
};

module.exports = merge(baseConfig, config);
