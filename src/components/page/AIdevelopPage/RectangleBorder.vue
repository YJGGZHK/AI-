<template>
  <div>
    <!-- 人工智能 页面的拓展介绍的实线边框-->
    <div class="smbox" :style="{ width: boxWidth == 0 ? 'fit-content' : boxWidth + 'px' }">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'RectangleBorder',
  props: {
    text: {
      type: String,
      required: true,
    },
    boxWidth: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.smbox {
  height: 65px;
  width: fit-content;
  padding: 0 15px;
  margin: 0 7.5px;
  border: 4px solid rgba(105, 255, 246, 1);
  line-height: 61px;
  font-size: 30px;
  color: #fff;
  text-align: center;
}
</style>
