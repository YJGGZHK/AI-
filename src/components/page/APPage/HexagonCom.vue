<template>
  <!-- 六角形 -->
  <div style="width: 400px">
    <canvas id="hexagon" width="400" height="400"></canvas>
    <canvas id="hexagon1" width="400" height="400"></canvas>
  </div>
</template>

<script>
export default {
  name: 'HexagonCom',
  methods: {
    drawRoundedHexagon(x, y, size, lineWidth, borderColor) {
      const canvas = document.getElementById('hexagon')
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0))

      // 绘制六个角的路径
      for (let i = 1; i <= 6; i++) {
        const angle = (Math.PI / 3) * i
        const x1 = x + size * Math.cos(angle)
        const y1 = y + size * Math.sin(angle)
        ctx.lineTo(x1, y1)
      }
      ctx.setLineDash([25])
      // 设置边框粗细和颜色
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = borderColor
      ctx.closePath()
      ctx.stroke()
    },
  },
  mounted() {
    this.drawRoundedHexagon(200, 200, 200, 4, 'red')
  },
}
</script>

<style lang="scss" scoped></style>
