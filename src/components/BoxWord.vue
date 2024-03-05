<template>
  <div :style="{ display: displayLine ? 'flex' : 'block' }">
    <div
      class="cueword"
      v-for="(item, id) in boxword"
      :key="id"
      :class="{ textindent: this.textIndent }"
      :style="{ width: this.boxWidth + 'px', fontSize: this.wordSize + 'px', marginTop: this.wordMarginTop + 'px', textAlign: wordCenter ? 'center' : 'left', lineHeight: this.wordSize + 15 + 'px', lineHeight: lineHeight }"
    >
      <div>{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxWord',
  props: {
    boxword: {
      type: Object,
      default: undefined,
      required: true,
    },
    // 开头缩进
    textIndent: {
      type: Boolean,
      default: true,
    },
    // 盒子宽度
    boxWidth: {
      type: Number,
      default: 1550,
    },
    // 文字大小
    wordSize: {
      type: Number,
      default: 30,
    },
    // 文字居中
    wordCenter: {
      type: Boolean,
      default: false,
    },
    wordMarginTop: {
      type: Number,
      default: 0,
    },
    displayLine: {
      type: Boolean,
      default: false,
    },
    lineHeight: {
      type: Number,
      default: 1.5,
    },
  },
}
</script>

<style lang="scss" scoped>
.cueword {
  width: 1550px;

  font-size: 36px;
  color: #fff;
  margin: 0;
  padding: 0;
  line-height: 60px;
  text-align: left;
}
.textindent {
  text-indent: 2em;
}
</style>
