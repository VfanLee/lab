const config = require('./config.js')

class EasyCanvas {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  /**
   * 直线
   * @param {*} x1 起点 x
   * @param {*} y1 起点 y
   * @param {*} x2 终点 x
   * @param {*} y2 终点 y
   */
  line(x1, y1, x2, y2, options = {}) {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.closePath()

    const { lineWidth, strokeStyle } = { ...config.line, ...options }
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = strokeStyle

    this.ctx.stroke()
    this.ctx.restore()
  }

  /**
   * 矩形
   * @param {*} x 起点 x
   * @param {*} y 起点 y
   * @param {*} width 宽度
   * @param {*} height 高度
   */
  rect(x, y, width, height, options = {}) {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.rect(x, y, width, height)
    this.ctx.closePath()

    const { lineWidth, strokeStyle, fill, fillStyle } = { ...config.rect, ...options }
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = strokeStyle
    this.ctx.fillStyle = fillStyle

    if (fill) {
      this.ctx.fill()
    } else {
      this.ctx.stroke()
    }
    this.ctx.restore()
  }

  /**
   * 弧线
   * @param {*} x 圆心 x
   * @param {*} y 圆心 y
   * @param {*} radius 半径
   * @param {*} startAngle 弧线开始的角度, 从正 x 轴开始
   * @param {*} endAngle 弧线结束的角度, 从正 x 轴开始
   * @param {*} counterclockwise
   */
  arc(cx, cy, radius, startAngle, endAngle, counterclockwise = false, options = {}) {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.arc(cx, cy, radius, startAngle, endAngle, counterclockwise)
    this.ctx.closePath()

    const { lineWidth, strokeStyle, fill, fillStyle } = { ...config.arc, ...options }
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = strokeStyle
    this.ctx.fillStyle = fillStyle

    if (fill) {
      this.ctx.fill()
    } else {
      this.ctx.stroke()
    }
    this.ctx.restore()
  }

  /**
   * 文本
   * @param {*} text 文本
   * @param {*} x x
   * @param {*} y y
   */
  text(text, x, y, options = {}) {
    const { fontWeight, fontSize, fontFamily, fill, textAlign, textBaseline } = { ...config.text, ...options }

    this.ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`
    this.ctx.textAlign = textAlign
    this.ctx.textBaseline = textBaseline

    if (fill) {
      this.ctx.fillText(text, x, y)
    } else {
      this.ctx.strokeText(text, x, y)
    }
  }

  /**
   * 清除画布
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

module.exports = EasyCanvas
