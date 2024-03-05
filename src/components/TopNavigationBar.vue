<template>
  <div>
    <div class="topbar" style="z-index: 999">
      <div class="icon">
        <img :src="backIcon" alt="" class="back Icon" :class="{ backshow: backShow }" @click="this.$router.back()" />
        <img :src="homeIcon" alt="" class="home Icon" @click="this.$router.push({ name: 'IndexPage' })" />
        <img :src="musicIcon" alt="" class="music Icon" @click="playAudio()" />
      </div>
      <div class="comm">
        <div class="title" :style="{ fontSize: this.titleSize + 'px' }">
          {{ title }}<span v-if="this.moTitle" style="font-size: 36px">-{{ moTitle }}</span>
        </div>
        <div class="switch">
          <div class="subtitle" @click="change()">{{ urlsubtitle }}</div>
          <img :src="circleIcon" alt="" class="circle common" v-if="this.urlsubtitle" @click="change()" />
        </div>
      </div>
      <!-- 题库 -->
      <div class="test">
        <img :src="questionQuizIcon" v-if="this.sub != 'KQ' && this.sub != 'KQN'" alt="" @click="this.$router.push({ name: 'KnowledgeQuizPage' })" />
        <img :src="backToNav" alt="" v-if="this.sub == 'KQN'" @click="backToNavigate()" />
      </div>
      <!-- 背景蒙版 -->
      <div class="masks"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopNavigationBar',
  props: {
    title: {
      type: String,
      default: '12',
    },
    backShow: {
      type: Boolean,
      default: false,
    },
    sub: {
      type: String,
      default: '',
    },
    titleSize: {
      type: Number,
      default: 48,
    },
    moTitle: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      homeIcon: 'https://img.js.design/assets/img/64ad04d7e0d3997a9da1a9ef.png#b2585c536e59e66cdc1b826687c3e0fb',
      musicIcon: 'https://img.js.design/assets/img/64ad0a836a5cdb41a8ce2cf5.png#1f6b4fe27a453fc1b884e39fde202f11',
      backIcon: 'https://img.js.design/assets/img/64ac3333e0d3997a9d82f3cb.png#4b80a8bb6e3325ca85caf32f8c539aba',
      circleIcon: 'https://img.js.design/assets/element/js_BCWoW_00g0W/image/1f73f562c01249cefa28440de015ddbdc0f81d7a.png',
      // 题库
      questionQuizIcon: 'https://img.js.design/assets/img/64d8b918df6892af98d2e6b2.png#15903c96dced23d3e50801c9164b8a1f',
      // 返回目录
      backToNav: 'https://img.js.design/assets/img/64d8e09c0747c77fbf3a4f69.png#93a8320371c960a512f8be9d6065a514',

      llindex: 0,
      currentIndex: 0,
      urlsubtitle: '',
      ll: [
        {
          e: [
            {
              text: '入门原理',
              sub: 'APIntro',
              routeName: 'APIntroPage',
            },
            {
              text: '进阶原理',
              sub: 'APUpgrade',
              routeName: 'APUpgradePage',
            },
          ],
        },
        {
          e: [
            {
              text: '入门原理',
              sub: 'SDIntro',
              routeName: 'SDIntroPage',
            },
            {
              text: '进阶原理',
              sub: 'SDUpgrade',
              routeName: 'SDUpgradePage',
            },
          ],
        },
      ],
    }
  },
  methods: {
    playAudio() {
      // 调用Vuex的action来播放音频
      console.log(this.audioIsPlaying)

      if (this.audioIsPlaying) {
        this.$store.dispatch('stopAudio')
      } else {
        this.$store.dispatch('playAudio')
      }
    },
    change() {
      this.$router.push({ name: this.ll[this.llindex].e[this.currentIndex].routeName })
    },
    backToNavigate() {
      this.$emit('backtonav', true)
    },
  },
  created() {
    for (var i = 0; i < this.ll.length; i++) {
      for (var j = 0; j < this.ll[i].e.length; j++) {
        if (this.sub == this.ll[i].e[j].sub) {
          this.llindex = i
          this.urlsubtitle = this.ll[i].e[j].text
          // console.log(this.urlsubtitle)
          this.currentIndex = (j + 1) % 2
          // console.log(this.currentIndex)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['audioIsPlaying']),
  },
}
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;

  color: rgba(105, 255, 246, 1);
  .icon {
    padding: 12px 0 0 68px;
    .backshow {
      display: inline-block !important;
    }
    .back {
      display: none;
      transition: all 0.5s;
      cursor: pointer;
    }
    .home {
      cursor: pointer;
    }
    .music {
      cursor: pointer;
    }
    img {
      width: 65px;
      margin-right: 30px;
    }
  }

  .comm {
    display: flex;
    position: absolute;
    left: 53%;
    transform: translateX(-50%);
    margin-top: 12px;
    height: 70px;
    .title {
      font-size: 48px;
      font-weight: 400;
      line-height: 70px;
    }
    .switch {
      display: flex;
      cursor: pointer;
      .subtitle {
        margin-left: 20px;
        font-size: 30px;
        height: 70px;
        font-weight: 400;
        text-align: left;
        line-height: 70px;
        padding-top: 5px;
      }
      img {
        margin: 27px 0 0 10px;
        width: 30px;
        height: 30px;
      }
    }
  }

  .masks {
    position: absolute;
    left: 0;
    top: 9%;
    width: 1920px;
    height: 900px;

    background: rgba(214, 214, 214, 0.3);
    backdrop-filter: blur(10px);
    z-index: 0;
  }
  .test {
    position: absolute;
    right: 20px;
    top: 15px;
    img {
      width: 65px;
      cursor: pointer;
    }
  }
}
</style>
