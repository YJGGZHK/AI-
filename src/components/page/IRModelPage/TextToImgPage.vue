<template>
  <div class="bigbox">
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
                <el-checkbox class="checkbox" size="large" label="高分辨率修复（Hires. fix）" />
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
      </div>
      <div class="resultBox">
        <div class="picBox" v-if="!this.isVid">
          <div style="color: #808080; vertical-align: center; text-align: center" v-if="!this.isPic && !this.isVid">- 照片 -</div>
          <!-- <img :src="promptWords[this.currentIndex].pic[this.stepsIndex]" style="height: 100%" v-if="this.isPic" alt="" /> -->
        </div>
        <video :src="promptWords[this.currentIndex].video[this.stepsIndex]" style="width: 100%" autoplay v-if="this.isVid"></video>
        <div class="postpicture" v-if="!this.isPic && !this.isVid">
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
      // 反向提示词
      reverseItem: '',

      tipsWords: [],
      // 是否显示图片
      isPic: false,
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
      stepsvolume: 30,
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
          choice: 'DPM++ 2M a Karras',
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
        {
          choice: 'PLMS',
        },
        {
          choice: 'DUniPC',
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
      if (this.promptWords[this.currentIndex].steps.length == 2) {
        if (this.stepsvolume < 50) {
          this.stepsvolume = 40
          this.stepsIndex = 0
        } else {
          this.stepsvolume = 60
          this.stepsIndex = 1
        }
      } else {
        this.stepsvolume = 40
        this.stepsIndex = 0
      }
    },
    videoClick() {
      if (this.selectedItem != '') {
        this.isVid = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.bigbox {
  height: 920px !important;
  width: 100% !important;
  border: 1px solid rgba($color: #808080, $alpha: 0.3);
  border-radius: 10px;
  padding: 10px 15px;
  .inputChoiceBox {
    display: flex;
    height: 25.5%;
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
        justify-content: space-between;
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
      .seedBox {
        input {
          width: 100%;
          height: 45px;
          border-radius: 10px;
          padding: 10px;
          font-size: 16px;
          border: 1px solid rgba($color: #ccc, $alpha: 0.5);
          box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
        }
      }
    }
    .resultBox {
      width: 47.5%;
      margin: 15px;
      margin-top: 30px;
      padding: 10px;
      .picBox {
        width: 100%;
        height: 500px;
        line-height: 500px;
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
