<template>
  <div id="app">
    <!-- 侧边栏导航 -->
    <SideNavigationBar style="z-index: 999"></SideNavigationBar>
    <!-- 顶部导航栏 -->
    <TopNavigationBar :titleSize="42" :title="title" :sub="this.sub" :backShow="true" :moTitle="'交互拟真'"></TopNavigationBar>
    <div class="body" :style="{ left: Index + 'px' }">
      <!-- 1. 文生图 -->
      <div class="sec">
        <div class="txtTOimg" style="position: relative">
          <div class="top">
            <ArtWord :text="this.txtTOimgIndex ? txtTOimgTitle[0].text : txtTOimgTitle[1].text"></ArtWord>
            <div class="exchange" @click="this.txtTOimgIndex = !this.txtTOimgIndex" :style="{ left: this.txtTOimgIndex ? '270px' : '370px' }">
              <div class="changeButton">{{ this.txtTOimgIndex ? txtTOimgTitle[1].text : txtTOimgTitle[0].text }}</div>
              <img :src="exchangeButton" alt="" />
            </div>
          </div>
          <div class="mod1 txtoimg" :style="{ display: !this.txtTOimgIndex ? 'none' : 'flex' }" style="height: 840px">
            <div class="smbox" v-for="(item, id) in txtTOimg" :key="id">
              <div class="smtitle">{{ item.text }}</div>
              <img :src="item.img" alt="" :style="{ height: item.imgH + 'px' }" />
            </div>
          </div>
          <div class="mod2" :style="{ opacity: this.txtTOimgIndex ? '0' : '1' }" style="margin-top: 100px">
            <div class="txt">
              <video controls width="1400" :style="{ display: this.txtTOimgIndex ? 'none' : 'block' }" style="cursor: pointer">
                <source :src="videoSourceTxt" type="video/mp4" :style="{ display: this.txtTOimgIndex ? 'none' : 'block' }" />
              </video>
            </div>
          </div>
        </div>
      </div>
      <!-- 2. 图生图 -->
      <div class="sec">
        <div class="imgTOimg" style="position: relative">
          <div class="top">
            <ArtWord :text="this.imgTOimgIndex ? imgTOimgTitle[0].text : imgTOimgTitle[1].text"></ArtWord>
            <div class="exchange" @click="this.imgTOimgIndex = !this.imgTOimgIndex" :style="{ left: this.imgTOimgIndex ? '270px' : '350px' }">
              <div class="changeButton">{{ this.imgTOimgIndex ? imgTOimgTitle[1].text : imgTOimgTitle[0].text }}</div>
              <img :src="exchangeButton" alt="" />
            </div>
          </div>
          <div class="mod1" :style="{ display: !this.imgTOimgIndex ? 'none' : 'flex' }">
            <div class="smbox" v-for="(item, id) in imgTOimg" :key="id" :style="{ marginTop: id === 0 ? '50px' : '0' }">
              <div class="smtitle">{{ item.text }}</div>
              <img :src="item.img" alt="" :style="{ height: item.imgH + 'px' }" />
            </div>
          </div>
          <div class="mod2" :style="{ opacity: this.imgTOimgIndex ? '0' : '1' }" style="margin-top: 100px">
            <div class="txt">
              <video controls width="1400" :style="{ display: this.imgTOimgIndex ? 'none' : 'block' }">
                <source :src="videoSourceImg" type="video/mp4" :style="{ display: this.imgTOimgIndex ? 'none' : 'block' }" />
              </video>
            </div>
          </div>
        </div>
      </div>
      <!-- 3. 图片后期 -->
      <div class="sec">
        <div class="postimg" style="position: relative">
          <div class="top">
            <ArtWord :text="this.postimgIndex ? postimgTitle[0].text : postimgTitle[1].text"></ArtWord>
            <div class="exchange" @click="this.postimgIndex = !this.postimgIndex" :style="{ left: this.postimgIndex ? '320px' : '400px' }">
              <div class="changeButton">{{ this.postimgIndex ? postimgTitle[1].text : postimgTitle[0].text }}</div>
              <img :src="exchangeButton" alt="" />
            </div>
          </div>
          <div class="mod1" :style="{ display: !this.postimgIndex ? 'none' : 'flex' }">
            <div class="smbox" v-for="(item, id) in postimg" :key="id">
              <div class="smtitle">{{ item.text }}</div>
              <img :src="item.img" alt="" :style="{ height: item.imgH + 'px' }" />
            </div>
          </div>
          <div class="mod2" :style="{ opacity: this.postimgIndex ? '0' : '1' }" style="margin-top: 100px">
            <div class="txt">
              <video controls width="1400" :style="{ display: this.postimgIndex ? 'none' : 'block' }">
                <source :src="videoSourcePost" type="video/mp4" :style="{ display: this.postimgIndex ? 'none' : 'block' }" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 问号图标 - 思维导图 -->
    <div class="questionMark">
      <img :src="questionMark" alt="" style="width: 42px; position: absolute; top: 115px; right: 25px; cursor: pointer" @click="this.showModal = true" />
    </div>
    <!-- Experience - Stable Diffusion平台 -->
    <div class="experience" @click="this.$router.push({ name: 'IRModelPage', query: { option: this.clickIndex, subnav: this.route[this.clickIndex].push } })">Experience</div>
    <!-- 思维导图 -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">×</span>
        <div class="image-container">
          <img :src="this.FlowChart[this.clickIndex].pic" alt="Image" />
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

export default {
  name: 'SDRealismPage',
  components: {
    TopNavigationBar,
    SideNavigationBar,
    BottomNavigationBar,
    ArtWord,
  },
  data() {
    return {
      title: 'stable diffusion',
      subtitle: '',
      sub: '',

      exchangeButton: 'https://img.js.design/assets/element/js_kKWbAec98io/image/d494f3faa2f2fed36c09d12d2617182f36a663c9.png',
      questionMark: 'https://img.js.design/assets/element/js_p7SMi_7MIIk/image/bab77643cea0fa2f258dd061710636a7270c1130.png',

      // 1. 文生图
      txtTOimgTitle: [
        {
          text: '文生图步骤',
        },
        {
          text: '文生图操作示范',
        },
      ],
      txtTOimgIndex: true,
      videoSourceTxt: require('../../assets/videos/文生图.mp4'),
      txtTOimg: [
        {
          text: '1.选择模型',
          img: 'https://img.js.design/assets/img/64d5f166ba67c4c1c11f82c2.png#5539deb910cff6f9886d1796ce1f6376',
          imgH: 100,
        },
        {
          text: '2.输入正向提示词',
          img: 'https://img.js.design/assets/img/64d5f234219efcf6bd163258.png#ecf9b9f1a23355bca729664085d7503b',
          imgH: 100,
        },
        {
          text: '3.输入反向提示词',
          img: 'https://img.js.design/assets/img/64d5f35f22a62ae99edc530a.png#37f8ce7bac7ebe6f8231b97bad342c3f',
          imgH: 100,
        },
        {
          text: '4.选择迭代步数',
          img: 'https://img.js.design/assets/img/64d5f392672deab744788b75.png#277191df7468225e0e66e3044f76c9ed',
          imgH: 80,
        },
        {
          text: '5.选择采样方法',
          img: 'https://img.js.design/assets/img/64d5fe20219efcf6bd1a215b.png#c74f9e3909af444e583d59e40a4f4b9e',
          imgH: 150,
        },
        {
          text: '6.设置图片大小',
          img: 'https://img.js.design/assets/img/64d5fe52672deab7447ce059.png#dee50d76b9a000069b1e758e1cee3b13',
          imgH: 100,
        },
        {
          text: '7.生成图片',
          img: 'https://img.js.design/assets/img/64d5fe84219efcf6bd1a446f.png#2e325152a5860de215c767b6921718d7',
          imgH: 85,
        },
      ],

      // 2. 图生图
      imgTOimgTitle: [
        {
          text: '图生图步骤',
        },
        {
          text: '图生图操作示范',
        },
      ],
      videoSourceImg: require('../../assets/videos/图生图.mp4'),
      imgTOimgIndex: true,
      imgTOimg: [
        {
          text: '1.选择模型',
          img: 'https://img.js.design/assets/img/64d5f166ba67c4c1c11f82c2.png#5539deb910cff6f9886d1796ce1f6376',
          imgH: 100,
        },
        {
          text: '2.提供参考的图片',
          img: 'https://img.js.design/assets/img/64d5f27f219efcf6bd164ed5.png#98f0deefa2741af51e77e759e5490801',
          imgH: 370,
        },
        {
          text: '3.输入正向提示词',
          img: 'https://img.js.design/assets/img/64d5f234219efcf6bd163258.png#ecf9b9f1a23355bca729664085d7503b',
          imgH: 85,
        },
        {
          text: '4.输入反向提示词',
          img: 'https://img.js.design/assets/img/64d5f35f22a62ae99edc530a.png#37f8ce7bac7ebe6f8231b97bad342c3f',
          imgH: 85,
        },
        {
          text: '5.选择迭代步数',
          img: 'https://img.js.design/assets/img/64d5f392672deab744788b75.png#277191df7468225e0e66e3044f76c9ed',
          imgH: 75,
        },
        {
          text: '6.选择采样方法',
          img: 'https://img.js.design/assets/img/64d5fe20219efcf6bd1a215b.png#c74f9e3909af444e583d59e40a4f4b9e',
          imgH: 130,
        },
        {
          text: '7.设置图片大小',
          img: 'https://img.js.design/assets/img/64d5fe52672deab7447ce059.png#dee50d76b9a000069b1e758e1cee3b13',
          imgH: 95,
        },
        {
          text: '8.生成图片',
          img: 'https://img.js.design/assets/img/64d5fe84219efcf6bd1a446f.png#2e325152a5860de215c767b6921718d7',
          imgH: 85,
        },
      ],

      // 3. 图片后期
      postimgTitle: [
        {
          text: '图片后期步骤',
        },
        {
          text: '图片后期操作示范',
        },
      ],
      videoSourcePost: require('../../assets/videos/后期处理.mp4'),
      postimgIndex: true,
      postimg: [
        {
          text: '1.选择模型',
          img: 'https://img.js.design/assets/img/64d5f166ba67c4c1c11f82c2.png#5539deb910cff6f9886d1796ce1f6376',
          imgH: 100,
        },
        {
          text: '2.选择要处理的图片',
          img: 'https://img.js.design/assets/img/64d71620ddebcea0d451e0d4.png#848555953dbb4bdd9601348ed425f6d6',
          imgH: 175,
        },
        {
          text: '3.选择缩放倍数',
          img: 'https://img.js.design/assets/img/64d716acc8aedc5dee461642.png#934268c29eff7d420f44ccf7a53a0a91',
          imgH: 90,
        },
        {
          text: '4.选择放大算法',
          img: 'https://img.js.design/assets/img/64d716ec9b0705d42ae8dfa9.png#8f8ae54c69cd0dcd451b7cf2bd91d35b',
          imgH: 65,
        },
        {
          text: '5.生成图片',
          img: 'https://img.js.design/assets/img/64d5fe84219efcf6bd1a446f.png#2e325152a5860de215c767b6921718d7',
          imgH: 85,
        },
      ],

      // 流程图
      FlowChart: [
        {
          pic: require('../../assets/pictures/FlowChart/文生图.jpeg'),
        },
        {
          pic: require('../../assets/pictures/FlowChart/图生图.jpeg'),
        },
        {
          pic: require('../../assets/pictures/FlowChart/后期处理.jpeg'),
        },
      ],
      showModal: false, // 控制是否显示模态框

      // 底部导航栏
      navItem: [
        { label: '文生图', selected: true },
        { label: '图生图', selected: false },
        { label: '图片后期', selected: false },
      ],
      clickIndex: 0,

      // 跳转experience
      route: [
        {
          push: 'txt',
        },
        {
          push: 'img',
        },
        {
          push: 'txt',
        },
      ],
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
    this.sub = this.$route.query.sub
    const subnav = this.$route.query.subnav
    this.switchButton = this.$route.query.switchButton

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
    padding: 0 0 0 80px;
  }
  .imgTOimg {
    .mod1 {
      left: 135px;
      top: 60px;
      height: 840px;
      .smbox {
        margin: 0 300px 20px 0;
      }
    }
  }

  .top {
    display: flex;
    transition: all 0.35s;
    .exchange {
      position: absolute;
      left: 270px;
      top: 30px;
      display: flex;
      font-size: 30px;
      line-height: 58px;
      color: rgba(229, 229, 229, 1);
      cursor: pointer;
      transition: all 0.25s;
      z-index: 5;
      img {
        width: 30px;
        height: 30px;
        margin: 15px 0 0 10px;
      }
    }
  }
  .mod1 {
    position: absolute;
    left: 125px;
    top: 130px;
    opacity: 1;
    height: 700px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    transition: all 0.25s;
    .smbox {
      min-height: 100px;
      margin: 0 100px 40px 0;
      .smtitle {
        font-size: 30px;
        line-height: 45px;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .mod2 {
    position: absolute;
    left: 220px;
    top: 30px;
    opacity: 0;
    transition: all 0.25s;
  }
}
.experience {
  top: 115px;
  right: 105px;
  width: 100px;
  position: absolute;
  cursor: pointer;
  color: #e5e5e5;
  font-size: 24px !important;
  &:hover {
    color: skyblue;
  }
}
/* 模态框样式 */
.modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.close {
  position: absolute;
  top: -12px;
  right: -30px;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
}

/* 图片容器样式 */
.image-container {
  width: 100%;
  height: 140vh; /* 设置最大高度，超出部分将滚动 */
  max-height: 1000px;
  overflow-y: auto; /* 添加垂直滚动条 */
  text-align: center; /* 如果需要居中图片 */
}
</style>
