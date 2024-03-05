<template>
  <!-- Stable Diffusion 平台页面 -->
  <!-- Stable Diffusion Webui -> 进阶原理 -> 图片后期 -> Experience -->
  <div id="app">
    <div class="background">
      <div class="initChoice">
        <div class="tipstop">
          <div class="tipsbox">
            <div class="tips">Stable Diffusion模型</div>
          </div>
          <div class="tipsbox">
            <div class="tips">外挂VAE模型</div>
          </div>
          <div class="tipsbox">
            <div class="tips">CLIP终止层数</div>
            <input type="number" v-model="CLIPvolume" class="inputNumber" />
          </div>
          <div class="musicButton" @click="playAudio()">music</div>

          <div class="backButton" @click="this.$router.push({ name: 'SDRealismPage' })">back</div>
        </div>
        <div class="tipboxs">
          <div class="content">
            <el-select class="content-box" v-model="currentModel" :placeholder="currentModel || '请选择内容'" @change="handleSelectChange"> <el-option :label="item.content" :value="item.content" v-for="(item, id) in SdModel" :key="id"></el-option> </el-select>
          </div>
          <div class="content">
            <el-select class="content-box" v-model="currentModel2" :placeholder="currentModel2 || '请选择内容'">
              <el-option :label="item.content" :value="item.content" v-for="(item, id) in SdModel" :key="id"></el-option>
            </el-select>
          </div>
          <input type="range" class="volume" style="width: 350px" v-model="CLIPvolume" min="0" max="50" @input="updateVolume" />
        </div>
      </div>
      <div class="navChoice">
        <div class="navButton" v-for="(nav, id) in this.TopNav" :key="id" :class="{ choiced: currentNav === id }" @click="navClick(id)">{{ nav.nav }}</div>
      </div>
      <TextToImgPage :promptWords="this.promptWords" :reverseWords="reverseWords" :renew="renew" v-if="this.currentoption === 'txt'"></TextToImgPage>
      <ImgToImg :promptWords="this.promptWords" :reverseWords="reverseWords" v-if="this.currentoption === 'img'"></ImgToImg>
      <PostProcessPage v-if="this.currentoption == 'post'"></PostProcessPage>
    </div>
  </div>
</template>

<script>
import TextToImgPage from './IRModelPage/TextToImgPage.vue'
import ImgToImg from './IRModelPage/ImgToImg.vue'
import PostProcessPage from './IRModelPage/PostProcessPage.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'IRModelPage',
  components: {
    TextToImgPage,
    ImgToImg,
    PostProcessPage,
  },
  data() {
    return {
      placeholder: '请选择',
      CLIPvolume: 10,
      // 反向提示词
      reverseWords: [
        {
          content: '(worst quality:2,low quality:2),(zombie, sketch, interloacked fingers,comic),',
        },
      ],

      SdModel: [
        {
          content: 'punkmix模型',
          options: [
            {
              content: 'txt',
              tips: [
                {
                  content: 'flower, 1girl, tree',
                  steps: [40, 60],
                  pic: [require('../../assets/pictures/IRModel/txt/flower，1girl，tree/punkmix模型/step40/picture.png'), require('../../assets/pictures/IRModel/txt/flower，1girl，tree/punkmix模型/step60/picture.png')],
                  video: [require('../../assets/pictures/IRModel/txt/flower，1girl，tree/punkmix模型/step40/video.mp4'), require('../../assets/pictures/IRModel/txt/flower，1girl，tree/punkmix模型/step60/video.mp4')],
                },
                {
                  content: 'school desk, 1girl, book',
                  steps: [40, 60],
                  pic: [require('../../assets/pictures/IRModel/txt/school desk，1girl，book，/punkmix 模型/steps40/picture.png'), require('../../assets/pictures/IRModel/txt/school desk，1girl，book，/punkmix 模型/steps60/picture.png')],
                  video: [require('../../assets/pictures/IRModel/txt/school desk，1girl，book，/punkmix 模型/steps40/video.mp4'), require('../../assets/pictures/IRModel/txt/school desk，1girl，book，/punkmix 模型/steps60/video.mp4')],
                },
              ],
            },
            {
              content: 'img',
              tips: [
                {
                  content: 'flower, 1girl, tree',
                  steps: [40, 60],
                  pic: [require('../../assets/pictures/IRModel/img/flower，1girl，tree/punkmix模型/step40/picture.png'), require('../../assets/pictures/IRModel/img/flower，1girl，tree/punkmix模型/step60/picture.png')],
                  video: [require('../../assets/pictures/IRModel/img/flower，1girl，tree/punkmix模型/step40/video.mp4'), require('../../assets/pictures/IRModel/img/flower，1girl，tree/punkmix模型/step60/video.mp4')],
                },
              ],
            },
          ],
        },
        {
          content: 'meinav9模型',
          options: [
            {
              content: 'txt',
              tips: [
                {
                  content: 'school desk, open book',
                  steps: [40],
                  pic: [require('../../assets/pictures/IRModel/txt/school desk, open book,/meinav9模型/迭代步数40/picture.png')],
                  video: [require('../../assets/pictures/IRModel/txt/school desk, open book,/meinav9模型/迭代步数40/video.mp4')],
                },
                {
                  content: 'school desk, 1girl, book',
                  steps: [60],
                  pic: [require('../../assets/pictures/IRModel/txt/school desk，1girl，book，/mienav9模型/迭代步数60/picture.png')],
                  video: [require('../../assets/pictures/IRModel/txt/school desk，1girl，book，/mienav9模型/迭代步数60/video.mp4')],
                },
                {
                  content: 'pink flower, tree',
                  steps: [40, 60],
                  pic: [require('../../assets/pictures/IRModel/txt/pink flower, tree,/meinav9 模型/steps40/picture.png'), require('../../assets/pictures/IRModel/txt/flower，1girl，tree/punkmix模型/step60/picture.png')],
                  video: [require('../../assets/pictures/IRModel/txt/pink flower, tree,/meinav9 模型/steps40/video.mp4'), require('../../assets/pictures/IRModel/txt/flower，1girl，tree/punkmix模型/step60/video.mp4')],
                },
              ],
            },
            {
              content: 'img',
              tips: [
                {
                  content: 'pink flower, tree',
                  steps: [40, 60],
                  pic: [require('../../assets/pictures/IRModel/img/pink flower, tree,/meinav9 模型/steps40/picture.png'), require('../../assets/pictures/IRModel/img/pink flower, tree,/meinav9 模型/steps60/picture.png')],
                  video: [require('../../assets/pictures/IRModel/img/pink flower, tree,/meinav9 模型/steps40/video.mp4'), require('../../assets/pictures/IRModel/img/pink flower, tree,/meinav9 模型/steps60/video.mp4')],
                },
              ],
            },
          ],
        },
      ],
      currentModel: '',
      currentModel2: '',

      currentoption: 'txt',
      currentNav: 0,
      TopNav: [
        {
          nav: '文生图',
          routeName: 'TextToImgPage',
          content: 'txt',
        },
        {
          nav: '图生图',
          routeName: 'ImgToImgPage',
          content: 'img',
        },
        {
          nav: '后期处理',
          routeName: 'PostProcessPage',
          content: 'post',
        },
        {
          nav: 'PNG图片信息',
          routeName: '',
          content: '',
        },
        {
          nav: '模型融合',
          routeName: '',
          content: '',
        },
        {
          nav: '训练',
          routeName: '',
          content: '',
        },
        {
          nav: 'openOutpaint',
          routeName: '',
          content: '',
        },
        {
          nav: 'OpenPose编辑器',
          routeName: '',
          content: '',
        },
        {
          nav: 'Additional Networks',
          routeName: '',
          content: '',
        },
        {
          nav: '深度图库',
          routeName: '',
          content: '',
        },
        {
          nav: '图库浏览器',
          routeName: '',
          content: '',
        },
        {
          nav: '模型转换',
          routeName: '',
          content: '',
        },
        {
          nav: '图库浏览器',
          routeName: '',
          content: '',
        },
        {
          nav: 'WD1.4标签器',
          routeName: '',
          content: '',
        },
        {
          nav: '通配符管理',
          routeName: '',
          content: '',
        },
        {
          nav: '设置',
          routeName: '',
          content: '',
        },
        {
          nav: '扩展',
          routeName: '',
          content: '',
        },
      ],
      promptWords: [],
      renew: false,
    }
  },
  computed: {
    ...mapGetters(['audioIsPlaying']),
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
    handleSelectChange(value) {
      this.currentModel = value
      this.renew = true

      console.log('value' + value)
      this.propmt()
    },
    propmt() {
      for (var i = 0; i < this.SdModel.length; i++) {
        if (this.SdModel[i].content == this.currentModel) {
          for (var j = 0; j < this.SdModel[i].options.length; j++) {
            if (this.SdModel[i].options[j].content == this.currentoption) {
              console.log(this.currentoption)
              this.promptWords = this.SdModel[i].options[j].tips
              console.log(this.SdModel[i].options[j].tips)
            }
          }
        }
      }
    },
    navClick(id) {
      this.currentNav = id
      this.currentoption = this.TopNav[this.currentNav].content

      // this.$router.push({ name: this.TopNav[this.currentNav].routeName }) // 使用 router.push
      this.propmt()
      // console.log(this.TopNav[this.currentNav].content)
      // console.log(this.currentoption)
    },
  },
  created() {
    var option = this.$route.query.option
    option = parseInt(option)
    if (option) {
      this.currentNav = option
      this.navClick(option)
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
.background {
  color: #000;
  font-size: 18px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px 20px;

  .initChoice {
    height: 8%;
    .tipstop {
      display: flex;
      .tips {
        color: #808080;
        font-size: 16px;
      }
      .tipsbox {
        display: flex;
        justify-content: space-between;
        width: 350px;
        .inputNumber {
          height: 30px;
          width: 90px;
          border-radius: 10px;
          text-align: center;
          border: 1px solid rgba($color: #ccc, $alpha: 0.5);
          box-shadow: inset 0 0px 4px rgba(0, 0, 0, 0.2);
        }
      }
    }
    .tipboxs {
      display: flex;
      margin-top: 10px;
      .content {
        width: 350px;
      }
      .content-box {
        font-size: 16px; /* 调整字体大小 */
        width: 330px; /* 调整宽度 */
        border-radius: 10px;
      }
    }
  }
  .navChoice {
    justify-content: space-between;
    display: flex;
    width: 100%;
    .navButton {
      padding: 4px 8px;
      height: fit-content;
      border-radius: 10px;
      color: #808080;
      cursor: pointer;
      transition: all 0.25s;
    }
    .choiced {
      padding: 4px 20px;
      border: 3px solid rgba($color: rgba(105, 255, 246, 1), $alpha: 1);
      color: #000;
    }
  }
  .backButton {
    position: absolute;
    right: 30px;
    padding: 8px 20px;
    border: 2px solid rgba(135, 206, 250, 0.75);
    cursor: pointer;
    box-shadow: inset 0 0px 4px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  .musicButton {
    position: absolute;
    right: 130px;
    padding: 8px 20px;
    border: 2px solid rgba(135, 206, 250, 0.75);
    cursor: pointer;
    box-shadow: inset 0 0px 4px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
}
</style>
