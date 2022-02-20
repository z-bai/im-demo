const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const openBrowser = require('react-dev-utils/openBrowser');
const fs = require('fs');

module.exports = {
  entry: {
    'hello-world': './src/hello-world.js',
    'kiwi': './src/kiwi.js'
  },
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
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './ssl/localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './ssl/localhost.crt')),
      ca: fs.readFileSync(path.resolve(__dirname, './ssl/localhost.pem')),
    },
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
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024 // 3 kilobytes
          }
        }
      },
      {
        test: /\.txt$/,
        type: 'asset/source'
      },
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
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: []
          }
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*')
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'hello-world.html',
      chunks: ['hello-world'],
      title: 'Hello world',
      template: 'src/index.html',
      description: 'Some description'
    }),
    new HtmlWebpackPlugin({
      filename: 'kiwi.html',
      chunks: ['kiwi'],
      title: 'Hello world',
      template: 'src/index.html',
      description: 'Some description'
    }),
  ]
};
