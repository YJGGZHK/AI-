<template>
  <!-- 首页 页面 -->
  <div id="app">
    <!-- 侧边栏 -->
    <SideNavigationBar></SideNavigationBar>
    <!-- ‘AI绘画’图片 -->
    <!-- <img :src="aiImg" alt="" class="aiImg" /> -->

    <!-- 按钮 -->
    <div class="button Ai" v-for="(item, id) in IndexButtons" :key="id" :style="{ height: item.isExpanded ? item.buttonHeight : '100px', left: item.left, top: item.top, width: item.buttonWidth }" @mouseover="ShowTips(id)" @mouseout="HideTips(id)">
      <div class="option" v-for="(option, key) in item.options" :key="key">
        <p :class="{ 'sm-size': option.isSmall }" @click="toggleButton(id, key)" style="display: block">{{ option.text }}</p>
      </div>
    </div>

    <!-- Tips -->
    <TipsBox v-for="(item, id) in ButtonTips" :key="id" class="tipsbox" :content="item.content" :style="{ left: item.left, top: item.top, opacity: item.show }" v-show="item.has"></TipsBox>
    <!-- TopIcons -->
    <div class="topicons" style="margin-left: 100px">
      <img :src="musicIcon" alt="" style="width: 65px; position: absolute; left: 70px; top: 20px; cursor: pointer" @click="playAudio()" />
      <img :src="questionQuizIcon" style="width: 65px; position: absolute; right: 30px; top: 20px; cursor: pointer" alt="" @click="this.$router.push({ name: 'KnowledgeQuizPage' })" />
    </div>
  </div>
</template>

<script>
import SideNavigationBar from '../SideNavigationBar.vue'
import TipsBox from '../TipsBox.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  components: { SideNavigationBar, TipsBox },
  data() {
    return {
      aiImg: 'https://img.js.design/assets/img/64ab9d8c8bcac05a23193916.png#b5501521c14192b994a57f66f7a65846',
      questionQuizIcon: 'https://img.js.design/assets/img/64d8b918df6892af98d2e6b2.png#15903c96dced23d3e50801c9164b8a1f',
      musicIcon: 'https://img.js.design/assets/img/64ad0a836a5cdb41a8ce2cf5.png#1f6b4fe27a453fc1b884e39fde202f11',
      // 是否已经展开
      IndexButtons: [
        // Each button's initial state
        {
          id: '0',
          isExpanded: false,
          animating: false,
          buttonHeight: '300px',
          buttonWidth: '244px',
          options: [
            {
              text: '人工智能',
              routeName: '',
            },
            {
              text: '发展过程',
              subNav: '发展过程',
              routeName: 'AIdevelopPage',
            },
            {
              text: '拓展介绍',
              subNav: '拓展介绍',
              routeName: 'AIdevelopPage',
            },
          ],
          left: '250px',
          top: '120px',
          size: -1,
          switchButton: false,
        },
        {
          id: '1',
          isExpanded: false,
          animating: false,
          buttonHeight: '300px',
          buttonWidth: '244px',
          options: [
            {
              text: 'AI绘画',
              routeName: '',
            },
            {
              text: '入门原理',
              subNav: '绘制过程',
              routeName: 'APIntroPage',
            },
            {
              text: '进阶原理',
              subNav: '提示词',
              routeName: 'APUpgradePage',
            },
          ],
          left: '195px',
          top: '695px',
          size: -1,
          switchButton: true,
        },
        {
          id: '2',
          isExpanded: false,
          animating: false,
          buttonHeight: '300px',
          buttonWidth: '332px',
          options: [
            {
              text: 'Stable Diffusion WebUI',
              routeName: '',
              isSmall: true,
            },
            {
              text: '入门原理',
              subNav: '基本介绍',
              routeName: 'SDIntroPage',
            },
            {
              text: '进阶原理',
              subNav: '基本介绍',
              routeName: 'SDUpgradePage',
            },
          ],
          top: '195px',
          left: '1385px',
          size: 0,
          switchButton: true,
        },
        {
          id: '3',
          isExpanded: false,
          animating: false,
          buttonHeight: '400px',
          buttonWidth: '264px',
          options: [
            {
              text: '实际运用',
              routeName: '',
            },
            {
              text: '绘画辅助',
              subNav: '绘制过程',
              routeName: 'PAPaintingPage',
            },
            {
              text: '辅助建筑设计',
              subNav: '辅助建筑设计',
              routeName: 'PAPaintingPage',
              isSmall: false,
            },
            {
              text: '绘画2D转3D',
              subNav: '绘画2D转3D',
              routeName: 'PAPaintingPage',
            },
          ],
          left: '1480px',
          top: '600px',
          size: 2,
          switchButton: false,
        },
      ],
      ButtonTips: [
        {
          id: '0',
          content: [
            {
              text: '人工智能的英文名字是 Artificial Interlligence，缩写为AI。简单来说， 是让机器能够模拟人类的思维能力，像人一样感知，思考和决策。',
            },
            {
              text: '以前，是我们学习机器语言来向机器发出指令，而现在，是让机器模拟人类的视角，学习自然语言，通过符号逻辑、概率统计、神经网络、进化仿生等多个方面来总结特征，进而做出正确的判断。',
            },
          ],
          left: '539px',
          top: '118px',
          has: true,
          show: '0',
        },
        {
          id: '1',
          content: [
            {
              text: 'AI绘画，也就是人工智能绘画。',
            },
            {
              text: '创作者打开相应的AI绘画软件，在创作页面，只需要输入相应的关键词，然后点击创作，十几秒后，一幅画作就生成了。',
            },
            {
              text: 'AI绘画是指利用人工智能技术辅助完成绘画或替代传统手绘的绘画方式。具体来说，AI绘画是由一系列算法设计出来的，能够模拟出一等艺术家真实的绘画技法、风格、文化背景等重要因素，通过训练和输入数据之后，进行图像生成和编辑的一个过程。',
            },
          ],
          left: '483px',
          top: '694px',
          has: true,
          show: '0',
        },
        {
          id: '2',
          content: [],
          has: false,
          show: '0',
        },
        {
          id: '3',
          content: [],
          has: false,
          show: '0',
        },
      ],
    }
  },
  methods: {
    playAudio() {
      // 调用Vuex的action来播放音频

      if (this.audioIsPlaying) {
        this.$store.dispatch('stopAudio')
      } else {
        this.$store.dispatch('playAudio')
      }
      console.log(this.audioIsPlaying)
    },
    toggleAudioState() {
      console.log(this.$parent.$refs)
      console.log(this.audio)
    },
    animateElement(element, duration, opacityValue, transformValue) {
      setTimeout(() => {
        element.style.transform = transformValue
        element.style.opacity = opacityValue
      }, duration)
    },
    ShowTips(id) {
      this.ButtonTips[id].show = '1'
    },
    HideTips(id) {
      this.ButtonTips[id].show = '0'
    },
    toggleButton(index, key) {
      // 判断是否为第一个按钮
      if (key !== 0) {
        this.$router.push({
          name: this.IndexButtons[index].options[key].routeName,
          query: { title: this.IndexButtons[index].options[0].text, subtitle: this.IndexButtons[index].options[key].subtitle, subnav: this.IndexButtons[index].options[key].subNav, length: this.IndexButtons[index].options.length, switchButton: this.IndexButtons[index].switchButton },
        })
      } else {
        if (!this.IndexButtons[index].animating) {
          this.IndexButtons[index].animating = true
          // 获取当前点击的button对象
          var button = document.querySelectorAll('.button')[index]
          // console.log(button)
          const firstOption = button.querySelector('.option:first-child').querySelector('p')
          const lastOption = button.querySelector('.option:last-child').querySelector('p')
          if (firstOption) {
            // 无论菜单是否已经下拉都执行的任务

            button.style.transform = 'translateY(5px)'
            button.style.opacity = '0.5'
            this.animateElement(button, 100, '1', 'translateY(0px)')

            // After the animation, expand the button
            setTimeout(() => {
              this.IndexButtons[index].isExpanded = !this.IndexButtons[index].isExpanded
              this.IndexButtons[index].animating = false
            }, 200)

            // 在菜单未下拉时执行的任务 & 已下拉时执行的任务
            if (this.IndexButtons[index].isExpanded == false) {
              firstOption.style.transform = 'translateY(-15px)'
              this.animateElement(firstOption, 150, '0', 'translateY(200px)')
              this.animateElement(firstOption, 320, '0', 'translateY(0px)')
              this.animateElement(firstOption, 500, '1', 'translateY(0px)')
            } else {
              this.animateElement(lastOption, 0, '1', 'translateY(20px)')
              this.animateElement(lastOption, 150, '0', 'translateY(-100px)')
              this.animateElement(lastOption, 500, '1', 'translateY(0px)')
            }
          }
        }
      }
    },
  },

  computed: {
    ...mapGetters(['audioIsPlaying']),
    expandedHeight() {
      // Calculate the height of the expanded button based on the number of options
      const options = document.querySelectorAll('.option')
      return options.length * 100 + 'px'
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  width: 1920px;
  height: 1080px;
  position: relative;
  z-index: 10;
  background: transparent;
}

.aiImg {
  position: absolute;
  left: 0;
  top: 0;
}
.button {
  width: 244px;
  height: 100px;
  border-radius: 30px;
  background: rgba(92, 92, 92, 0.5);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 5px rgba(105, 255, 246, 1);

  // backdrop-filter: blur(8px);
  overflow: hidden;
  transition: all 0.35s;
  cursor: pointer;
  .option {
    height: 100px;
    margin: 0 22px;
    line-height: 100px;
    text-align: center;
    font-size: 36px;
    cursor: pointer;

    color: rgba(105, 255, 246, 1);
    p {
      transition: all 0.3s;
    }
    &:not(:first-child) {
      border-top: 3px solid white;
      color: #fff;
    }
  }
}
.Ai {
  position: absolute;
  left: 250px;
  top: 120px;
}
// 下拉菜单动画
.button.expanded {
  height: 300px;
}
.sm-size {
  font-size: 27px;
}
.tipsbox {
  position: absolute;
  transition: all 0.45s;
}
</style>
