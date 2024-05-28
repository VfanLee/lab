const { resolve } = require('path')

module.exports = {
  mode: 'production',
  context: resolve(__dirname, '../'),
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'easy-canvas.min.js',
    library: {
      name: 'EasyCanvas',
      type: 'umd'
    }
  }
}
