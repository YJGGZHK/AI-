<template>
  <div>
    <canvas ref="arrowCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script>
export default {
  name: 'ArrowPart',
  props: {
    length: {
      type: Number,
      required: true,
    },
    x1: {
      type: Number,
      required: true,
    },
    x2: {
      type: Number,
      required: true,
    },
    x3: {
      type: Number,
      required: true,
    },
    y1: {
      type: Number,
      required: true,
    },

    y2: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      canvasWidth: 2000,
      canvasHeight: 700,
    }
  },
  watch: {
    length: 'drawArrow',
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
      ctx.lineWidth = 4

      // 绘制直线
      const lineStartX = 1700 // 起始点 x 坐标
      const lineEndX = this.length // 结束点 x 坐标
      const lineY = 0 // 箭头所在 y 坐标
      ctx.beginPath()
      ctx.moveTo(lineStartX, lineY + 5)
      ctx.lineTo(lineStartX + this.x1, lineY + 5)
      ctx.lineTo(lineStartX + this.x1, lineY + this.y1)
      ctx.lineTo(lineStartX + this.x2, lineY + this.y1)
      ctx.lineTo(lineStartX + this.x2, lineY + this.y2)
      ctx.lineTo(lineStartX + this.x3, lineY + this.y2)
      ctx.stroke()

      // 绘制箭头头部（与之前相同）
      const arrowHeadSize = 25
      const arrowHeadX1 = lineEndX - arrowHeadSize * Math.cos((40 * Math.PI) / 180)
      const arrowHeadY1 = lineY - arrowHeadSize * Math.sin((40 * Math.PI) / 180)
      ctx.beginPath()
      ctx.moveTo(lineStartX, lineY)
      ctx.lineTo(arrowHeadX1, arrowHeadY1)
      ctx.stroke()

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
