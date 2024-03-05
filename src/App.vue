<template>
  <div id="app">
    <div class="bigbox">
      <img :src="bgImg" alt="" class="bgImg" />
      <video id="video" src="./assets/videos/background.mp4" class="bgVideo" autoplay muted loop v-if="this.currentRouteComponent == 'IndexPage'"></video>

      <audio ref="audioPlayer" preload="auto" autoplay v-if="audioIsPlaying" loop>
        <source src="./assets/audios/Legacy.mp3" type="audio/mpeg" />
      </audio>

      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapGetters(['audioIsPlaying']),
  },
  data() {
    return {
      bgImg: 'https://img.js.design/assets/img/64a6c335c6ce3224527c27a4.png#d43e855f4cd851231b618daf33a7a2b4',
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      isOpen: false,
      currentRouteComponent: null,
    }
  },
  created() {
    // 初始化时获取当前路由对应的组件名
    this.currentRouteComponent = this.$route.name
  },
  watch: {
    // 监听路由变化，更新当前路由对应的组件名
    $route() {
      this.currentRouteComponent = this.$route.name
    },
  },
  mounted() {
    // this.handleResize()
    this.handleResize2()

    // setTimeout(() => {
    //   this.$store.dispatch('stopAudio')
    //   console.log(this.audioIsPlaying)

    //   this.$store.dispatch('playAudio')
    //   console.log(this.audioIsPlaying)
    // }, 250)
    window.addEventListener('resize', this.handleResize2)
  },
  methods: {
    ...mapMutations(['setAudioPlaying']), // 将设置音频播放状态的mutation映射到methods中

    playAudio() {
      // 调用Vuex的action来播放音频
      this.$store.dispatch('playAudio')
    },
    stopAudio() {
      // 调用Vuex的action来停止音频
      this.$store.dispatch('stopAudio')
    },
    handleResize() {
      this.viewportWidth = window.innerWidth
      this.viewportHeight = window.innerHeight
      const body = document.querySelector('.bigbox')
      if (this.viewportHeight <= 1080 && this.viewportWidth <= 1920) {
        body.style.top = '0'
        body.style.left = '0'
        body.style.transform = 'translate(0, 0)'
      } else if (this.viewportHeight <= 1080) {
        body.style.top = '0'
        body.style.left = '50%'
        body.style.transform = 'translate(-50%,0)'
      } else if (this.viewportWidth <= 1920) {
        body.style.top = '50%'
        body.style.left = '0'
        body.style.transform = 'translate(0, -50%)'
      } else {
        body.style.top = '50%'
        body.style.left = '50%'
        body.style.transform = 'translate(-50%, -50%)'
      }
      console.log('w' + this.viewportWidth)
      console.log('h' + this.viewportHeight)
    },
    handleResize2() {
      this.viewportWidth = window.innerWidth
      this.viewportHeight = window.innerHeight
      const bodybox = document.querySelector('.bigbox')
      // bigbox缩放大小
      var actualwidth = 0.8 * this.viewportWidth
      var actualscale = actualwidth / 1920

      bodybox.style.transform = `scale(${actualscale})`

      // bigbox的margin页边距
      var marginLeft = (this.viewportWidth - 1920 * actualscale) / 2
      var marginTop = (this.viewportHeight - 1080 * (actualscale - 0.02)) / 2
      bodybox.style.marginLeft = marginLeft + 'px'
      bodybox.style.transform = `scale(${actualscale}) translateY(${marginTop}px)`

      console.log('w' + this.viewportWidth)
      console.log('h' + this.viewportHeight)
    },
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: '思源黑体';
}
a {
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.5);
  margin: 0;

  .bigbox {
    position: absolute;
    // margin: auto;
    width: 1920px;
    height: 1080px;
    position: relative;
    overflow: hidden;
    transform-origin: left top;

    .bgImg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;
    }
    .bgVideo {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
    }
  }
}
</style>
