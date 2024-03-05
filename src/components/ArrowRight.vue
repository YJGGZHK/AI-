<template>
  <div>
    <canvas ref="arrowCanvas" :width="length" height="70"></canvas>
  </div>
</template>

<script>
export default {
  name: 'ArrowRight',
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
      const lineStartX = 50 // 起始点 x 坐标
      const lineEndX = this.length // 结束点 x 坐标
      const lineY = 50 // 箭头所在 y 坐标
      ctx.beginPath()
      ctx.moveTo(lineStartX, lineY)
      ctx.lineTo(lineEndX, lineY)
      ctx.stroke()

      // 绘制箭头头部
      const arrowHeadSize = 25 // 箭头头部的大小

      // 箭头头部第一条线（顺时针旋转30度）
      const arrowHeadX1 = lineEndX - arrowHeadSize * Math.cos((40 * Math.PI) / 180)
      const arrowHeadY1 = lineY - arrowHeadSize * Math.sin((40 * Math.PI) / 180)

      ctx.beginPath()
      ctx.moveTo(lineEndX, lineY)
      ctx.lineTo(arrowHeadX1, arrowHeadY1)
      ctx.stroke()

      // 箭头头部第二条线（逆时针旋转30度）
      const arrowHeadX2 = lineEndX - arrowHeadSize * Math.cos((-40 * Math.PI) / 180)
      const arrowHeadY2 = lineY - arrowHeadSize * Math.sin((-40 * Math.PI) / 180)

      ctx.beginPath()
      ctx.moveTo(lineEndX, lineY)
      ctx.lineTo(arrowHeadX2, arrowHeadY2)
      ctx.stroke()
    },
  },
}
</script>

<style></style>
