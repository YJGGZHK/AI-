<template>
  <!-- Stable Diffusion Webui“入门原理”页面 -->
  <!-- Stable Diffusion Webui -> 入门原理 -->
  <div id="app">
    <!-- 侧边栏导航 -->
    <SideNavigationBar style="z-index: 999"></SideNavigationBar>
    <!-- 顶部导航栏 -->
    <TopNavigationBar :title="title" :sub="'SDIntro'" :backShow="backshow"></TopNavigationBar>

    <!-- 主题内容 -->
    <div class="body" :style="{ left: Index + 'px' }">
      <!-- 1. 基本介绍 -->
      <div class="sec" style="margin-left: 200px; margin-top: 50px">
        <ArtWord :text="introDatas[0].subtitle" style="margin-bottom: 20px"></ArtWord>
        <BoxWord :boxword="introDatas[0].text" style="margin-bottom: 70px; margin-left: 20px" :wordSize="30" :lineHeight="1.75"></BoxWord>
        <ArtWord :text="introDatas[1].subtitle" style="margin-bottom: 20px"></ArtWord>
        <BoxWord :boxword="introDatas[1].text" style="margin-left: 20px" :wordSize="30" :lineHeight="1.75"></BoxWord>
      </div>
      <!-- 2. 本地搭建 -->
      <div class="sec" style="position: relative">
        <ArtWord :text="localInstallDatas.subtitle" :vertical="true" style="position: absolute; left: 90px; top: 20px"></ArtWord>
        <div class="configTitle">
          <div class="com">
            <img :src="computerIcon" alt="" />
          </div>
          <div class="lower">最低配置</div>
          <div class="recommend">推荐配置</div>
        </div>
        <div class="confi">
          <div class="configura" v-for="(item, id) in localInstallDatas.configuration" :key="id">
            <div class="category">{{ item.category }}</div>
            <div class="lo">{{ item.lower }}</div>
            <div class="recommend">{{ item.recommend }}</div>
          </div>
        </div>
        <div class="tips">
          <div class="low">约<font style="color: rgba(255, 141, 26, 1)">1-2分钟</font>一张图，可绘制分辨率512*512像素</div>
          <div class="recom">约<font style="color: rgba(255, 141, 26, 1)">10-30秒</font>一张图，可绘制分辨率1024*1024像素</div>
        </div>
        <BoxWord :boxword="localInstallDatas.text" :boxWidth="1600" :wordSize="30" :lineHeight="1.75" style="position: absolute; left: 25px; top: 640px; margin-left: 20px"></BoxWord>
      </div>
      <!-- 3. 交互拟真 -->
      <div class="sec">
        <div class="InterRea">
          <div class="le">
            <img :src="this.InterRealismDatas.introImg" alt="" style="width: 1425px" />
            <div>{{ InterRealismDatas.subtitle }}</div>
          </div>
          <div class="ri">
            <div>{{ InterRealismDatas.ModelTitle }}</div>
            <RectangleBorder class="Rec" v-for="(model, id) in InterRealismDatas.Model" :key="id" :boxWidth="200" :text="model.text" @click="this.$router.push({ name: 'SDRealismPage', query: { sub: 'SDIntro', subnav: model.text, title: 'stable diffusion-交互拟真' } })"></RectangleBorder>
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
// 使用AIDevelop的组件
import RectangleBorder from './AIdevelopPage/RectangleBorder.vue'
export default {
  name: 'SDIntroPage',
  components: {
    TopNavigationBar,
    SideNavigationBar,
    BottomNavigationBar,
    ArtWord,
    BoxWord,
    RectangleBorder,
  },
  data() {
    return {
      title: 'stable diffusion',
      subtitle: '',
      // 返回
      backshow: false,
      // 基本介绍
      introDatas: [
        {
          subtitle: 'stable diffusion介绍',
          text: [
            {
              text: ' Stable diffusion是一种基于潜在扩散模型（Latent Diffusion Models）的文本到图像生成模型，能够根据任意文本输入生成高质量、高分辨率、高逼真的图像。',
            },
            {
              text: '开源软件(Open Source Software) 又称开放源代码软件,是源代码可以任意获取的计算机软件这种软件的著作权持有人在软件协议的规定下保留一部分权利并允许用户学习、修改以及以任何目的向任何人分发该软件。         Stable Diffusion的代码和模型权重已公开发布可以在大多数配备有适度GPU的电脑硬件上运行。而以前的专有文生图模型(如DALL-E和Midjourney)只能通过云计算。',
            },
          ],
        },
        {
          subtitle: 'stable diffusion-wehui介绍',
          text: [
            {
              text: 'Stable Diffusion Web UI 是一个基于 Stable Diffusion 的基础应用，将Stable Diffusion的操作可视化。',
            },
          ],
        },
      ],

      // 本地搭建
      localInstallDatas: {
        subtitle: '配置清单',
        text: [
          {
            text: 'stable diffusion是全面开源的这意味着你可以在你自己的电脑上部署整个程序使用它出图作画是完全免费而且不限量的，市面上大多数商业级的AI绘画应用都是基于stable diffusion开发的，因此，如果你能掌握他的根本逻辑就能得心应手的使用任何一款门槛比他更低的工具，尽管stable defusion非常亲民但他还是有一定的配置要求，首先他只能在Windows或者Mac电脑的系统上运行，其次他需要一张性能足够强大的独立显卡提供算力进行绘制。',
          },
        ],
        configuration: [
          {
            category: '操作系统',
            lower: '无硬性要求',
            recommend: 'Windows 10 64位',
          },
          {
            category: 'CPU',
            lower: '无硬性要求',
            recommend: '支持64位的多核处理器',
          },
          {
            category: '显卡',
            lower: 'GTX 1660Ti及同等性能显卡',
            recommend: 'RTX 3060T及同等性能显卡',
          },
          {
            category: '显存',
            lower: '6GB',
            recommend: '8GB',
          },
          {
            category: '内存',
            lower: '8GB',
            recommend: '16GB',
          },
          {
            category: '硬盘空间',
            lower: '20GB的可用硬盘空间',
            recommend: '100~150GB的可用硬盘空间',
          },
        ],
      },
      computerIcon: 'https://img.js.design/assets/element/js_ZrTPjrCZovy/image/e410ba7da99345c148ba18bdfd2bbc0b41daef98.png',

      // 交互拟真
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
      // 底部导航栏
      navItem: [
        { label: '基本介绍', selected: true },
        { label: '本地搭建', selected: false },
        { label: '交互拟真', selected: false },
      ],
      clickIndex: 0,
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
  },
  created() {
    // 获取传过来的值，标题以及副标题
    this.subtitle = this.$route.query.subtitle
    // console.log(this.$route.query.title)
    const subnav = this.$route.query.subnav
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
    console.log('click' + this.clickIndex)
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
    .confi {
      width: 1225px;
      border-top: 4px solid rgba(255, 255, 255, 1);
      border-bottom: 4px solid rgba(255, 255, 255, 1);
      position: absolute;
      left: 240px;
      top: 105px;
      .configura {
        display: flex;
        border-top: 2px solid rgba(255, 255, 255, 1);
        text-align: left;
        line-height: 60px;
        font-size: 30px;
        color: #fff;
        width: 1225px;
        height: 73px;
        line-height: 73px;

        .category {
          width: 150px;
          color: rgba(105, 255, 246, 1);
        }
        .lo {
          width: 550px;
        }
        .recommend {
          width: 525px;
        }
      }
    }
    .configTitle {
      position: absolute;
      left: 240px;
      top: 30px;
      display: flex;
      line-height: 60px;
      font-size: 36px;
      color: rgba(105, 255, 246, 1);

      .com {
        width: 150px;
        margin-top: 10px;
        img {
          width: 45px;
        }
      }
      .lower {
        width: 550px;
      }
      .recommend {
        width: 4525px;
      }
    }
    .tips {
      display: flex;
      position: absolute;
      top: 570px;
      left: 240px;
      font-size: 24px;
      line-height: 35px;
      color: #fff;
      .low {
        width: 700px;
      }
    }
  }
  .sec {
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
}
</style>
