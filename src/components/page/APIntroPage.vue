<template>
  <!-- AI绘画 页面 -->
  <!-- AI绘画 -> 入门原理 -->
  <div id="app">
    <!-- 侧边栏导航 -->
    <SideNavigationBar style="z-index: 999"></SideNavigationBar>
    <!-- 顶部导航栏 -->
    <TopNavigationBar :sub="'APIntro'" :title="title" style="z-index: 999" :backShow="backshow"></TopNavigationBar>
    <!-- backButton -->

    <!-- body -->
    <div class="body" :style="{ left: Index + 'px' }">
      <!-- 绘制过程 -->
      <div class="sec">
        <!-- 流程图 -->

        <div class="lab" :class="{ isHoverLab: item.isHover }" style="z-index: 5" v-for="(item, id) in datas" :key="id" :style="{ left: item.left, top: item.top }" @mouseover="ShowChange(id)" @mouseout="HideChange(id)">{{ item.label }}</div>

        <div class="ad" :style="{ borderRadius: this.datas[0].isHover ? '30px' : '' }" style="transition: all 0.3s; width: 245px; height: 85px; background-color: rgba(85, 144, 212, 1); position: absolute; left: 100px; top: 400px"></div>
        <div class="ad" :style="{ borderRadius: this.datas[2].isHover ? '30px' : '' }" style="transition: all 0.3s; width: 245px; height: 85px; background-color: rgba(246, 147, 36, 1); position: absolute; left: 730px; top: 400px"></div>
        <!-- 文字描述 -->
        <div class="description">
          <ArtWord :text="'AI绘画过程'" style="margin: 0 0 30px 200px"></ArtWord>
          <div class="content">
            <div v-for="(txt, key) in datas" :key="key" :class="{ isHoverText: txt.isHover }">{{ txt.text }}</div>
          </div>
        </div>
        <!-- 箭头 -->
        <img src="../../assets/pictures/ArrowLines/AIPainting.png" style="position: absolute; left: 350px; top: 95px" alt="" />
        <img :src="deconateImg" alt="" class="deconateImg1" />
        <img :src="deconateImg" alt="" class="deconateImg2" /><!-- 矩形 -->
        <!-- <RectangleStrange style="position: absolute; left: 1050px; top: 75px"></RectangleStrange> -->
        <!-- 箭头 -->
        <!-- <ArrowRight style="position: absolute" v-for="(item, id) in ArrowRightDatas" :key="id" :style="{ left: item.left, top: item.top }" :length="item.length"></ArrowRight>
        <ArrowDown style="position: absolute" v-for="(item, id) in ArrowDownDatas" :key="id" :style="{ left: item.left, top: item.top }" :length="item.length"></ArrowDown> -->
      </div>
      <!-- 使用原理 -->
      <div class="sec" style="position: relative">
        <div>
          <div class="hex">
            <img id="hexagon1" class="hexagon" :src="hexagonImage" alt="" :width="canvasWidthIn" :height="canvasHeightIn" style="transition: all 0.25s; position: absolute" :style="{ left: hexagonDatas[0].left, top: hexagonDatas[0].top }" @click="clickHexagonForward(0)" />
            <img id="hexagon2" class="hexagon" :src="hexagonImage" :width="canvasWidthOut" :height="canvasHeightOut" style="transition: all 0.25s; position: absolute" :style="{ left: hexagonDatas[1].left, top: hexagonDatas[1].top }" @click="clickHexagonForward(1)" />
            <img id="hexagon3" class="hexagon" :src="hexagonImage" :width="canvasWidthOut" :height="canvasHeightOut" style="transition: all 0.25s; position: absolute" :style="{ left: hexagonDatas[2].left, top: hexagonDatas[2].top }" @click="clickHexagonForward(2)" />
            <img id="hexagon4" class="hexagon" :src="hexagonImage" :width="canvasWidthOut" :height="canvasHeightOut" style="transition: all 0.25s; position: absolute" :style="{ left: hexagonDatas[3].left, top: hexagonDatas[3].top }" @click="clickHexagonForward(3)" />
          </div>
          <div class="content">
            <div class="ban" v-for="(item, id) in princpleDatas" :key="id">
              <img class="number" :src="item.img" alt="" style="" :style="{ left: item.imgleft + item.left + 'px', top: item.imgtop + item.top + 'px' }" />
              <ArtWord :text="item.title" class="title" :style="{ left: item.titleleft + item.left + 'px', top: item.titletop + item.top + 'px' }"></ArtWord>
              <div class="text" :style="{ left: item.textleft + item.left + 'px', top: item.texttop + item.top + 'px' }">{{ item.text }}</div>
              <BoxWord class="boxword" :style="{ left: item.hexagonTextLeft, top: item.hexagonTextTop }" :boxWidth="item.hexagonTextWidth" :boxword="item.hexagonText" :wordSize="item.wordSize" :lineHeight="1.75"></BoxWord>
              <img :src="item.hexagonImg" alt="" class="hexagonImg" :style="{ left: item.hexagonImgLeft, top: item.hexagonImgTop }" />
            </div>
          </div>
        </div>
        <img class="backButton" :src="backIcon" @click="clickHexagonBackward()" style="z-index: 90; position: absolute; right: 50px; top: 25px; width: 65px; opacity: 0; cursor: pointer" />
      </div>
    </div>
    <BottomNavigationBar @clickIndex="handleIndex" :navItem="this.navItem"></BottomNavigationBar>
  </div>
</template>

<script>
import TopNavigationBar from '../TopNavigationBar.vue'
import SideNavigationBar from '../SideNavigationBar.vue'
import BottomNavigationBar from '../BottomNavigationBar.vue'
// import RectangleStrange from './APPage/RectangleStrange.vue'
import ArtWord from '../ArtWord.vue'
// import ArrowRight from '../ArrowRight.vue'
// import ArrowDown from '../ArrowDown.vue'
import BoxWord from '../BoxWord.vue'
export default {
  name: 'APIntroPage',
  components: {
    TopNavigationBar,
    SideNavigationBar,
    BottomNavigationBar,
    // RectangleStrange,
    // ArrowRight,
    // ArrowDown,
    ArtWord,
    BoxWord,
  },
  data() {
    return {
      title: 'AI绘画',
      subtitle: '',
      options: undefined,
      switchButton: false,
      // 返回
      backshow: false,
      // 头部导航的返回按钮显示
      TopnavBackshow: false,
      deconateImg: 'https://img.js.design/assets/img/64acfe418bcac05a23546ac6.png#e0349481be4c2a43efe316b9bbcff2d5',
      // 绘制过程数据
      datas: [
        {
          label: '输入关键词',
          bgcolor: 'rgba(85, 144, 212, 1)',
          text: '1.输入关键词，具体的单词会被ai转换成图像特征向量',
          left: '105px',
          top: '400px',
          isHover: false,
        },
        {
          label: '图像特征向量',
          bgcolor: 'transparent',
          text: '2.图像特征向量加上一张随机调出的噪声图一起进入到图像编码器里',
          left: '415px',
          top: '400px',
          isHover: false,
        },
        {
          label: '图像编码器',
          bgcolor: 'rgba(246, 147, 36, 1)',
          text: '3.图像编码器会根据图像特征向量把噪声图逐步降噪成一张新的图片',
          left: '730px',
          top: '400px',
          isHover: false,
        },
        {
          label: '随机噪点图片',
          bgcolor: 'transparent',
          left: '730px',
          top: '250px',
          isHover: false,
        },
        {
          label: '生成图片',
          bgcolor: 'transparent',
          left: '730px',
          top: '550px',
          isHover: false,
        },
      ],

      // 使用原理数据
      princpleDatas: [
        {
          id: '0',
          left: 180,
          top: 120,
          title: '图像特征',
          imgleft: 70,
          imgtop: 170,
          text: '根据输入的语段在数据库中找到相似或者对应的图像特征，将这个图像特征作为绘画的方向，然后将多个方面的图像特征都融合起来，就形成了这次生成所需的全部特征向量，也就是画面的具体内容和方向，类似人类绘画中的确定绘画想表达的内容。',
          titleleft: 115,
          titletop: 45,
          img: 'https://img.js.design/assets/img/64bbde6448740206395d6445.png#d8f8acb541e7714fca6626770b3512df',
          textleft: 130,
          texttop: 150,
          wordSize: 30,

          // 点击后展开的内容
          hexagonText: [
            {
              text: ' 根据输入的语段在数据库中找到相似或者对应的图像特征，将这个图像特征作为绘画的方向，然后将多个方面的图像特征都融合起来，就形成了这次生成所需的全部特征向量，也就是画面的具体内容和方向，类似人类绘画中的确定绘画想表达的内容。',
            },
          ],
          hexagonTextWidth: 1330,
          hexagonTextLeft: '300px',
          hexagonTextTop: '200px',
          hexagonImg: '',
          hexagonImgLeft: '',
          hexagonImgTop: '',
        },
        {
          id: '1',
          left: 570,
          top: 350,
          title: ' 噪声图',
          imgleft: 70,
          imgtop: 170,
          text: ' 在有了图像特征后，还需要一张噪声图来让图像编码器在上面工作。通过特定的扩散模型将一张图片打散，变成一张全是噪声的图片。然后用这张噪声图作为基础，在上面添砖加瓦，这在人类绘画中就相当于拿出了一张纸，以供画家在上面进行绘画。',
          titleleft: 135,
          titletop: 45,
          img: 'https://img.js.design/assets/img/64bbe14848740206395d89f2.png#1c19164358517234612802409d45a7dd',
          textleft: 135,
          texttop: 150,
          wordSize: 30,

          // 点击后展开的内容
          hexagonText: [
            {
              text: '在有了图像特征后，还需要一张噪声图来让图像编码器在上面工作。通过特定的扩散模型将一张图片打散，变成一张全是噪声的图片。然后用这张噪声图作为基础，在上面添砖加瓦，这在人类绘画中就相当于拿出了一张纸，以供画家在上面进行绘画。',
            },
          ],
          hexagonTextWidth: 1330,
          hexagonTextLeft: '300px',
          hexagonTextTop: '200px',
          hexagonImg: '',
          hexagonImgLeft: '',
          hexagonImgTop: '',
        },
        {
          id: '2',
          left: 960,
          top: 120,
          title: '生成新图',
          imgleft: 70,
          imgtop: 170,
          text: '将噪声图和图像特征嵌入到图像编码器中，去除掉无用噪声，多次迭代最后生成图像。在人类绘画中，会先制作线稿，再将不需要的线擦去，保留需要的线，最终形成画作，而图像编码器类似于这个操作，将不需要的噪声去除，需要的保留，多次重复的进行后，生成了一张全新符合描述的图像。',
          titleleft: 110,
          titletop: 35,
          img: 'https://img.js.design/assets/img/64bca8edf4653c66a96fa526.png#c0adaa0c95f5c5a0437fb6d6be2da82f',
          textleft: 130,
          texttop: 140,
          wordSize: 30,

          // 点击后展开的内容
          hexagonText: [
            {
              text: '将噪声图和图像特征嵌入到图像编码器中，去除掉无用噪声，多次迭代最后生成图像。在人类绘画中，会先制作线稿，再将不需要的线擦去，保留需要的线，最终形成画作，而图像编码器类似于这个操作，将不需要的噪声去除，需要的保留，多次重复的进行后，生成了一张全新符合描述的图像。',
            },
          ],
          hexagonTextWidth: 585,
          hexagonTextLeft: '1200px',
          hexagonTextTop: '200px',
          hexagonImg: 'https://img.js.design/assets/img/64c39705c6cd30383b022e31.png#a136171c40490f836553b848de1d14a0',
          hexagonImgLeft: '100px',
          hexagonImgTop: '150px',
        },
        {
          id: '3',
          left: 1340,
          top: 350,
          title: '训练模型',
          imgleft: 70,
          imgtop: 170,
          text: ' 想要训练一个模型就是让AI对于训练示例进行判断。         像是人类世界中的考试题一样 随机给模型一个训练示例 然后尝试让他进行生成 之后再拿实际的正确答案进行对比 看看这两者相差多少 计算差值 如果差得多就打破重做 差得少就通过测试这样的流程一直循环上亿次 用绝对的数量让模型偏向我们需要的绘画风格 这也是各种AI人工智能最传统的学习方法 甚至前面说的文本模型的训练也是让它不断的答题 不断的试错 最后达到精确匹配图像特征。',
          titleleft: 110,
          titletop: 15,
          img: 'https://img.js.design/assets/img/64bca9cabc7a42199ce33a6c.png#fe6f79c1b7326ec4ef0e9cd78fe904c0',
          textleft: 130,
          texttop: 110,
          wordSize: 30,

          // 点击后展开的内容
          hexagonText: [
            {
              text: '想要训练一个模型就是让AI对于训练示例进行判断。像是人类世界中的考试题一样 随机给模型一个训练示例 然后尝试让他进行生成 之后再拿实际的正确答案进行对比 看看这两者相差多少 计算差值 如果差得多就打破重做 差得少就通过测试这样的流程一直循环上亿次 用绝对的数量让模型偏向我们需要的绘画风格 这也是各种AI人工智能最传统的学习方法 甚至前面说的文本模型的训练也是让它不断的答题 不断的试错 最后达到精确匹配图像特征。',
            },
          ],
          hexagonTextWidth: 600,
          hexagonTextLeft: '1225px',
          hexagonTextTop: '150px',
          hexagonImg: require('@/assets/pictures/4TrainModel.png'),
          hexagonImgLeft: '100px',
          hexagonImgTop: '150px',
        },
      ],
      // 六角形
      hexagonDatas: [
        {
          left: '180px',
          top: '95px',
        },
        {
          left: '570px',
          top: '325px',
        },
        {
          left: '960px',
          top: '95px',
        },
        {
          left: '1340px',
          top: '325px',
        },
      ],
      hexagonImage: require('../../assets/pictures/Hexagon.png'),
      hexagonBackShow: '0',
      backIcon: 'https://img.js.design/assets/img/64ac3333e0d3997a9d82f3cb.png#4b80a8bb6e3325ca85caf32f8c539aba',

      // 箭头坐标
      ArrowRightDatas: [
        {
          id: '1',
          length: '105',
          left: '295px',
          top: '390px',
        },
        {
          id: '1',
          length: '110',
          left: '610px',
          top: '390px',
        },
      ],
      ArrowDownDatas: [
        {
          id: '1',
          length: '65',
          left: '820px',
          top: '335px',
        },
        {
          id: '1',
          length: '65',
          left: '820px',
          top: '485px',
        },
      ],
      // 六角形
      currentHexagon: -1,

      // 底部导航栏
      navItem: [
        { label: '绘制过程', selected: true },
        { label: '使用原理', selected: false },
      ],
      boxImg: 'https://img.js.design/assets/img/64acfe418bcac05a23546ac6.png#e0349481be4c2a43efe316b9bbcff2d5',
      // 对应底部导航栏的位置
      clickIndex: 0,

      // canvas
      canvasWidthOut: 450,
      canvasHeightOut: 450,
      canvasWidthIn: 450,
      canvasHeightIn: 450,
    }
  },
  computed: {
    // 实时监测改值的变化
    Index() {
      return -this.clickIndex * 1920
    },
  },
  methods: {
    ShowChange(id) {
      this.datas[id].isHover = true
    },
    HideChange(id) {
      this.datas[id].isHover = false
    },
    // 接收子组件的值
    handleIndex(val) {
      this.clickHexagonBackward(true)
      setTimeout(() => {
        this.clickIndex = val

        // this.initHexagon()
      }, 200)
    },
    // 点击六角形的事件
    clickHexagonForward(id) {
      this.currentHexagon = id
      // 文字标题图片对象
      const bans = document.querySelectorAll('.ban')
      const hex = document.querySelector('.hex')
      // 六角形对象
      const imgAll = hex.querySelectorAll('img')

      // 选中六角形的移动效果
      {
        const moveElement = bans[id]
        const img = moveElement.querySelector('.number')
        const title = moveElement.querySelector('.title')
        const text = moveElement.querySelector('.text')
        const hexagonText = moveElement.querySelector('.boxword')
        const hexagonImg = moveElement.querySelector('.hexagonImg')
        // 动画1：解决不同六角形的位置移动统一居中位置
        var midleft = [800, 790, 780, 780]
        var midtop = 220

        img.style.left = midleft[id] + this.princpleDatas[id].imgleft + 'px'
        img.style.top = midtop + this.princpleDatas[id].imgtop + 'px'
        title.style.left = midleft[id] + this.princpleDatas[id].titleleft + 'px'
        title.style.top = midtop + this.princpleDatas[id].titletop + 'px'
        text.style.left = midleft[id] + this.princpleDatas[id].textleft + 'px'
        text.style.top = midtop + this.princpleDatas[id].texttop + 'px'

        const Element = imgAll[id]
        if (id < 2) {
          Element.style.left = midleft[3] + 10 + 'px'
        } else {
          Element.style.left = midleft[3] + 'px'
        }
        Element.style.top = midtop - 25 + 'px'
        // 动画2：六角形放大，文字出现
        setTimeout(() => {
          Element.style.transform = 'scale(6)'
          setTimeout(() => {
            Element.style.display = 'none'
            const backButton = document.querySelector('.backButton')
            backButton.style.opacity = '1'
            this.hexagonBackShow = true
          }, 250)
          img.style.left = 125 + 'px'
          img.style.top = 50 + 'px'
          title.style.left = 200 + 'px'
          title.style.top = 20 + 'px'
          text.style.left = 200 + 'px'
          text.style.top = 200 + 'px'
          text.style.opacity = '0'
          hexagonText.style.opacity = '1'
          hexagonImg.style.opacity = '1'
        }, 550)
      }

      // 未选中六角形的移动动画效果
      {
        for (var i = 0; i < this.princpleDatas.length; i++) {
          var moveciteleft = -1500
          var moveciteright = 1500
          var oimg = bans[i].querySelector('.number')
          var otitle = bans[i].querySelector('.title')
          var otext = bans[i].querySelector('.text')
          var Element = imgAll[i]
          if (i < id) {
            bans[i].style.left = parseInt(bans[i].style.left, 10) + moveciteleft + 'px'
            oimg.style.left = parseInt(oimg.style.left, 10) + moveciteleft + 'px'
            otitle.style.left = parseInt(otitle.style.left, 10) + moveciteleft + 'px'
            otext.style.left = parseInt(otext.style.left, 10) + moveciteleft + 'px'
            Element.style.left = parseInt(Element.style.left, 10) + moveciteleft + 'px'
          } else if (i > id) {
            bans[i].style.left = parseInt(bans[i].style.left, 10) + moveciteright + 'px'
            oimg.style.left = parseInt(oimg.style.left, 10) + moveciteright + 'px'
            otitle.style.left = parseInt(otitle.style.left, 10) + moveciteright + 'px'
            otext.style.left = parseInt(otext.style.left, 10) + moveciteright + 'px'
            Element.style.left = parseInt(Element.style.left, 10) + moveciteright + 'px'
          }
        }
      }
    },
    // 返回事件
    clickHexagonBackward(bottomNav = false) {
      if (this.hexagonBackShow == true) {
        this.hexagonBackShow = false

        const backButton = document.querySelector('.backButton')
        backButton.style.opacity = '0'
        this.hexagonBackShow = '0'
        var id = this.currentHexagon
        // 文字标题图片对象
        const bans = document.querySelectorAll('.ban')
        const hex = document.querySelector('.hex')
        // 六角形对象
        const imgAll = hex.querySelectorAll('img')

        // 选中六角形的移动效果
        {
          const moveElement = bans[id]
          const img = moveElement.querySelector('.number')
          const title = moveElement.querySelector('.title')
          const text = moveElement.querySelector('.text')
          const hexagonText = moveElement.querySelector('.boxword')
          const hexagonImg = moveElement.querySelector('.hexagonImg')

          // 动画1：解决不同六角形的位置移动统一居中位置
          var midleft = [800, 790, 780, 780]
          var midtop = 220

          const Element = imgAll[id]
          if (id < 2) {
            Element.style.left = midleft[3] + 10 + 'px'
          } else {
            Element.style.left = midleft[3] + 'px'
          }

          Element.style.display = 'block'
          setTimeout(() => {
            img.style.left = midleft[id] + this.princpleDatas[id].imgleft + 'px'
            img.style.top = midtop + this.princpleDatas[id].imgtop + 'px'
            title.style.left = midleft[id] + this.princpleDatas[id].titleleft + 'px'
            title.style.top = midtop + this.princpleDatas[id].titletop + 'px'
            text.style.left = midleft[id] + this.princpleDatas[id].textleft + 'px'
            text.style.top = midtop + this.princpleDatas[id].texttop + 'px'
            text.style.opacity = '1'

            Element.style.transform = 'scale(1)'
            hexagonText.style.opacity = '0'
            hexagonImg.style.opacity = '0'
          }, 150)
          // 动画2：六角形放大，文字出现
          setTimeout(() => {
            Element.style.left = this.hexagonDatas[id].left
            Element.style.top = this.hexagonDatas[id].top
            img.style.left = this.princpleDatas[id].imgleft + this.princpleDatas[id].left + 'px'
            img.style.top = this.princpleDatas[id].imgtop + this.princpleDatas[id].top + 'px'
            title.style.left = this.princpleDatas[id].titleleft + this.princpleDatas[id].left + 'px'
            title.style.top = this.princpleDatas[id].titletop + this.princpleDatas[id].top + 'px'
            text.style.left = this.princpleDatas[id].textleft + this.princpleDatas[id].left + 'px'
            text.style.top = this.princpleDatas[id].texttop + this.princpleDatas[id].top + 'px'
          }, 550)
          setTimeout(() => {
            // 未选中六角形的移动动画效果
            for (var i = 0; i < this.princpleDatas.length; i++) {
              var moveciteleft = 1500
              var moveciteright = -1500
              if (bottomNav) {
                moveciteleft = 0
                moveciteright = 0
              }
              var oimg = bans[i].querySelector('.number')
              var otitle = bans[i].querySelector('.title')
              var otext = bans[i].querySelector('.text')
              var ElementOther = imgAll[i]
              if (i < id) {
                bans[i].style.left = parseInt(bans[i].style.left, 10) + moveciteleft + 'px'
                oimg.style.left = parseInt(oimg.style.left, 10) + moveciteleft + 'px'
                otitle.style.left = parseInt(otitle.style.left, 10) + moveciteleft + 'px'
                otext.style.left = parseInt(otext.style.left, 10) + moveciteleft + 'px'
                ElementOther.style.left = parseInt(ElementOther.style.left, 10) + moveciteleft + 'px'
              } else if (i > id) {
                bans[i].style.left = parseInt(bans[i].style.left, 10) + moveciteright + 'px'
                oimg.style.left = parseInt(oimg.style.left, 10) + moveciteright + 'px'
                otitle.style.left = parseInt(otitle.style.left, 10) + moveciteright + 'px'
                otext.style.left = parseInt(otext.style.left, 10) + moveciteright + 'px'
                console.log(parseInt(ElementOther.style.left, 10) + 'px' + i)
                ElementOther.style.left = parseInt(ElementOther.style.left, 10) + moveciteright + 'px'
              }
            }
          }, 550)
        }
      }
    },
    // 初始化六角形
    initHexagon() {
      var canvasAll = document.querySelector('.hex').querySelectorAll('canvas')
      var banAll = document.querySelectorAll('.ban')
      for (var i = 0; i < this.princpleDatas.length; i++) {
        var canvas = canvasAll[i]
        canvas.style.left = this.hexagonDatas[i].left
        canvas.style.top = this.hexagonDatas[i].top
        canvas.style.transform = 'scale(1)'
        canvas.style.display = 'block'

        // 初始化文字标题图片
        var ban = banAll[i]
        var img = ban.querySelector('img')
        var title = ban.querySelector('.title')
        var text = ban.querySelector('.text')
        var hexagonText = ban.querySelector('.boxword')
        var hexagonImg = ban.querySelector('.hexagonImg')

        img.style.left = this.princpleDatas[i].left + this.princpleDatas[i].imgleft + 'px'
        img.style.top = this.princpleDatas[i].top + this.princpleDatas[i].imgtop + 'px'
        title.style.left = this.princpleDatas[i].left + this.princpleDatas[i].titleleft + 'px'
        title.style.top = this.princpleDatas[i].top + this.princpleDatas[i].titletop + 'px'
        text.style.left = this.princpleDatas[i].left + this.princpleDatas[i].textleft + 'px'
        text.style.top = this.princpleDatas[i].top + this.princpleDatas[i].texttop + 'px'
        text.style.opacity = '1'
        hexagonText.style.opacity = '0'
        hexagonImg.style.opacity = '0'
      }
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
    this.switchButton = Boolean(this.$route.query.switchButton)
  },
}
</script>

<style lang="scss" scoped>
$text-size: 24px;
#app {
  width: 1920px;
  height: 1080px;
  position: relative;
  overflow: hidden;
  font-family: '思源黑体' !important;
  z-index: 10;
  background: transparent;
}

.body {
  display: flex;
  position: absolute;
  top: 9%;
  width: 3840px;
  height: 900px;
  transition: all 0.5s;
  overflow: hidden;
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
    width: 1920px;
    height: 900px;
  }
  .lab {
    min-width: 245px;
    position: absolute;
    height: 87px;
    border: 4px solid rgba(255, 255, 255, 1);
    font-size: 30px;
    color: #fff;
    line-height: 83px;
    padding: 0 33px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
  }
  .description {
    position: absolute;
    left: 1090px;
    top: 110px;
    width: 750px;
    height: 710px;
    padding: 53px;
    line-height: 58px;
    color: #fff;
    .title {
      font-size: 42px;
      text-align: center;

      margin-bottom: 45px;
    }
    .content {
      font-size: 30px;
      div {
        margin-bottom: 33px;
        transition: all 0.3s;
      }
    }
  }
  .sec {
    .ban {
      img {
        position: absolute;
        transition: all 0.25s;
      }
      .title {
        position: absolute;
        transition: all 0.25s;
      }
      .text {
        position: absolute;
        transition: all 0.25s;
        text-indent: 2em;
        font-size: 8px;
        line-height: 20px;
        width: 200px;
        color: #fff;
      }
      .boxword {
        position: absolute;
        transition: all 0.25s;
        opacity: 0;
      }
      .hexagonImg {
        position: absolute;
        transition: all 0.25s;
        opacity: 0;
      }
    }
  }
  .hexagon {
    cursor: pointer;
    z-index: 2;
  }
}

.isHoverLab {
  border: 4px solid rgba(105, 255, 246, 1) !important;
  color: rgba(105, 255, 246, 1) !important;
  border-radius: 30px !important;
}
.isHoverText {
  color: rgba(105, 255, 246, 1);
}

.deconateImg1 {
  position: absolute;
  width: 310px;
  left: 1000px;
  top: 70px;
  transform: scaleX(-1);
}
.deconateImg2 {
  position: absolute;
  width: 300px;
  left: 1600px;
  top: 420px;
  z-index: 5;
  transform: scaleY(-1);
}
</style>
