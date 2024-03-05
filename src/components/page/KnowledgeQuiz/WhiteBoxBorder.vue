<template>
  <div>
    <div class="box">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'WhiteBoxBorder',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  border: 4px solid rgba(255, 255, 255, 1);
  font-size: 36px;
  color: #fff;
  line-height: 42px;
  width: fit-content;
  padding: 11px 50px;
  transition: all 0.25s;
  &:hover {
    border-color: rgba(105, 255, 246, 1);
    color: rgba(105, 255, 246, 1);
  }
}
</style>
