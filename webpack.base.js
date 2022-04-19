const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pages = require('./pages-config');

module.exports = {
  entry: pages.reduce((acc, p) => {
    acc[p.name] = p.path;
    return acc;
  }, {}),
  module: {
    rules: [
      {
        test: /\.txt$/,
        type: 'asset/source'
      },
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
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env'
            ],
            cacheDirectory: true,
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
    ...pages.map(p => {
      const { name, title, template, description } = p;

      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        chunks: [name],
        title,
        template: template || 'template/index.html',
        description
      })
    }),
  ]
}
