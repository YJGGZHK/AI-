<template>
  <!-- Stable Diffusion Webui“进阶原理”页面 -->
  <!-- Stable Diffusion Webui -> 进阶原理 -->
  <div id="app">
    <!-- 侧边栏导航 -->
    <SideNavigationBar style="z-index: 999"></SideNavigationBar>
    <!-- 顶部导航栏 -->
    <TopNavigationBar :title="title" :sub="'SDUpgrade'" :backShow="backshow"></TopNavigationBar>
    <div class="body" :style="{ left: Index + 'px' }">
      <!-- 1. 基本介绍 -->
      <div class="sec">
        <div class="expand">
          <!-- 如何训练AI -->
          <div class="part SDIntro">
            <div class="tit" @click="ExpandEvent1()">
              <ArtWord :text="this.introDatas[0].subtitle"></ArtWord>
              <div class="tip" style="opacity: 0">点击展开</div>
            </div>
            <BoxWord class="boxword" :boxWidth="1600" :wordSize="30" :wordMarginTop="10" :lineHeight="1.75" :boxword="this.introDatas[0].text"></BoxWord>
          </div>
          <!-- ChatGPT -->
          <div class="part SDWIntro" style="margin-top: 10px; position: relative">
            <div class="tit" @click="ExpandEvent2()">
              <ArtWord :text="this.introDatas[1].subtitle"></ArtWord>
              <div class="tip" style="opacity: 1">点击展开</div>
            </div>
            <BoxWord class="boxword" :boxWidth="900" :boxword="this.introDatas[1].text" :wordSize="30" :lineHeight="1.75"></BoxWord>
            <img :src="this.introDatas[1].img1" alt="" style="width: 415px; margin: 20px 0 0 25px" />
            <img :src="this.introDatas[1].img2" alt="" class="biger" :style="{ left: this.introDatas[1].img2Left + 'px', top: this.introDatas[1].img2Top + 'px' }" v-show="this.Expanded" />
          </div>
        </div>
      </div>
      <!-- 2. 本地搭建 -->
      <div class="sec" style="position: relative; margin-left: 20px">
        <div
          class="rectanglebox"
          v-for="(item, id) in localInstallDatas"
          :key="id"
          style="position: absolute"
          :style="{ left: item.left + 'px', top: item.top + 'px', paddingLeft: item.pad + 'px' }"
          @click="
            this.$router.push({
              name: 'SDInstallPage',
              query: {
                title: 'stable diffusion-本地搭建',
                subtitle: item.text,
                subnav: item.text,
              },
            })
          "
        >
          {{ item.text }}
        </div>
        <!-- 箭头 -->
        <img src="../../assets/pictures/ArrowLines/SDUpgrade.png" style="position: absolute; left: 140px; top: 200px" alt="" />
        <!-- <ArrowRight :length="arrow.length" v-for="(arrow, id) in ArrowSite" :key="id" style="position: absolute" :style="{ left: arrow.left + 'px', top: arrow.top + 'px' }"></ArrowRight>
        <ArrowCanvasSpecial style="position: absolute; left: 70px; top: 215px" :x1="70" :x2="-1650" :x3="-1470" :y1="200" :y2="380"></ArrowCanvasSpecial> -->
      </div>
      <!-- 3. 交互拟真 -->
      <div class="sec jhnz" style="margin-left: 115px">
        <div class="InterRea">
          <div class="le">
            <img :src="this.InterRealismDatas.introImg" alt="" style="width: 1425px" />
            <div>{{ InterRealismDatas.subtitle }}</div>
          </div>
          <div class="ri">
            <div>{{ InterRealismDatas.ModelTitle }}</div>
            <RectangleBorder class="Rec" v-for="(model, id) in InterRealismDatas.Model" :key="id" :boxWidth="200" :text="model.text" @click="this.$router.push({ name: 'SDRealismPage', query: { sub: 'SDUpgrade', subnav: model.text, title: 'stable diffusion-交互拟真' } })"></RectangleBorder>
          </div>
        </div>
      </div>
    </div>
    <BottomNavigationBar @clickIndex="handleIndex" :navItem="this.navItem" :gap="231" :currentIndex="this.clickIndex"></BottomNavigationBar>
  </div>
</template>

<script>
import TopNavigationBar from '../TopNavigationBar.vue'
import SideNavigationBar from '../SideNavigationBar.vue'
import BottomNavigationBar from '../BottomNavigationBar.vue'
import ArtWord from '../ArtWord.vue'
import BoxWord from '../BoxWord.vue'
// import ArrowRight from '../ArrowRight.vue'
import RectangleBorder from './AIdevelopPage/RectangleBorder.vue'
// import ArrowCanvasSpecial from './AIdevelopPage/ArrowCanvasSpecial.vue'
export default {
  name: 'SDUpgradePage',
  components: {
    TopNavigationBar,
    SideNavigationBar,
    BottomNavigationBar,
    ArtWord,
    BoxWord,
    // ArrowRight,
    // ArrowCanvasSpecial,
    RectangleBorder,
  },
  data() {
    return {
      title: 'stable diffusion',
      subtitle: '',
      // 返回
      backshow: false,
      // 1. 基本介绍
      introDatas: [
        {
          subtitle: 'stable diffusion介绍',
          text: [
            {
              text: 'Stable diffusion是一个基于Latent Diffusion Models（潜在扩散模型，LDMs）的文图生成（text-to-image）模型。具体来说，Stable Diffusion采用 UNetModel 这种 Encoder-Decoder 结构来实现扩散的过程。在Stable Diffusion中，通过将人类语言转换成机器能理解的数学向量，再结合语义向量，从纯噪声开始逐步去除噪声，生成图片信息隐变量，最后将图片信息隐变量转换为一张真正的图片。',
            },
          ],
        },
        {
          subtitle: 'stable diffusion-webui 介绍',
          text: [
            {
              text: 'Stable Diffusion Web UI 是由AUTOMATIC1111在GitHub上开源的一个项目，利用 gradio 模块搭建出交互程序，可以在低代码 GUI 中立即访问 Stable Diffusion。主要使用python ，JavaScript，HTML，css进行开发，集成了许多的本需要繁琐代码的操作，为使用Stable Diffusion 带来了极大的便利。',
            },
          ],
          img1: 'https://img.js.design/assets/img/64cf4b0178ea61d10c9da859.png#5e3b0d85d54c4ab950e702f79e0f58b1',
          img1Left: 50,
          img1Top: 0,
          img2: 'https://img.js.design/assets/img/64cf480e70c1109607dac86a.png#18614c6f018aa99c1a2f94b1d5026b06',
          img2Left: 1020,
          img2Top: 50,
        },
      ],

      // 2. 本地搭建
      localInstallDatas: [
        {
          text: '安装Git',
          left: 130,
          top: 177,
          pad: 29,
        },
        {
          text: '安装python3.10版',
          left: 458,
          top: 177,
          pad: 30,
        },
        {
          text: '安装stable diffusion-webui',
          left: 979,
          top: 177,
          pad: 23,
        },
        {
          text: '下载model',
          left: 1603,
          top: 177,
          pad: 27,
        },
        {
          text: '修改webui-user.bat',
          left: 325,
          top: 572,
        },
        {
          text: '下载依赖，修改launch.py',
          left: 925,
          top: 572,
          pad: 28,
        },
        {
          text: '运行',
          left: 1533,
          top: 572,
        },
      ],

      // 3. 交互拟真
      InterRealismDatas: {
        introImg: 'https://img.js.design/assets/img/64d5e5d8c8006aaa9982a5fd.png#fe2a0293690a39216b409eee8bb5f6ed',
        subtitle: 'stable diffusion-webui的操作',
        ModelTitle: '选择模型',
        Model: [
          {
            text: '文生图',
          },
          {
            text: '图生图',
          },
          {
            text: '图片后期',
          },
        ],
      },
      // 箭头坐标
      ArrowSite: [
        {
          left: 275,
          top: 175,
          length: 165,
        },
        {
          left: 710,
          top: 175,
          length: 240,
        },
        {
          left: 1340,
          top: 175,
          length: 210,
        },
        {
          left: 200,
          top: 545,
          length: 100,
        },
        {
          left: 590,
          top: 545,
          length: 310,
        },
        {
          left: 1270,
          top: 545,
          length: 230,
        },
      ],

      // 底部导航栏
      navItem: [
        { label: '基本介绍', selected: true },
        { label: '本地搭建', selected: false },
        { label: '交互拟真', selected: false },
      ],
      clickIndex: 0,
      // 第一个介绍框是否展开
      Expanded: false,
    }
  },
  computed: {
    // 实时监测改值的变化
    Index() {
      return -this.clickIndex * 1920
    },
  },
  methods: {
    // 接收子组件的值
    handleIndex(val) {
      this.clickIndex = val
      console.log(this.clickIndex)
    },
    ExpandEvent1() {
      const part1 = document.querySelector('.SDIntro')
      const part2 = document.querySelector('.SDWIntro')
      const tip1 = part1.querySelector('.tip')
      const tip2 = part2.querySelector('.tip')
      if (this.Expanded) {
        part2.style.height = '115px'
        tip2.style.opacity = '1'
        part1.style.height = '715px'
        tip1.style.opacity = '0'

        this.Expanded = !this.Expanded
      }
    },
    ExpandEvent2() {
      const part1 = document.querySelector('.SDIntro')
      const part2 = document.querySelector('.SDWIntro')
      const tip1 = part1.querySelector('.tip')
      const tip2 = part2.querySelector('.tip')
      if (!this.Expanded) {
        part2.style.height = '715px'
        tip2.style.opacity = '0'
        part1.style.height = '115px'
        tip1.style.opacity = '1'
        this.Expanded = !this.Expanded
      }
    },
  },
  created() {
    // 获取传过来的值，标题以及副标题
    this.subtitle = this.$route.query.subtitle
    // console.log(this.$route.query.title)
    const subnav = this.$route.query.subnav
    console.log(this.$route.query.subnav)
    if (subnav == '基本介绍+') {
      this.Expanded = false
      setTimeout(() => {
        this.ExpandEvent2()
      }, 100)
    }
    if (this.$route.query.backshow) {
      this.backshow = this.$route.query.backshow
    }
    // 根据传来的副标题，决定显示的第几页
    for (var i = 0; i < this.navItem.length; i++) {
      this.navItem[i].selected = false
      if (this.navItem[i].label === subnav) {
        this.navItem[i].selected = true
        this.clickIndex = i
      }
    }
    if (this.clickIndex == 0) {
      this.navItem[0].selected = true
    }
  },
}
</script>

<style lang="scss" scoped>
#app {
  width: 1920px;
  height: 1080px;
  position: relative;
  overflow: hidden;
  z-index: 10;
  background: transparent;
}

.body {
  display: flex;
  position: absolute;
  top: 9%;
  width: 5760px;
  height: 900px;
  transition: all 0.5s;
  opacity: 0;
  animation: showsec 0.25s forwards;
  @keyframes showsec {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .sec {
    position: relative;
    width: 1920px;
    padding-left: 50px;
  }
  .jhnz {
    .InterRea {
      display: flex;
      margin: 45px 0 0 25px;
      font-size: 36px;
      color: #fff;
      text-align: center;
      .ri {
        width: 350px;
        padding-top: 150px;
        text-align: center;
        div {
          margin: 40px 0;
        }
        .Rec {
          margin: 25px 65px;
          cursor: pointer;
        }
      }
    }
  }

  .expand {
    height: 100%;
    padding: 30px 0;
    margin-left: 30px;
    transition: all 0.5s;
    .part {
      border: 5px dashed rgba(166, 166, 166, 1);
      width: 1800px;
      margin: 0 auto;
      padding: 0px 70px 0 60px;
      overflow: hidden;

      transition: all 0.5s;
      .tit {
        display: flex;
        position: relative;
        width: 100%;
        padding: 0px 0 10px 20px;
        .tip {
          position: absolute;
          right: 0px;
          top: 35%;
          font-size: 20px;
          line-height: 35px;
          color: #fff;
          transition: all 0.3s;
          cursor: pointer;
        }
      }
      .boxword {
        padding-left: 30px;
      }
    }
    .SDIntro {
      height: 715px;
    }
    .SDWIntro {
      height: 115px;
      .biger {
        cursor: pointer;
        transition: all 0.35s;
        position: absolute;
        width: 745px;
        &:hover {
          width: 850px;
          z-index: 5;
          transform: translate(-10%, -5%);
        }
      }
    }
  }
  .rectanglebox {
    border: 4px solid rgba(255, 255, 255, 1);
    font-size: 30px;
    color: #fff;
    padding: 15px 29px;
    line-height: 45px;
    cursor: pointer;
    z-index: 5;

    &:hover {
      animation: boxhover 0.25s forwards; // 应用动画
    }
  }

  @keyframes boxhover {
    to {
      border-color: rgba(105, 255, 246, 1);
      color: rgba(105, 255, 246, 1);
    }
  }
}
</style>
