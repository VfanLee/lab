const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 模式
  mode: 'development',
  // 入口
  entry: resolve(__dirname, '../src/main.js'),
  // source map
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'Webpack Demo',
      filename: 'index.html'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  // https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    host: 'local-ip',
    port: 'auto',
    open: true,
    hot: true // 默认开启
  }
}
