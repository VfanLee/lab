const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const chunks = ['pc', 'mobile']

module.exports = {
  mode: 'production',
  entry: {
    pc: resolve(__dirname, 'src/pages/pc/main.js'),
    mobile: resolve(__dirname, 'src/pages/mobile/main.js')
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      filename: `index.html`,
      excludeChunks: chunks
    }),
    ...chunks.map(
      name =>
        new HtmlWebpackPlugin({
          template: `public/${name}.html`,
          filename: `${name}.html`,
          title: `${name}`,
          chunks: [name]
        })
    )
  ]
}
