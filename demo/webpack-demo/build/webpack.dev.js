const config = require('./config')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 模式
  mode: 'development',
  // 入口
  entry: resolve(__dirname, '../src/main.js'),
  output: {
    publicPath: config.publicPath
  },
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
      filename: 'index.html',
      publicPath: 'auto'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  // https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: true
      },
      progress: true,
      reconnect: true
    },
    https: false,
    host: 'local-ip',
    port: 'auto',
    static: {
      publicPath: config.publicPath
    },
    open: [config.publicPath], // 启动服务时，自动打开标签页
    hot: true, // 模块热替换
    liveReload: false, // 当监听到文件变化时 dev-server 将会重新加载或刷新页面
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      const { address, port } = devServer.server.address()
      const protocol = devServer.options.https ? 'https' : 'http'
      const publicPath = devServer.options.static[0].publicPath[0]
      console.log(`Listening on: ${protocol}://${address}:${port}${publicPath}`)
    }
  },
  stats: 'errors-only'
}
