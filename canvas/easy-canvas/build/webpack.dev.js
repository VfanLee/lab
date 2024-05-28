const { resolve } = require('path')

module.exports = {
  mode: 'development',
  context: resolve(__dirname, '../'),
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'easy-canvas.js',
    library: {
      name: 'EasyCanvas',
      type: 'umd'
    }
  }
}
