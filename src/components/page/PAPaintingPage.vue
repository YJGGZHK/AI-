<template>
  <!-- 实际应用 页面 -->
  <div id="app">
    <!-- 侧边栏导航 -->
    <SideNavigationBar style="z-index: 999"></SideNavigationBar>
    <!-- 顶部导航栏 -->
    <TopNavigationBar :sub="PA" :title="title" :backShow="backshow"></TopNavigationBar>
    <div class="body" :style="{ left: Index + 'px' }">
      <!-- 1. 绘画辅助 -->
      <div class="sec">
        <!-- 内容 -->
        <div class="part" v-for="(item, id) in drawingAid" :key="id" :style="{ opacity: this.drawingIndex == id ? '1' : '0', 'z-index': this.drawingIndex === id ? '5' : '1' }">
          <div style="display: flex; justify-content: center; align-items: center">
            <div><img :src="item.img" alt="" style="height: 770px" /></div>
          </div>
          <div style="text-align: center; font-size: 30px; color: #fff; width: 1600px; line-height: 52px; margin-top: 7px">{{ item.tips }}</div>
        </div>
        <!-- 两侧的箭头 -->
        <div class="left-arrow" :style="{ display: this.drawingIndex == 0 ? 'none' : 'block' }">
          <img :src="leftArrowImg" alt="" @click="this.drawingIndex -= 1" />
        </div>
        <div class="right-arrow" :style="{ display: this.drawingIndex == this.drawingAid.length - 1 ? 'none' : 'block' }">
          <img :src="rightArrowImg" alt="" @click="this.drawingIndex += 1" />
        </div>
        <!-- 五个圆形按钮 -->
        <div class="fiveCircle">
          <div class="circleButton" v-for="(item, id) in drawingAid" :key="id" :style="{ background: this.drawingIndex == id ? 'rgba(105, 255, 246, 1)' : 'transparent' }" @click="this.drawingIndex = id"></div>
        </div>
      </div>

      <!-- 2. 辅助建筑设计 -->
      <div class="sec">
        <!-- 内容 -->
        <div class="part designA" :style="{ opacity: this.designIndex == 0 ? '1' : '0', 'z-index': this.designIndex === 0 ? '5' : '1' }">
          <div class="tips">{{ this.design[0].tips }}</div>
          <BoxWord :boxword="this.design[0].content" :wordMarginTop="60" :wordSize="30" :lineHeight="1.75" :textIndent="false"></BoxWord>
        </div>
        <div class="part designB" :style="{ opacity: this.designIndex == 1 ? '1' : '0', 'z-index': this.designIndex === 1 ? '5' : '1' }">
          <div style="display: flex">
            <ArtWord :text="this.design[1].artword"></ArtWord>
            <div style="transform: translate(-100px, 10px)"><img :src="this.design[1].img" alt="" style="width: 1250px" /></div>
          </div>
          <BoxWord :boxword="this.design[1].content" :boxWidth="1600" style="margin: 40px 0 0 70px"></BoxWord>
        </div>
        <div class="part designC" :style="{ opacity: this.designIndex == 2 ? '1' : '0', 'z-index': this.designIndex === 2 ? '5' : '1' }">
          <ArtWord :text="this.design[2].artword" style="transform: translateX(-80px); margin-bottom: 20px"></ArtWord>
          <img :src="this.design[2].img" alt="" />
          <BoxWord :boxWidth="1600" :boxword="this.design[2].content"></BoxWord>
        </div>
        <div class="part designD" :style="{ opacity: this.designIndex == 3 ? '1' : '0', 'z-index': this.designIndex === 3 ? '5' : '1' }">
          <div style="display: flex">
            <ArtWord :text="this.design[3].artword"></ArtWord>
            <div style="transform: translate(-100px, 10px)"><img :src="this.design[3].img" alt="" style="width: 1250px" /></div>
          </div>
          <BoxWord :boxword="this.design[3].content" :textIndent="false" :boxWidth="1400" style="margin: 40px 0 0 200px"></BoxWord>
        </div>
        <!-- 两侧的箭头 -->
        <div class="left-arrow" :style="{ display: this.designIndex == 0 ? 'none' : 'block' }">
          <img :src="leftArrowImg" alt="" @click="this.designIndex -= 1" />
        </div>
        <div class="right-arrow" :style="{ display: this.designIndex == this.design.length - 1 ? 'none' : 'block' }">
          <img :src="rightArrowImg" alt="" @click="this.designIndex += 1" />
        </div>
        <!-- 五个圆形按钮 -->
        <div class="fiveCircle">
          <div class="circleButton" v-for="(item, id) in design" :key="id" :style="{ background: this.designIndex == id ? 'rgba(105, 255, 246, 1)' : 'transparent' }" @click="this.designIndex = id"></div>
        </div>
      </div>

      <!-- 3. 绘画2D转3D -->
      <div class="sec">
        <!-- 内容 -->
        <div class="part" v-for="(item, id) in painting2D" :key="id" :style="{ opacity: this.painting2DIndex == id ? '1' : '0', 'z-index': this.painting2DIndex === id ? '5' : '1' }">
          <div style="display: flex; justify-content: center; align-items: center">
            <div><img :src="item.img" alt="" style="height: 700px" /></div>
          </div>
          <div style="text-align: center; font-size: 30px; color: #fff; width: 1600px; line-height: 52px; margin-top: 25px">{{ item.tips }}</div>
          <div style="text-align: center; font-size: 30px; color: #fff; width: 1600px; line-height: 52px" v-if="item.tips1">{{ item.tips1 }}</div>
        </div>
        <!-- 两侧的箭头 -->
        <div class="left-arrow" :style="{ display: this.painting2DIndex == 0 ? 'none' : 'block' }">
          <img :src="leftArrowImg" alt="" @click="this.painting2DIndex -= 1" />
        </div>
        <div class="right-arrow" :style="{ display: this.painting2DIndex == painting2D.length - 1 ? 'none' : 'block' }">
          <img :src="rightArrowImg" alt="" @click="this.painting2DIndex += 1" />
        </div>
        <!-- 五个圆形按钮 -->
        <div class="fiveCircle">
          <div class="circleButton" v-for="(item, id) in painting2D" :key="id" :style="{ background: this.painting2DIndex == id ? 'rgba(105, 255, 246, 1)' : 'transparent' }" @click="this.painting2DIndex = id"></div>
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
export default {
  name: 'PAPaintingPage',
  components: { TopNavigationBar, SideNavigationBar, BottomNavigationBar, ArtWord, BoxWord },
  data() {
    return {
      title: '实际运用',
      subtitle: '',
      // 返回
      backshow: false,
      // 绘制辅助
      leftArrowImg: 'https://img.js.design/assets/element/js_L7tlPnv9CVk/image/add872fecfafe42935cdbea099a7749ce09d8c80.png',
      rightArrowImg: 'https://img.js.design/assets/element/js_uxwwr7ZwCE1/image/a87dac7e9f312930e983211ccb95ceba33a31f36.png',
      drawingIndex: 0,
      drawingAid: [
        {
          id: 0,
          img: 'https://img.js.design/assets/img/64d9c5e06e2bb7ad721d2798.png#0913f21e51f39381abe304eaa062fe23',
          tips: '首先使用绘图软件绘制草图',
        },
        {
          id: 1,
          img: 'https://img.js.design/assets/img/64d9c76e6e2bb7ad721db492.png#a9a8299982e432905bfb1d2ca4c1d931',
          tips: '导入stable diffusion里 选择线稿的模型 提供正向和反向的关键词 利用图生图模式 生成优化后的线稿',
        },
        {
          id: 2,
          img: 'https://img.js.design/assets/img/64d9ca9a902ea45bbe7b8068.png#2e71f3ac036f830a3dc7fa2ecfce8bb3',
          tips: '不断调整到合适的草图，将合适的草图导入ps(或其他绘画软件中进行微调)',
        },
        {
          id: 3,
          img: 'https://img.js.design/assets/img/64d9cacd88b1d8299784e5b2.png#1b8cc6a02edcd23d7bc22a178539577e',
          tips: '将确定的线稿导入stable diffusion 中的文生图模式中 利用controlnet的canny功能完成上色',
        },
        {
          id: 4,
          img: 'https://img.js.design/assets/img/64d9cb076c12b3f094a35ef9.png#a712582f5180c4a2aadfd85eac2ad74b',
          tips: '调试后得到最终的图片',
        },
      ],

      // 辅助建筑设计
      designIndex: 0,
      design: [
        {
          id: 0,
          tips: '使用Stable diffusio运用AI实现通过文字或者建筑草图生成概念图和参考图',
          content: [
            {
              text: '1. 需要下载额外的模型',
            },
            {
              text: '2. 在civit ai（https://civitai.com/）官网中，找到architecture标签。其中分为模型（checkpoint）和微调模型（lora）两种， chekpoint指的是经过训练的图片合集，被称作模型，也就是CKPT。而Lora是一种体积较小的绘画模型，是对大模型的微调。可以在已选择大模型的基础上添加一个甚至多个。',
            },
            {
              text: '3. 选择checkpoint的类型进行下载',
            },
          ],
        },
        {
          id: 1,
          img: 'https://img.js.design/assets/img/64da36d8c8aedc5dee8fc3a7.png#58cb48b465b33d5040c94dca3741e229',
          artword: '文生图模式',
          content: [
            {
              text: '需要输入提示词和反向提示词，反向提示词用于减少错误的生成，如模糊，水印等。选择DDIM的采样方法，确定迭代次数和生成数量，点击右侧生成，多次生成找效果好的。',
            },
            {
              text: '不同的基础模型生成的图片不一样。若想保存一套不错的样式时，点击左侧绿色的随机种子生成按钮，根据生成的种子代码调高迭代次数观察，满意后进行下载运用。',
            },
          ],
        },
        {
          id: 2,
          img: 'https://img.js.design/assets/img/64da3aacc1f4a1f2511c8373.png#bbbd1fce7e616e637d03270e4626dec0',
          artword: '图生图模式',
          content: [
            {
              text: '在ControlNet导入草图，勾选enable，在下方的preeprocessor中选择模型草图，一般为misd，进行生成预览。',
            },
          ],
        },
        {
          id: 3,
          img: 'https://img.js.design/assets/img/64da3b8069fcf662f08bceec.png#192d31a9089ab55c5a47f4e2d7ded6ab',
          artword: '图生图模式',
          content: [
            {
              text: 'LORA是风格样式模型，在civitai网站中下载LORA后，可以选择相应的风格，进行生成。通过多次迭代筛选，生成合适自己的概念图，最后进行细节的微调及导出。',
            },
          ],
        },
      ],

      // 绘画2D转3D
      painting2DIndex: 0,
      painting2D: [
        {
          id: 0,
          img: 'https://img.js.design/assets/img/64da468488b1d829979d71d8.png#0ff27c6dbaa7e2361fe08586276e98cc',
          tips: '运用Stable diffusio运用AI实现 草图→清稿→上色→3d效果全流程',
          tips1: '首先完成草图的绘画',
        },
        {
          id: 1,
          img: 'https://img.js.design/assets/img/64da47cfd741e32db86911c1.png#7c23413a9e904cfd5c4357dca22e3379',
          tips: '运用stable diffusion 的图生图功能完成 线稿的重绘',
        },
        {
          id: 2,
          img: 'https://img.js.design/assets/img/64da481595e43e299c70ce05.png#c329c6ed6e36fb75bb2a1369661db220',
          tips: '运用文图功能 完成上色',
        },
        {
          id: 3,
          img: 'https://img.js.design/assets/img/64da482c447893e8b2e48144.png#056ea9d999230e72f67e0e7f61913173',
          tips: '运用3d的模型完成2D到3D的转换',
        },
      ],

      // 底部导航栏
      navItem: [
        { label: '绘画辅助', selected: true },
        { label: '辅助建筑设计', selected: false },
        { label: '绘画2D转3D', selected: false },
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
    // console.log(this.$route.query.title)
    this.subtitle = this.$route.query.subtitle
    const subnav = this.$route.query.subnav
    this.switchButton = this.$route.query.switchButton
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
    padding-left: 100px;
    overflow: hidden;

    .part {
      position: absolute;
      left: 200px;
      top: 200px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 1600px;
      transition: all 0.25s;
    }
    .designA {
      top: 40%;
      .tips {
        font-size: 42px;
        color: #fff;
      }
    }
    .designB {
      top: 50%;
      left: 44%;
      max-width: 1800px;
      height: 900px;
      padding: 20px 0 0 150px;
    }
    .designC {
      height: 900px;
      padding-top: 20px;
      img {
        width: 1600px;
        margin-bottom: 30px;
      }
    }
    .designD {
      top: 50%;
      left: 44%;
      max-width: 1800px;
      height: 900px;
      padding: 20px 0 0 150px;
    }
  }
  .left-arrow {
    position: absolute;
    left: 70px;
    top: 410px;
    z-index: 10;
    cursor: pointer;
    img {
      height: 55px;
    }
  }
  .right-arrow {
    position: absolute;
    right: 30px;
    top: 410px;
    z-index: 10;
    cursor: pointer;
    img {
      height: 55px;
    }
  }
  .fiveCircle {
    position: absolute;
    right: 110px;
    top: 20px;
    .circleButton {
      width: 15px;
      height: 15px;
      border-radius: 10px;
      margin: 40px 0;
      border: 2px solid rgba(229, 229, 229, 1);
      cursor: pointer;
    }
  }
}
</style>
