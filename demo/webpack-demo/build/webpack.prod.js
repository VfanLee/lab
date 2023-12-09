const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  // 模式
  mode: 'production',
  // 入口
  entry: resolve(__dirname, '../src/main.js'),
  // source map【生产环境一般不需要，需要线上调试时再开启】
  // devtool: 'source-map',
  // 输出
  output: {
    path: resolve(__dirname, '../dist'), // 输出路径
    filename: 'js/[name].[contenthash:10].js', // 输出 bundle 的名称
    chunkFilename: 'js/[name].chunk.[contenthash:10].js', // 非初始 chunk 文件的名称
    assetModuleFilename: 'media/[hash:10][ext][query]', // Asset Modules 处理资源的文件的命名
    clean: true // 在生成文件之前清空 output 目录
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
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
    }),
    // https://webpack.docschina.org/plugins/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:10].css',
      chunkFilename: 'css/[name].chunk.[contenthash:10].css'
    })
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  // 优化
  optimization: {
    // 代码压缩
    minimize: true,
    // 自定义插锁
    minimizer: [
      // css 压缩 https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin
      new CssMinimizerPlugin(),
      // js 压缩（自带） https://webpack.docschina.org/plugins/terser-webpack-plugin/#terseroptions
      new TerserPlugin()
    ],
    // 代码分割配置
    splitChunks: {
      chunks: 'all' // 对所有模块都进行分割
    }
  }
}
