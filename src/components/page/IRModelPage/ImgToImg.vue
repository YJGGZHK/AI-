<template>
  <div class="bigbox" style="width: 100%; height: 920px; overflow: auto">
    <!-- 上半部分 -->

    <div class="inputChoiceBox">
      <div class="inputBox">
        <div class="first">
          <div class="smtitle">正向提示词（Positive prompt words）</div>
          <div>
            <el-select class="promptWords" size="large" v-model="selectedItem" :placeholder="selectedItem || '正向提示词（按Ctrl+Enter或Alt+Enter开始生成）'">
              <el-option class="custom-option" :label="item.content" :value="item.content" v-for="(item, id) in promptWords" :key="id" @click="handleSelectChange(item.content)"></el-option>
            </el-select>
          </div>
          <div class="smtitle" style="padding-top: 17px">反向提示词（Reverse prompt words）</div>
          <div>
            <el-select class="reverseWords" size="large" v-model="reverseItem" :placeholder="reverseItem || '反向提示词（按Ctrl+Enter或Alt+Enter开始生成）'">
              <el-option :label="item.content" :value="item.content" v-for="(item, id) in reverseWords" :key="id"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="submitBox">
        <div class="submit" @click="videoClick()">生成</div>
        <div class="iconsBox">
          <img src="../../../assets/pictures/IRModel/com.png" style="width: 100%; padding: 10px 0 0 10px" alt="" />
        </div>
      </div>
    </div>
    <!-- 下半部分 -->
    <div class="reBox">
      <div class="regulateBox">
        <!-- 图片显示 -->
        <div class="pictureBox">
          <div class="subnavChoice">
            <!-- @click="subnavClick(id)" -->
            <div class="subnavButton" v-for="(nav, id) in subNav" :key="id" :class="{ choiced: currentSubNav === id }">{{ nav.text }}</div>
          </div>
          <div class="photos">
            <div style="color: #808080; text-align: center" v-if="!this.isPic && !this.isVid">- 照片 -</div>

            <div v-if="this.isPic" style="padding-bottom: 10px; color: #808080">请点击选择图片</div>
            <div v-if="this.isPic" style="display: flex">
              <div class="photo" style="margin-right: 20px" v-if="this.isPic" :style="{ borderColor: this.currentPic == 0 ? 'blue' : '#808080' }" @click="picture(0)">
                <img :src="this.promptWords[this.currentIndex].pic[0]" style="height: 500px" alt="" />
              </div>
              <div class="photo" v-if="this.isPic" :style="{ borderColor: this.currentPic == 1 ? 'blue' : '#808080' }" @click="picture(1)">
                <img :src="this.promptWords[this.currentIndex].pic[1]" style="height: 500px" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="zoomBox">
          <div class="tipsbox">
            <div class="tips">迭代步数(Steps)</div>
          </div>
          <div class="zoomRange">
            <el-radio-group v-model="radio3">
              <el-radio :label="id" border v-for="(item, id) in zoomData" :key="id" style="margin: 3px; padding: 6px 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)" @click="this.radio3 = id">{{ item.choice }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="stepsBox">
          <div class="tipsbox">
            <div class="tips">迭代步数(Steps)</div>
            <input type="number" v-model="stepsvolume" class="inputNumber" />
          </div>
          <div class="stepsRange">
            <input type="range" class="volume" v-model="stepsvolume" min="0" max="100" @input="updateVolume" />
          </div>
        </div>
        <div class="sampleBox">
          <div class="sample">
            <div class="tipsbox">
              <div class="tips">采样方法(Sampler)</div>
            </div>
            <div style="margin: 5px 0 5px 0">
              <el-radio-group v-model="radio2">
                <el-radio :label="id" border v-for="(item, id) in sampleData" :key="id" style="margin: 3px; padding: 6px 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)" @click="this.radio2 = id">{{ item.choice }}</el-radio>
              </el-radio-group>
              <div>
                <el-checkbox class="checkbox" size="large" label="面部修复" />
                <el-checkbox class="checkbox" size="large" label="平铺图（Tiling）" />
              </div>
            </div>
          </div>
          <div class="sampleRange">
            <div class="samButton"></div>
            <div class="fixButton"></div>
          </div>
        </div>
        <div class="sizeBox">
          <div class="numberBox">
            <div class="widthBox">
              <div class="tipsbox">
                <div class="tips">宽度</div>
                <input type="number" v-model="widthvolume" class="inputNumber" />
              </div>
              <input type="range" class="volume" v-model="widthvolume" min="0" max="2000" @input="updateVolume" />
            </div>
            <div class="heightBox">
              <div class="tipsbox">
                <div class="tips">高度</div>
                <input type="number" v-model="heightvolume" class="inputNumber" />
              </div>
              <input type="range" class="volume" v-model="heightvolume" min="0" max="2000" @input="updateVolume" />
            </div>
          </div>
          <div class="countBox">
            <div class="widthBox">
              <div class="tipsbox">
                <div class="tips">总批次数</div>
                <input type="number" v-model="widthcount" class="inputNumber" />
              </div>
              <input type="range" class="volume" v-model="widthcount" min="0" max="50" @input="updateVolume" />
            </div>
            <div class="heightBox">
              <div class="tipsbox">
                <div class="tips">单批数量</div>
                <input type="number" v-model="heightcount" class="inputNumber" />
              </div>
              <input type="range" class="volume" v-model="heightcount" min="0" max="50" @input="updateVolume" />
            </div>
          </div>
        </div>
        <div class="sacleBox">
          <div class="tipsbox">
            <div class="tips">提示词引导系数（CFG Scale）</div>
            <input type="number" v-model="saclevolume" class="inputNumber" />
          </div>
          <input type="range" class="volume" v-model="saclevolume" min="0" max="24" @input="updateVolume" />
        </div>
        <div class="seedBox">
          <div class="tips">随机数种子（Seed）</div>
          <input type="text" style="margin: 5px 0 20px 0" :placeholder="'-1'" />
          <input type="text" style="margin-bottom: 15px" :placeholder="'Tiled Diffusion'" />
          <input type="text" :placeholder="'Tiled VAE'" />
        </div>
        <div class="scriptBox">
          <div class="tips">脚本</div>
          <input type="text" style="margin: 5px 0 20px 0" :placeholder="'none'" />
        </div>
      </div>
      <div class="resultBox">
        <div class="picBox" v-if="!this.isVid">
          <div style="color: #808080; vertical-align: center; text-align: center" v-if="!this.isVid">- 照片 -</div>
        </div>
        <video :src="promptWords[this.currentIndex].video[this.currentPic]" style="width: 100%" autoplay v-if="this.isVid"></video>
        <div class="postpicture" v-if="!this.isVid">
          <div class="postbox" v-for="(item, id) in postPicture" :key="id">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextToImgPage',
  props: {
    promptWords: {
      type: Object,
      default: undefined,
    },
    renew: {
      type: Boolean,
      default: true,
    },
    reverseWords: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
          disabled: true,
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
      // 小导航
      currentSubNav: 0,
      subNav: [
        {
          text: '图生图',
        },
        {
          text: '涂鸦',
        },
        {
          text: '局部重绘',
        },
        {
          text: '涂鸦重绘',
        },
        {
          text: '上传重绘蒙版',
        },
        {
          text: '批量处理',
        },
      ],
      // 反向提示词
      reverseItem: '',
      tipsWords: [],
      // 是否显示图片
      isPic: false,
      currentPic: -1,
      // 是否显示视频
      isVid: false,
      // 正向提示词
      selectedItem: '',
      postPicture: [
        {
          content: '文件',
        },
        {
          content: '发送到图生图',
        },
        {
          content: '发送到重绘',
        },
        {
          content: '发送到后期处理',
        },
        {
          content: '发送到openOutpaint',
        },
      ],
      // 参数
      radio2: 0,
      radio3: 0,
      zoomData: [
        {
          choice: '仅调整大小',
        },
        {
          choice: '裁剪后播放',
        },
        {
          choice: '缩放后填充空白',
        },
        {
          choice: '调整大小（潜空间放大）',
        },
      ],
      stepsvolume: 30,
      // 40/60中的图片标签
      stepsIndex: 0,
      sampleData: [
        {
          choice: 'Euler a',
        },
        {
          choice: 'Euler',
        },
        {
          choice: 'LMS',
        },
        {
          choice: 'Heun',
        },
        {
          choice: 'DPM2',
        },
        {
          choice: 'DPM2 a',
        },
        {
          choice: 'DPM++25 a',
        },
        {
          choice: 'DPM++ 2M',
        },
        {
          choice: 'DPM++ SDE',
        },
        {
          choice: 'DPM++ 2M SDE',
        },
        {
          choice: 'DPM fast',
        },
        {
          choice: 'DPM adaptive',
        },
        {
          choice: 'LMS Karras',
        },
        {
          choice: 'DPM2 Karras',
        },
        {
          choice: 'DPM2 a Karras',
        },
        {
          choice: 'DPM++ 2S a Karras',
        },
        {
          choice: 'DPM++ 2M Karras',
        },
        {
          choice: 'DPM++ SDE Karras',
        },
        {
          choice: 'DPM++ 2M SDE Karras',
        },
        {
          choice: 'DDM',
        },
      ],
      widthvolume: 573,
      heightvolume: 528,
      widthcount: 1,
      heightcount: 1,
      saclevolume: 7,
      seedvolume: 35,
    }
  },
  watch: {
    promptWords: {
      handler(newVal, oldVal) {
        // 在 promptWords 任何属性发生变化时触发的函数
        if (newVal !== oldVal) {
          this.currentIndex = 0 // 将 currentIndex 设置为 0
          this.isPic = false
          this.isVid = false
          this.selectedItem = ''
          this.currentPic = -1
        }
      },
      deep: true, // 使用深度监听
    },
  },
  methods: {
    handleSelectChange(value) {
      this.isVid = false
      // 选择改变时触发，将选中内容赋值给 selectedItem
      this.selectedItem = value
      console.log(this.promptWords)
      for (var i = 0; i < this.promptWords.length; i++) {
        if (this.promptWords[i].content == value) {
          this.currentIndex = i
        }
      }
      console.log(this.promptWords[this.currentIndex].pic)
      this.isPic = true
      const pics = document.querySelector('.photos').querySelectorAll('img')
      if (this.promptWords[this.currentIndex].pic.length == 1) {
        pics[1].style.display = 'none'
      }
      // if (this.promptWords[this.currentIndex].steps.length == 2) {
      //   if (this.stepsvolume < 50) {
      //     this.stepsvolume = 40
      //     this.stepsIndex = 0
      //   } else {
      //     this.stepsvolume = 60
      //     this.stepsIndex = 1
      //   }
      // } else {
      //   this.stepsvolume = 40
      //   this.stepsIndex = 0
      // }
    },
    picture(id) {
      this.currentPic = id
      this.isVid = false
    },
    videoClick() {
      if (this.selectedItem != '') {
        this.isVid = true
      }
    },
    subnavClick(id) {
      this.currentSubNav = id
    },
  },
}
</script>

<style lang="scss" scoped>
.bigbox {
  border: 1px solid rgba($color: #808080, $alpha: 0.3);
  border-radius: 10px;
  padding: 10px 15px;
  .inputChoiceBox {
    display: flex;
    height: 25%;
    padding-top: 0px;

    .inputBox {
      width: 77%;
      .first {
        .smtitle {
          font-size: 18px;
          color: #808080;
          padding: 5px 0 8px 0;
        }
        .promptWords {
          width: 350px;
          border: 1px solid rgba($color: #ccc, $alpha: 0.5);
          box-shadow: inset 0 0px 4px rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
        }
      }
      .reverseWords {
        width: 550px;
        border: 1px solid rgba($color: #ccc, $alpha: 0.5);
        box-shadow: inset 0 0px 4px rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
      }

      // textarea {
      //   width: 100%;
      //   margin: 10px 10px 10px 0;
      //   padding: 10px;
      //   height: 100px;
      //   resize: none; /* 禁用调整大小功能 */
      //   border-radius: 10px;
      //   border: 1px solid rgba($color: #ccc, $alpha: 0.5);
      //   box-shadow: inset 0 0px 4px rgba(0, 0, 0, 0.2);
      //   /* 将文本对齐方式设置为左上角 */
      //   text-align: left;
      //   vertical-align: top;
      // }
    }
    .submitBox {
      width: 23%;
      padding: 10px;
      .submit {
        height: 85px;
        line-height: 85px;
        margin-left: 20px;
        vertical-align: center;
        text-align: center;
        color: orangered;
        background-color: rgb(253, 207, 121);
        border-radius: 10px;
        cursor: pointer;
        &:hover {
          background-color: rgb(253, 224, 170);
        }
      }
    }
  }
  .reBox {
    display: flex;
    .regulateBox {
      width: 55%;
      //   共有属性
      .tips {
        color: #808080;
        font-size: 16px;
      }
      .tipsbox {
        display: flex;
        justify-content: space-between; /* 左对齐所有项目 */
        margin: 5px 0 2px 0;
        .inputNumber {
          height: 30px;
          width: 90px;
          border-radius: 10px;
          text-align: center;
          border: 1px solid rgba($color: #ccc, $alpha: 0.5);
          box-shadow: inset 0 0px 4px rgba(0, 0, 0, 0.2);
        }
      }
      .volume {
        width: 100%;
        height: 20px;
      }
      // pictureBox
      .pictureBox {
        .photos {
          height: 600px;
          width: 100%;
          border-radius: 15px;
          margin-bottom: 15px;
          padding: 15px;
          border: 1px solid rgba($color: #ccc, $alpha: 0.5);
          box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
          .photo {
            border-radius: 15px;
            border: 3px solid rgba($color: #ccc, $alpha: 0.5);
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
            height: 500px;
            overflow: hidden;
            cursor: pointer;
          }
        }
        .subnavChoice {
          justify-content: flex-start;
          display: flex;
          width: 100%;
          .subnavButton {
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
      }

      //   stepsBox
      .stepsBox {
        .stepsRange {
          width: 100%;
        }
      }
      //   sampleBox
      .sampleBox {
        .sample {
          .checkbox {
            font-size: 24px;
            transform: scale(1.15);
            transform-origin: left;
          }
        }
      }
      //   sizeBox
      .sizeBox {
        display: flex;
        .numberBox {
          width: 70%;
        }
        .countBox {
          width: 30%;
          padding: 0 0 0 30px;
        }
      }
      input {
        width: 100%;
        height: 45px;
        border-radius: 10px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid rgba($color: #ccc, $alpha: 0.5);
        box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
      }
      .scriptBox {
        margin-top: 10px;
      }
    }
    .resultBox {
      width: 47.5%;
      margin: 15px;
      padding: 10px;
      .picBox {
        width: 100%;
        height: 500px;
        line-height: 500px;
        margin-top: 13px;
        border-radius: 15px;
        border: 1px solid rgba($color: #ccc, $alpha: 0.5);
        box-shadow: inset 0 0px 4px rgba(0, 0, 0, 0.2);
        padding: 15px;
      }
      .postpicture {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
      }
      .postbox {
        width: 150px;
        height: 70px;
        line-height: 25px;
        display: flex;
        flex-direction: column;
        align-items: center; /* 水平居中 */
        justify-content: center; /* 垂直居中 */
        text-align: center;
        vertical-align: center;
        background: #f0f0f0;
        padding: 5px;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
