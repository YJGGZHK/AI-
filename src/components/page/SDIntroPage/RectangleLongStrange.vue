<template>
  <div class="rectangle">
    <img :src="deconateImg" alt="" class="deconateImg1" />
    <img :src="deconateImg" alt="" class="deconateImg2" />
    <canvas ref="arrowCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script>
export default {
  name: 'RectangleStrange',
  props: {
    length: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      canvasWidth: 1600,
      canvasHeight: 900,
      deconateImg: 'https://img.js.design/assets/img/64acfe418bcac05a23546ac6.png#e0349481be4c2a43efe316b9bbcff2d5',
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
      ctx.strokeStyle = 'rgba(105, 255, 246, 1)'
      ctx.fillStyle = 'rgba(105, 255, 246, 1)'
      ctx.lineWidth = 4

      // 绘制直线
      const lineStartX = 200 // 起始点 x 坐标
      const lineEndX = this.length // 结束点 x 坐标
      const lineY = 0 // 箭头所在 y 坐标
      ctx.beginPath()
      ctx.moveTo(lineStartX, lineY + 10)
      ctx.lineTo(lineStartX + 1300, lineY + 10)
      ctx.lineTo(lineStartX + 1300, lineY + 635)
      ctx.lineTo(lineStartX + 1125, lineY + 810)
      ctx.lineTo(lineStartX - 175, lineY + 810)
      ctx.lineTo(lineStartX - 175, lineY + 185)
      ctx.lineTo(lineStartX, lineY + 10)
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

<style lang="scss" scoped>
.rectangle {
  position: relative;
}
.deconateImg1 {
  position: absolute;
  width: 310px;
  left: -20px;
  top: -5px;
  z-index: 5;
  transform: scaleX(-1);
}
.deconateImg2 {
  position: absolute;
  width: 300px;
  left: 1230px;
  top: 410px;
  z-index: 5;
  transform: scaleY(-1);
}
</style>
