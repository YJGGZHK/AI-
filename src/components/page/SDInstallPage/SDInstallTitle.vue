<template>
  <div class="Install">
    <div class="left"><img :src="numberImg" alt="" /></div>
    <div><ArtWord :text="title"></ArtWord></div>
  </div>
</template>

<script>
import ArtWord from '@/components/ArtWord.vue'
export default {
  name: 'SDInstalTitle',
  components: { ArtWord },
  props: {
    numberImg: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.Install {
  display: flex;
  margin-top: 20px;
  .left {
    padding: 15px 20px 0 0;
    img {
      height: 75px;
    }
  }
}
</style>
