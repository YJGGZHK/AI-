<template>
  <div class="timenode">
    <div class="thing">
      {{ develops.thing }}
      <div class="year">{{ develops.year }}</div>
    </div>
    <div class="intro" :style="{ width: develops.introWidth }">{{ develops.intro }}</div>
  </div>
</template>

<script>
export default {
  name: 'TimeNode',
  props: {
    develops: {
      type: Object,
      default: undefined,
    },
  },
}
</script>

<style lang="scss" scoped>
.timenode {
  color: #fff;
  text-align: center;
  transition: all 0.3s;
  font-weight: 400;
  z-index: 5;
  margin-top: 50px;
  width: 600px;
  cursor: pointer;
  &:nth-child(3) {
    width: 450px;
  }
  .thing {
    position: relative;
    height: 80px;
    line-height: 76px;
    width: fit-content;
    border: 4px solid rgba(255, 255, 255, 1);
    font-size: 30px;
    padding: 0 28px;
    margin-bottom: 20px;
    .year {
      position: absolute;
      left: 50%;
      margin: 0;
      top: -100%;
      min-width: 120px !important;
      transform: translateX(-50%);
      font-size: 30px;
    }
  }
  .intro {
    font-size: 24px;
    width: 400px;
    text-align: left;
    line-height: 35px;
  }
  &:hover {
    color: rgba(105, 255, 246, 1);
    .thing {
      border-color: rgba(105, 255, 246, 1);
    }
  }
}
</style>
