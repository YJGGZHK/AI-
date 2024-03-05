<template>
  <div class="artword" :class="{ vertical: vertical }">
    <div class="q1">{{ text }}</div>
    <div class="q2">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'ArtWord',
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.artword {
  position: relative;
  width: 600px;
  margin: 25px 0 15px 25px;
  font-size: 42px;
  height: fit-content;
  color: rgba(105, 255, 246, 1);
}
.vertical {
  writing-mode: horizontal-tb; //默认 writing-mode: vertical-rl; //
  writing-mode: vertical-rl;
  width: 42px;
  height: 230px;
  line-height: 43px;
  letter-spacing: 14px;
}

.q2 {
  position: absolute;
  left: 2px;
  top: 1px;
  color: #fff;
}
</style>
