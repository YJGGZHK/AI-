<template>
  <div class="tipsbox">
    <div class="text" v-for="(txt, id) in content" :key="id">{{ txt.text }}</div>
  </div>
</template>

<script>
export default {
  name: 'TipsBox',
  props: {
    content: {
      type: Object,
      default: undefined,
    },
  },
}
</script>

<style lang="scss" scoped>
.tipsbox {
  width: 750px;
  padding: 12px 33px;
  border-radius: 30px;
  background: rgba(56, 56, 56, 0.5);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 5px rgba(105, 255, 246, 1);
  font-size: 24px;
  color: #fff;
  .text {
    padding: 0;
    margin: 0;
  }
}
</style>
