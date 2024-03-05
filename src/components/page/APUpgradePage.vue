<template>
  <!-- AI绘画 页面 -->
  <!-- AI绘画 -> 进阶原理 -->
  <div id="app">
    <!-- 侧边栏导航 -->
    <SideNavigationBar style="z-index: 999"></SideNavigationBar>
    <!-- 顶部导航栏 -->
    <TopNavigationBar :sub="'APUpgrade'" :title="title" :backShow="backshow"></TopNavigationBar>
    <div class="body">
      <div class="bigbox">
        <div class="cueword part">
          <BoxWord :boxword="this.CueWord" :lineHeight="1.75" style="margin-top: 100px"></BoxWord>
        </div>
        <div class="noisemap part">
          <ArtWord class="art1" :text="this.NoiseMap.title1" style="margin-bottom: 25px; transition: all 0.25s"></ArtWord>
          <BoxWord class="boxword1" :lineHeight="1.75" :boxword="this.NoiseMap.text1" style="transition: all 0.25s"></BoxWord>
          <ArtWord class="art2" :text="this.NoiseMap.title2" style="margin-bottom: 25px; margin-top: 40px; transition: all 0.25s"></ArtWord>
          <BoxWord class="boxword2" :lineHeight="1.75" :boxword="this.NoiseMap.text2" style="transition: all 0.25s"></BoxWord>
        </div>
        <div class="forwarddiffu part">
          <img :src="this.ForwardDiffu.img" class="img" style="transition: all 0.25s" alt="" />
          <BoxWord class="boxword" :lineHeight="1.75" :boxword="this.ForwardDiffu.text1" style="margin-top: 30px; transition: all 0.25s"></BoxWord>
        </div>
        <div class="backwarddiffu part">
          <BoxWord :boxword="this.BackwardDiffu.text1" :lineHeight="1.75" style="margin-top: 100px"></BoxWord>
        </div>
        <div class="samplingplot part" style="left: 60px; position: relative; display: flex">
          <div class="left" style="transition: all 0.25s">
            <div class="gap" style="height: 10px"></div>
            <BoxWord :boxword="this.SamplePlot.text1" style="position: absolute; top: -10px"></BoxWord>
            <img :src="this.SamplePlot.sample[SampleIndex].img" style="transition: all 0.3s" />

            <div style="position: absolute; bottom: -20px; left: 450px">
              <ArtWord class="artwrod" :text="this.SamplePlot.sample[SampleIndex].title" style="transition: all 0.25s"></ArtWord>
              <div
                style="
                  position: absolute;
                  bottom: 15px;
                  left: 350px;
                  color: #000;
                  font-size: 30px;

                  line-height: 58px;
                  color: rgba(229, 229, 229, 1);
                  transition: all 0.3s;
                  cursor: pointer;
                "
                class="tips"
                @click="SampleIndexChange()"
              >
                {{ this.SamplePlot.sample[(SampleIndex + 1) % 2].title }}
                <img src="https://img.js.design/assets/element/js_oMhh1U8x-tp/image/d494f3faa2f2fed36c09d12d2617182f36a663c9.png" style="width: 25px" />
              </div>
            </div>
          </div>
          <div class="right" style="transition: all 0.25s">
            <BoxWord class="boxword" :boxword="this.SamplePlot.text2" :lineHeight="1.75" :boxWidth="450" style="position: absolute; transition: all 0.25s; top: 150px; margin-left: 15px"></BoxWord>
          </div>
        </div>
        <div class="unetmodel part" style="left: 120px; top: 100px; display: flex">
          <img :src="UNetModel.img" alt="" style="width: 1125px; margin-right: 20px; transition: all 0.25s" />
          <BoxWord class="boxword" :boxword="this.UNetModel.text1" :lineHeight="1.75" :boxWidth="550" :textIndent="false" style="transition: all 0.25s; margin: 75px 0 0 20px"></BoxWord>
        </div>
      </div>
    </div>
    <BottomNavigationBar @clickIndex="handleIndex" :navItem="this.navItem"></BottomNavigationBar>
  </div>
</template>

<script>
import TopNavigationBar from '../TopNavigationBar.vue'
import SideNavigationBar from '../SideNavigationBar.vue'
import BottomNavigationBar from '../BottomNavigationBar.vue'
import ArtWord from '../ArtWord.vue'

import BoxWord from '../BoxWord.vue'

export default {
  name: 'APUpgradePage',
  components: {
    TopNavigationBar,
    SideNavigationBar,
    BottomNavigationBar,
    ArtWord,

    BoxWord,
  },
  data() {
    return {
      title: 'AI绘画',
      subtitle: '',
      // 返回
      backshow: false,
      // 提示词
      CueWord: [
        {
          text: 'stable diffusion使用的是openAI开源的 CLIP模型对输入的text提取提示词。',
        },
        {
          text: '假设我们输入了一段六个单词的提示词。对于我们输入的文本CILP会把文本对应一个词表，每个单词标点符号都有相对应的一个数字，还包含了起始和结束标记，共计8个，每个数字又对应这一个768维的向量，可以看作每个单词的身份证，而且意思非常相近的单词对应的768维向量也基本一致。处理以后就得到了一个（8,768）的对应图像的文本向量，也就是我们的提示词。',
        },
      ],
      // 噪声图
      NoiseMap: {
        title1: '扩散模型',
        text1: [
          {
            text: '扩散模型最早由斯坦福和伯克利学术专家在2015年相关论文里提出。扩散模型包括两个过程：前向过程（forward process）和反向过程（reverse process），其中前向过程又称为扩散过程（diffusion process），无论是前向过程还是反向过程都是一个参数化的马尔可夫链（Markov chain），其中反向过程可以用来生成数据，这里我们将通过变分推断来进行建模和求解。',
          },
          {
            text: 'Diffusion Model其实是VAE的升级版，核心升级部分就是用一种简单的“变分后验”将数据样本映射到标准高斯，并且使得生成器，将标准高斯映射到数据样本中。',
          },
        ],

        title2: '潜空间',
        text2: [
          {
            text: '潜在空间简单的说是对压缩数据的表示。所谓压缩指的是用比原始表示更小的数位来编码信息的过程。维度降低会丢失一部分信息，然而在某些情况下，降维不是件坏事。通过降维我们可以过滤掉一些不太重要的信息你，只保留最重要的信息。',
          },
        ],
      },
      ForwardDiffu: {
        img: 'https://img.js.design/assets/img/64c20834d4a93eb90cdb960e.png#f14528bb428abcb3a3d2c639d21de72a',
        text1: [
          {
            text: '扩散过程是指的对数据逐渐增加高斯噪音直至数据变成随机噪音的过程。',
          },
          {
            text: '对于原始图像X0，进行总共包含T步的扩散过程，其中每一步都是对上一步得到的数据xt−1按特定方式增加高斯噪音，最后演变得到一张纯噪声图。其中这个t步的步数是随机的，而我们可以通过公式直接对原始图像X0进行计算，就可以得到任意步数图像加噪声的图像。',
          },
        ],
      },
      BackwardDiffu: {
        text1: [
          {
            text: '扩散过程是将数据噪音化，那么反向过程就是一个去噪的过程，如果我们知道反向过程的每一步的真实分布，那么从一个随机噪音)开始，逐渐去噪就能生成一个真实的样本，所以反向过程也就是生成数据的过程。',
          },
          {
            text: '逆向开始，我们目标是从噪声图像Xt得到无噪声的X0，先从Xt求Xt-1开始，我们将噪声图Xt、所求的Xt-1以及使用U-Net模型预测出的噪声Z，带入到高斯分布特定公式中，多次迭代求出需要的图片X0，也就是我们希望AI生成的图片。',
          },
        ],
      },
      SamplePlot: {
        sample: [
          {
            title: '文生图采样过程',
            img: 'https://img.js.design/assets/img/64c20cfe04bff4675a435dd0.png#bc85f37b33beb44fe182c6cff6fc49e8',
          },
          {
            title: '图生图采样过程',
            img: 'https://img.js.design/assets/img/64c215b83d9682ef9b859aee.png#3744fa65ee28693e0a0aa94095077d06',
          },
        ],
        text1: [
          {
            text: '在stable diffusion有文生图和图生图两种典型的模式',
          },
        ],
        text2: [
          {
            text: '文生图是直接在数据库中初始化一个噪声，进行采样。',
          },
          {
            text: '图生图是在你原有的基础上加噪声，噪声权重自己控制，对原有图片生成的噪声图进行采样。',
          },
          {
            text: '降噪是采样无用噪声的过程，在这个过程中采样方法也会影响最终图像的结果，不同的采样方法会以不同的喜好和倾向。',
          },
        ],
      },
      SampleIndex: 0,
      UNetModel: {
        img: 'https://img.js.design/assets/img/64c39705c6cd30383b022e31.png#a136171c40490f836553b848de1d14a0',
        text1: [
          {
            text: 'Unet是2015年提出的模型。U-Net 的输出是噪声的残差，用于通过程序算法计算去噪的潜在图像表示。算法根据先前的噪声表示和预测的噪声残差计算预测的去噪图像表示。去噪过程重复约50-100次，这样可以逐步检索更好的潜在图像表示。',
          },
          {
            text: 'U-Net的工作流程是根据特征向量来识别并预测出其中他认为没用的噪声，再把那张原噪声图和这张预测过的噪声叠加相减，生成一张新的噪声相对来说比较少的图。',
          },
        ],
      },

      // 底部导航栏
      navItem: [
        { label: '提示词', selected: true },
        { label: '噪声图', selected: false },
        { label: '前向扩散', selected: false },
        { label: '后向扩散', selected: false },
        { label: '采样图', selected: false },
        { label: 'U-Net模型', selected: false },
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
    // 接收子组件底部导航栏的值
    handleIndex(val) {
      if (this.clickIndex != val) {
        const parts = document.querySelectorAll('.part')
        // const pastElement = parts[this.clickIndex]
        // const nowElement = parts[val]
        this.initElemnt(parts[val], '1', 'translate(0%)')

        // 提示词
        {
          const tip = parts[0]
          if (val == 0) {
            if (this.clickIndex == 1) {
              this.initElemnt(tip, '0', 'translateY(0%)')
              this.animateElement(tip, 250, '1', 'translateX(0%)')
            } else if (this.clickIndex == 2) {
              this.initElemnt(tip, '0', 'translateY(100%)')
              this.moreAnimateElement(tip, 250, '1', 'translateY(-20%)', '1', 'translateY(0%)')
            } else if (this.clickIndex == 3 || this.clickIndex == 4) {
              this.initElemnt(tip, '0', 'translateX(-50%)')
              this.moreAnimateElement(tip, 250, '1', 'translateX(20%)', '1', 'translateX(0%)')
            } else {
              this.initElemnt(tip, '0', 'translate(50%, -20%)')
              this.moreAnimateElement(tip, 250, '1', 'translate(-30%, 10%)', '1', 'translate(0%, 0%)')
            }
          } else if (this.clickIndex == 0) {
            if (val == 1) {
              this.animateElement(tip, 100, '0', 'translateX(0%)')
            } else if (val == 2) {
              this.moreAnimateElement(tip, 0, '1', 'translateY(-20%)', '0', 'translateY(100%)')
            } else if (val == 3 || val == 4) {
              this.moreAnimateElement(tip, 0, '1', 'translateX(10%)', '0', 'translateX(-50%)')
            } else {
              this.moreAnimateElement(tip, 0, '1', 'translateX(-10%)', '0', 'translate(50%, -20%)')
            }
          }
        }

        // 噪声图
        {
          const noise = parts[1]
          const art1 = noise.querySelector('.art1')
          const art2 = noise.querySelector('.art2')
          const boxword1 = noise.querySelector('.boxword1')
          const boxword2 = noise.querySelector('.boxword2')
          if (val == 1) {
            this.animateElement(art1, 200, '1', 'translate(0%)')
            this.animateElement(art2, 200, '1', 'translate(0%)')
            if (this.clickIndex == 0) {
              this.animateElement(boxword1, 250, '1', 'translate(0%)')
              this.initElemnt(boxword2, '0', 'translateX(150%)')
              this.moreAnimateElement(boxword2, 250, '1', 'translateX(-5%)', '1', 'translateX(0%)')
            } else if (this.clickIndex == 2) {
              this.initElemnt(boxword1, '0', 'translateY(100%)')
              this.initElemnt(boxword2, '0', 'translateX(-100%)')
              this.moreAnimateElement(boxword1, 300, '1', 'translateY(-10%)', '1', 'translateY(0%)')
              this.moreAnimateElement(boxword2, 300, '1', 'translateX(10%)', '1', 'translateX(0%)')
            } else if (this.clickIndex == 3) {
              this.initElemnt(boxword1, '0', 'translateX(-100%)')
              this.initElemnt(boxword2, '0', 'translateX(-100%)')
              this.moreAnimateElement(boxword1, 250, '1', 'translateX(10%)', '1', 'translateX(0%)')
              this.moreAnimateElement(boxword2, 250, '1', 'translateX(10%)', '1', 'translateX(0%)')
            } else if (this.clickIndex == 5) {
              this.initElemnt(boxword1, '0', 'translateX(70%)')
              this.initElemnt(boxword2, '0', 'translateX(-50%)')
              this.moreAnimateElement(boxword1, 250, '1', 'translateX(-10%)', '1', 'translateX(0%)')
              this.moreAnimateElement(boxword2, 250, '1', 'translateX(10%)', '1', 'translateX(0%)')
            } else {
              this.initElemnt(boxword1, '0', 'translateY(100%)')
              this.initElemnt(boxword2, '0', 'translateX(-100%)')
              this.moreAnimateElement(boxword1, 250, '1', 'translateY(-5%)', '1', 'translateY(0%)')
              this.moreAnimateElement(boxword2, 250, '1', 'translateX(10%)', '1', 'translateX(0%)')
            }
          } else if (this.clickIndex == 1) {
            this.animateElement(art1, 200, '0', 'translate(0%)')
            this.animateElement(art2, 200, '0', 'translate(0%)')
            if (val == 0) {
              this.animateElement(boxword1, 150, '0', 'translate(0%)')
              this.moreAnimateElement(boxword2, 150, '1', 'translateX(-5%)', '0', 'translateX(100%)')
            } else if (val == 2) {
              this.moreAnimateElement(boxword1, 0, '1', 'translateY(-10%)', '0', 'translateY(100%)')
              this.moreAnimateElement(boxword2, 0, '1', 'translateX(5%)', '0', 'translateX(-100%)')
            } else if (val == 3) {
              this.moreAnimateElement(boxword1, 0, '1', 'translateX(10%)', '0', 'translateX(-100%)')
              this.moreAnimateElement(boxword2, 0, '1', 'translateX(5%)', '0', 'translateX(-100%)')
            } else if (val == 5) {
              this.moreAnimateElement(boxword1, 0, '1', 'translateX(-10%)', '0', 'translateX(50%)')
              this.moreAnimateElement(boxword2, 0, '1', 'translateX(5%)', '0', 'translateX(-50%)')
            } else {
              this.moreAnimateElement(boxword1, 0, '1', 'translateY(-10%)', '0', 'translateY(100%)')
              this.moreAnimateElement(boxword2, 0, '1', 'translateX(5%)', '0', 'translateX(-100%)')
            }
          }
        }

        // 前向扩散
        {
          const image = parts[2].querySelector('.img')
          const boxword = parts[2].querySelector('.boxword')
          if (val == 2) {
            if (this.clickIndex < 2) {
              // this.animateElement(parts[2], 0, '1', 'translate(0%)')

              this.initElemnt(image, '0', 'translateX(50%)')
              this.moreAnimateElement(image, 300, '1', 'translateX(-10%)', '1', 'translateX(0%)')
              this.initElemnt(boxword, '0', 'translateY(-100%)')
              this.moreAnimateElement(boxword, 300, '1', 'translateY(20%)', '1', 'translateY(0%)')
            } else if (this.clickIndex == 3) {
              this.initElemnt(image, '0', 'translateX(-50%)')
              this.moreAnimateElement(image, 300, '0.7', 'translateX(10%)', '1', 'translateX(0%)')
              this.initElemnt(boxword, '0', 'translateX(-50%)')
              this.moreAnimateElement(boxword, 300, '0.7', 'translateX(10%)', '1', 'translateX(0%)')
            } else {
              this.initElemnt(image, '0', 'translateX(-50%)')
              this.moreAnimateElement(image, 350, '1', 'translateX(10%)', '1', 'translateX(0%)')
              this.initElemnt(boxword, '0', 'translate(100%, -45%)')
              this.moreAnimateElement(boxword, 350, '1', 'translate(-10%, 15%)', '1', 'translate(0%)')
            }
          } else if (this.clickIndex == 2) {
            if (val < 2) {
              this.moreAnimateElement(image, 0, '0.7', 'translateX(-10%)', '0', 'translateX(50%)')
              this.moreAnimateElement(boxword, 0, '0.7', 'translateY(20%)', '0', 'translateY(-150%)')
            } else if (val == 3) {
              this.moreAnimateElement(image, 50, '0.7', 'translateX(10%)', '0', 'translateX(-50%)')
              this.moreAnimateElement(boxword, 50, '0.7', 'translateX(10%)', '0', 'translateX(-50%)')
            } else {
              this.moreAnimateElement(image, 50, '0.7', 'translateX(10%)', '0', 'translateX(-50%)')
              this.moreAnimateElement(boxword, 50, '0.7', 'translate(-10%, 15%)', '0', 'translate(100%, -45%)')
            }
          }
        }

        // 后向扩散
        {
          const backward = parts[3]
          if (val == 3) {
            if (this.clickIndex < 3) {
              this.initElemnt(backward, '0', 'translateX(50%)')
              this.moreAnimateElement(backward, 250, '1', 'translateX(-20%)', '1', 'translate(0%)')
            } else {
              this.initElemnt(backward, '0', 'translateX(-50%)')
              this.moreAnimateElement(backward, 250, '1', 'translateX(20%)', '1', 'translate(0%)')
            }
          } else if (this.clickIndex == 3) {
            if (val < 3) {
              this.moreAnimateElement(backward, 0, '1', 'translateX(-10%)', '0', 'translate(50%)')
            } else {
              this.moreAnimateElement(backward, 0, '1', 'translateX(10%)', '0', 'translate(-50%)')
            }
          }
        }

        // 采样图
        {
          const sampling = parts[4]
          const left = sampling.querySelector('.left')
          const right = sampling.querySelector('.right').querySelector('.boxword')
          if (val == 4) {
            if (this.clickIndex == 0) {
              this.initElemnt(left, '0', 'translateX(50%)')
              this.initElemnt(right, '0', 'translateX(-50%)')
              this.moreAnimateElement(left, 200, '1', 'translateX(-15%)', '1', 'translateX(0%)')
              this.moreAnimateElement(right, 200, '1', 'translateX(15%)', '1', 'translateX(0%)')
            } else if (this.clickIndex == 1) {
              this.initElemnt(left, '0', 'translateX(50%)')
              this.initElemnt(right, '0', 'translateX(-50%)')
              this.moreAnimateElement(left, 250, '1', 'translateX(-15%)', '1', 'translateX(0%)')
              this.moreAnimateElement(right, 250, '1', 'translateX(15%)', '1', 'translateX(0%)')
            } else if (this.clickIndex == 2) {
              this.initElemnt(left, '0', 'translateX(50%)')
              this.initElemnt(right, '0', 'translate(-50%, 30%)')
              this.moreAnimateElement(left, 250, '1', 'translateX(-15%)', '1', 'translateX(0%)')
              this.moreAnimateElement(right, 250, '1', 'translate(15%, -15%)', '1', 'translateX(0%)')
            } else if (this.clickIndex == 3) {
              this.initElemnt(left, '0', 'translateX(50%)')
              this.initElemnt(right, '0', 'translateX(50%)')
              this.moreAnimateElement(left, 250, '0.5', 'translateX(-15%)', '1', 'translateX(0%)')
              this.moreAnimateElement(right, 250, '0.5', 'translateX(-15%)', '1', 'translateX(0%)')
            } else if (this.clickIndex == 5) {
              this.initElemnt(left, '0', 'translateX(-50%)')
              this.initElemnt(right, '0', 'translate(-10%, -10%)')
              this.moreAnimateElement(left, 250, '1', 'translateX(10%)', '1', 'translateX(0%)')
              this.animateElement(right, 250, '1', 'translate(0%)')
            }
          } else if (this.clickIndex == 4) {
            if (val == 0 || val == 1) {
              this.moreAnimateElement(left, 0, '1', 'translateX(-15%)', '0', 'translateX(50%)')
              this.moreAnimateElement(right, 0, '1', 'translateX(15%)', '0', 'translateX(-50%)')
            } else if (val == 2) {
              this.initElemnt(left, '1', 'translateX(0%)')
              this.initElemnt(right, '1', 'translate(0%, 0%)')
              this.moreAnimateElement(left, 50, '1', 'translateX(-15%)', '0', 'translateX(50%)')
              this.moreAnimateElement(right, 50, '1', 'translate(15%, -15%)', '0', 'translate(-50%, 30%)')
            } else if (val == 3) {
              this.moreAnimateElement(left, 450, '1', 'translateX(-15%)', '0', 'translateX(50%)')
              this.moreAnimateElement(right, 450, '1', 'translateX(-15%)', '0', 'translateX(50%)')
            } else if (val == 5) {
              this.moreAnimateElement(left, 0, '1', 'translateX(10%)', '0', 'translateX(-50%)')
              this.animateElement(right, 250, '0', 'translateX(0%)')
            }
          }
        }

        // U-Netmox
        {
          const NUet = parts[5]
          const img = NUet.querySelector('img')
          const boxword = NUet.querySelector('.boxword')
          if (val == 5) {
            if (this.clickIndex == 1 || this.clickIndex == 0) {
              this.initElemnt(img, '0', 'translateX(40%)')
              this.moreAnimateElement(img, 400, '1', 'translateX(-5%)', '1', 'translate(0%)')
              this.initElemnt(boxword, '0', 'translateX(-60%)')
              this.moreAnimateElement(boxword, 400, '1', 'translateX(10%)', '1', 'translate(0%)')
            } else if (this.clickIndex == 2) {
              this.initElemnt(img, '0', 'translate(20%, -15%)')
              this.moreAnimateElement(img, 275, '1', 'translate(-10%, 10%)', '1', 'translate(0%)')
              this.initElemnt(boxword, '0', 'translate(-30%, 10%)')
              this.moreAnimateElement(boxword, 275, '1', 'translate(25%, -5%)', '1', 'translate(0%)')
            } else if (this.clickIndex == 3) {
              this.initElemnt(img, '0', 'translateX(40%)')
              this.moreAnimateElement(img, 250, '1', 'translateX(-10%)', '1', 'translateX(0%)')
              this.initElemnt(boxword, '0', 'translateX(40%)')
              this.moreAnimateElement(boxword, 250, '1', 'translateX(-10%)', '1', 'translateX(0%)')
            } else if (this.clickIndex == 4) {
              this.initElemnt(img, '0', 'translateX(50%)')
              this.moreAnimateElement(img, 350, '1', 'translateX(-10%)', '1', 'translateX(0%)')
              this.initElemnt(boxword, '0', 'translate(5%, 5%)')
              this.animateElement(boxword, 300, '1', 'translateX(0%)')
            }
          } else if (this.clickIndex == 5) {
            if (val == 1 || val == 0) {
              this.moreAnimateElement(img, 0, '1', 'translateX(-5%)', '0', 'translateX(40%)')
              this.moreAnimateElement(boxword, 0, '1', 'translateX(10%)', '0', 'translateX(-60%)')
            } else if (val == 2) {
              this.moreAnimateElement(img, 50, '1', 'translate(-10%, 10%)', '0', 'translate(20%, -15%)')
              this.moreAnimateElement(boxword, 50, '1', 'translate(25%, -5%)', '0', 'translate(-30%, 10%)')
            } else if (val == 3) {
              this.moreAnimateElement(img, 0, '1', 'translateX(-10%)', '0', 'translateX(40%)')
              this.moreAnimateElement(boxword, 0, '1', 'translateX(-10%)', '0', 'translateX(40%)')
            } else if (val == 4) {
              this.moreAnimateElement(img, 0, '1', 'translateX(-10%)', '0', 'translateX(50%)')
              this.animateElement(boxword, 200, '0', 'translate(5%, 5%)')
            }
          }
        }
        this.clickIndex = val
      }
    },
    initElemnt(element, opacityValue, transformValue) {
      element.style.transform = transformValue
      element.style.opacity = opacityValue
    },
    animateElement(element, duration, opacityValue, transformValue) {
      setTimeout(() => {
        element.style.transform = transformValue
        element.style.opacity = opacityValue
      }, duration)
    },
    moreAnimateElement(element, duration, opacityValue, transformValue, opacityValue2, transformValue2) {
      setTimeout(() => {
        element.style.transform = transformValue
        element.style.opacity = opacityValue
      }, duration)
      setTimeout(() => {
        element.style.transform = transformValue2
        element.style.opacity = opacityValue2
      }, duration + 250)
    },
    // "采样图"页面的图片切换
    SampleIndexChange() {
      const sampling = document.querySelector('.samplingplot')
      const img = sampling.querySelector('img')
      const artword = sampling.querySelector('.artword')
      const tips = sampling.querySelector('.tips')
      img.style.opacity = '0'
      artword.style.opacity = '0'
      tips.style.opacity = '0'
      this.SampleIndex = (this.SampleIndex + 1) % 2
      setTimeout(() => {
        img.style.opacity = '1'
        artword.style.opacity = '1'
        tips.style.opacity = '1'
      }, 200)
    },
  },
  created() {
    // 获取传过来的值，标题以及副标题
    this.subtitle = this.$route.query.subtitle
    const subnav = this.$route.query.subnav
    if (this.$route.query.backshow) {
      this.backshow = this.$route.query.backshow
    }
    // 根据传来的副标题，决定显示的第几页
    for (var i = 0; i < this.navItem.length; i++) {
      this.navItem[i].selected = false
      if (this.navItem[i].label === subnav) {
        this.navItem[i].selected = true
      }
    }
    if (this.clickIndex == 0) {
      this.navItem[0].selected = true
    }
  },
  mounted() {
    const parts = document.querySelectorAll('.part')
    for (var j = 0; j < parts.length; j++) {
      parts[j].style.opacity = '0'
    }
    parts[0].style.opacity = '1'
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
  width: 3840px;
  height: 900px;
  transition: all 0.25s;
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
  .bigbox {
    position: relative;
    .part {
      margin: 0 auto;
      position: absolute;
      top: 50px;
      left: 200px;
      transition: all 0.5s;
    }
  }
}
</style>
