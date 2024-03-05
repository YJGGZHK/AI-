<template>
  <div class="bigbox">
    <div class="reBox">
      <div class="regulateBox">
        <div class="picture">
          <input ref="fileInput" type="file" style="display: none" @change="handleFileSelected" />
          <div class="pictrueBox" @click="openFilePicker">
            <div style="color: #808080" v-if="!selectedImage">
              <span>拖放图片至此处</span>
              <span><font style="color: #808080">- 或 -</font> </span>点击上传
            </div>
            <div>
              <img v-if="selectedImage" style="width: 300px" :src="selectedImage" alt="Selected Image" />
            </div>
            <!-- <img :src="promptWords[this.currentIndex].pic[this.stepsIndex]" style="height: 100%" v-if="this.isPic" alt="" /> -->
          </div>
          <div class="submit" @click="videoClick()">生成</div>
        </div>
        <div class="zoomBox">
          <div class="tipsbox">
            <div class="tips">缩放比例</div>
            <input type="number" v-model="zoomvolume" class="inputNumber" />
          </div>
          <div class="zoomRange">
            <input type="range" class="volume" v-model="zoomvolume" min="0" step="0.04" max="5" @input="updateVolume" />
          </div>
        </div>
        <div class="magnifyBox">
          <div class="magnify">
            <div class="tipsbox">
              <div class="tips">放大算法1</div>
            </div>
            <div style="margin: 4px 0 4px 0">
              <div class="content">
                <el-select class="amplify" style="width: 800px" size="large" v-model="amplifyalgo" :placeholder="amplifyalgo || '请选择内容'" @change="handleSelectChange"> <el-option :label="item.content" :value="item.content" v-for="(item, id) in amplifyalgoData" :key="id"></el-option> </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="sizeBox">
          <div class="magnifyBox">
            <div class="tipsbox">
              <div class="tips">放大算法2</div>
            </div>
            <div class="content">
              <el-select class="content-box" style="width: 300px" size="large" v-model="amplifyalgo2" :placeholder="amplifyalgo2 || '请选择内容'" @change="handleSelectChange">
                <el-option :label="item.content" :value="item.content" v-for="(item, id) in amplifyalgoData" :key="id"></el-option>
              </el-select>
            </div>
          </div>
          <div class="strengthBox">
            <div class="tipsbox">
              <div class="tips">放大算法2强度</div>
              <input type="number" v-model="zoomvolume2" class="inputNumber" />
            </div>
            <input type="range" class="volume" v-model="zoomvolume2" min="0" step="0.1" max="10" @input="updateVolume" />
          </div>
        </div>
        <div class="gfpganBox">
          <div class="tipsbox">
            <div class="tips">GFPGAN可见程度</div>
            <input type="number" v-model="gfpganvisiblevolume" class="inputNumber" />
          </div>
          <input type="range" class="volume" v-model="gfpganvisiblevolume" min="0" max="100" @input="updateVolume" />
        </div>
        <div class="codeBox">
          <div class="codevisibleBox">
            <div class="tipsbox">
              <div class="tips">CodeFormer程度</div>
              <input type="number" v-model="codevisiblevolume" class="inputNumber" />
            </div>
            <input type="range" class="volume" v-model="codevisiblevolume" min="0" max="100" @input="updateVolume" />
          </div>
          <div class="codeweightBox">
            <div class="tipsbox">
              <div class="tips">CodeFormer权重（0=效果最强，1=效果最弱）</div>
              <input type="number" v-model="weightvolume" class="inputNumber" />
            </div>
            <input type="range" class="volume" v-model="weightvolume" min="0" step="0.01" max="1" @input="updateVolume" />
          </div>
        </div>
        <div class="seedBox">
          <div class="checkboxs">
            <el-checkbox class="checkbox" size="large" label="启用像素化" />
            <el-checkbox class="checkbox" size="large" label="保持分辨率不变" />
          </div>
          <div class="pixel">
            <div class="tipsbox">
              <div class="tips">像素块大小</div>
              <input type="number" v-model="pixelvolume" class="inputNumber" />
            </div>
            <input type="range" class="volume" v-model="pixelvolume" min="0" max="20" @input="updateVolume" />
          </div>
        </div>
      </div>
      <div class="resultBox">
        <div class="picBox">
          <div style="color: #808080">
            <span v-if="!this.isPic">- 图片 -</span>
            <img v-if="this.isPic" class="resultImg" style="cursor: pointer" :src="resultImg" alt="Selected Image" @click="fangda()" />
          </div>
        </div>
        <div class="postpicture">
          <div class="postbox" v-for="(item, id) in postPicture" :key="id">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
    <!-- 模态框 -->

    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">x</span>
        <img class="resultImg2" style="cursor: pointer" :src="resultImg" alt="Selected Image" @click="showModal = false" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostProcessPage',

  data() {
    return {
      showModal: false, // 控制是否显示模态框
      isPic: false,
      tipsWords: [],
      amplifyalgo: 'None',
      amplifyalgo2: 'None',
      // 获取的图片大小
      selectedImage: null,
      // 最终处理结果
      resultImg: null,
      amplifyalgoData: [
        {
          content: 'None',
        },
        {
          content: 'Lanczos',
        },
        {
          content: '近邻插值',
        },
        {
          content: 'BSRGAN',
        },
        {
          content: 'ESRGAN_4x',
        },
        {
          content: 'LDSR',
        },
        {
          content: 'R-ESRGAN 4x+',
        },
        {
          content: 'R-ESRGAN 4x+ Anime6B',
        },
        {
          content: 'ScuNET',
        },
        {
          content: 'ScuNET PSNR',
        },
        {
          content: 'SwinIR_4x',
        },
      ],
      zoomvolume: 3.1,
      zoomvolume2: 0,
      gfpganvisiblevolume: 0,
      codevisiblevolume: 0,
      weightvolume: 0.5,
      pixelvolume: 5,
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
      this.amplifyalgo = value
    },
    videoClick() {
      this.isPic = true
      this.resultImg = this.selectedImage
      // 放大
      setTimeout(() => {
        const resultImg = document.querySelector('.resultImg')
        resultImg.style.width = 300 * this.zoomvolume + 'px'
        // console.log(resultImg)
      }, 200)
    },
    openFilePicker() {
      // 触发文件选择框
      this.$refs.fileInput.click()
    },
    handleFileSelected(event) {
      // 处理文件选择事件
      const selectedFile = event.target.files[0]
      // 在这里可以进行上传操作或其他逻辑
      console.log('选择的文件:', selectedFile)

      // 将选定的图片显示出来
      if (selectedFile) {
        this.selectedImage = URL.createObjectURL(selectedFile)
      }
    },
    fangda() {
      this.showModal = true
    },
  },
}
</script>

<style lang="scss" scoped>
.bigbox {
  position: relative;
  height: 920px !important;
  width: 100% !important;
  border: 1px solid rgba($color: #808080, $alpha: 0.3);
  border-radius: 10px;
  padding: 0 15px;
  .reBox {
    display: flex;
    .regulateBox {
      width: 56%;
      .picture {
        .pictrueBox {
          width: 100%;
          height: 350px;
          line-height: 350px;
          text-align: center;
          border-radius: 10px;
          border: 1px solid rgba($color: #ccc, $alpha: 0.5);
          box-shadow: inset 0 0px 4px rgba(0, 0, 0, 0.2);
          padding: 15px;
          cursor: pointer;
          margin: 15px 0;
          overflow: hidden;
        }
        .submit {
          width: 100%;
          height: 65px;
          line-height: 65px;
          vertical-align: center;
          text-align: center;
          color: orangered;
          background-color: rgb(253, 207, 121);
          border-radius: 10px;
          margin-bottom: 15px;
          cursor: pointer;
          &:hover {
            background-color: rgb(253, 224, 170);
          }
        }
      }
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
      .manify {
        width: 100%;
        .content {
          width: 600px;
        }
        .amplify {
          width: 600px;
        }
      }
      .sizeBox {
        display: flex;
        .magnifyBox {
          width: 50%;
          padding-right: 10px;
        }
        .strengthBox {
          width: 50%;
        }
      }
      .codeBox {
        display: flex;
        .codevisibleBox {
          width: 50%;
          padding-right: 10px;
        }
        .codeweightBox {
          width: 50%;
        }
      }
      .seedBox {
        display: flex;
        & > div {
          width: 50%;
        }
        .checkboxs {
          .checkbox {
            transform: scale(1.15);
            transform-origin: left;
          }
        }
      }
    }
    .resultBox {
      width: 47.5%;
      margin: 15px 10px 0 15px;
      padding-left: 15px;
      .picBox {
        width: 100%;
        height: 500px;
        line-height: 465px;
        text-align: center;
        border-radius: 10px;
        border: 1px solid rgba($color: #ccc, $alpha: 0.5);
        box-shadow: inset 0 0px 4px rgba(0, 0, 0, 0.2);
        padding: 15px;
        margin: 15px 0;
        margin-top: 0;
        overflow: auto;
      }
      .postpicture {
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
  // 模态框
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
    max-height: 80vh; /* 设置最大高度，超出部分将滚动 */
    overflow-y: auto; /* 添加垂直滚动条 */
    text-align: center; /* 如果需要居中图片 */
  }
}
</style>
