<template>
  <div>
    <canvas ref="arrowCanvas" width="70" :height="length"></canvas>
  </div>
</template>

<script>
export default {
  name: 'ArrowDown',
  props: {
    length: String,
  },
  mounted() {
    this.drawArrow()
  },
  methods: {
    drawArrow() {
      const canvas = this.$refs.arrowCanvas
      const ctx = canvas.getContext('2d')

      // 设置箭头样式
      ctx.strokeStyle = 'white'
      ctx.fillStyle = 'white'
      ctx.lineWidth = 4 // 修改箭头的粗细，这里将线条宽度设置为4px

      // 绘制直线
      const lineX = 20 // 箭头所在 x 坐标
      const lineStartY = 0 // 起始点 y 坐标
      const lineEndY = this.length // 结束点 y 坐标
      ctx.beginPath()
      ctx.moveTo(lineX, lineStartY)
      ctx.lineTo(lineX, lineEndY)
      ctx.stroke()

      // 绘制箭头头部
      const arrowHeadSize = 25 // 箭头头部的大小

      // 箭头头部第一条线（顺时针旋转30度）
      const arrowHeadY1 = lineEndY - arrowHeadSize * Math.cos((40 * Math.PI) / 180)
      const arrowHeadX1 = lineX - arrowHeadSize * Math.sin((40 * Math.PI) / 180)

      ctx.beginPath()
      ctx.moveTo(lineX, lineEndY)
      ctx.lineTo(arrowHeadX1, arrowHeadY1)
      ctx.stroke()

      // 箭头头部第二条线（逆时针旋转30度）
      const arrowHeadY2 = lineEndY - arrowHeadSize * Math.cos((-40 * Math.PI) / 180)
      const arrowHeadX2 = lineX - arrowHeadSize * Math.sin((-40 * Math.PI) / 180)

      ctx.beginPath()
      ctx.moveTo(lineX, lineEndY)
      ctx.lineTo(arrowHeadX2, arrowHeadY2)
      ctx.stroke()
    },
  },
}
</script>

<style></style>
