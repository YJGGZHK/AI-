<template>
  <!-- 人工智能 页面 -->
  <div id="app">
    <!-- 侧边栏导航 -->
    <SideNavigationBar style="z-index: 999"></SideNavigationBar>
    <!-- 顶部导航栏 -->
    <TopNavigationBar :title="title" :sub="'AI'" :backShow="backshow"></TopNavigationBar>

    <div class="body" :style="{ left: Index + 'px' }">
      <!-- 发展过程 -->
      <div class="sec" style="padding: 90px 0 0 180px">
        <!-- 箭头线条 -->
        <img src="../../assets/pictures/ArrowLines/AIDevelop.png" style="position: absolute; left: 117px; top: 205px" alt="" />
        <!-- <ArrowRight style="position: absolute" v-for="(arrow, id) in arrowdatas" :key="id" :length="arrow.length" :style="{ left: arrow.left, top: arrow.top }"></ArrowRight>
          <ArrowCanvasSpecial style="position: absolute; left: -130px; top: 195px" :x1="250" :x2="-1450" :x3="-1390" :y1="290" :y2="405"></ArrowCanvasSpecial> -->
        <TimeNode :develops="item" style="position: absolute" v-for="(item, id) in developdatas" :key="id" :style="{ left: item.left, top: item.top }"></TimeNode>
      </div>

      <!-- 拓展介绍 -->
      <div class="sec">
        <div class="expand">
          <!-- 如何训练AI -->
          <div class="part AI">
            <div class="tit" @click="ExpandEvent1()">
              <ArtWord :text="usedatas[0].title"></ArtWord>
              <div class="tip" style="opacity: 0">点击展开</div>
            </div>
            <div class="intro">
              <div>{{ usedatas[0].intro1 }}</div>
              <div class="ot">
                <RectangleBorder :text="'监督学习'"></RectangleBorder>
                <RectangleBorder :text="'无监督学习'"></RectangleBorder>
                <RectangleBorder :text="'强化学习'"></RectangleBorder>
              </div>
              <div>{{ usedatas[0].intro2 }}</div>
            </div>
            <div class="con" v-for="(item, key) in usedatas[0].content" :key="key">
              <div class="subtitle"><RectangleBorder :text="item.subtitle"></RectangleBorder></div>
              <div class="text">{{ item.text }}</div>
            </div>
          </div>
          <!-- ChatGPT -->
          <div class="part GPT" style="margin-top: 10px; height: 115px">
            <div class="tit" @click="ExpandEvent2()">
              <ArtWord :text="usedatas[1].title"></ArtWord>
              <div class="tip">点击展开</div>
            </div>
            <div class="content">
              <div class="chapter" v-for="(content, id) in usedatas[1].content" :key="id">{{ content.chapter }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BottomNavigationBar @clickIndex="handleIndex" :navItem="this.navItem" :currentIndex="clickIndex"></BottomNavigationBar>
  </div>
</template>

<script>
import TopNavigationBar from '../TopNavigationBar.vue'
import SideNavigationBar from '../SideNavigationBar.vue'
import BottomNavigationBar from '../BottomNavigationBar.vue'
// import ArrowRight from '../ArrowRight.vue'
// import ArrowCanvasSpecial from './AIdevelopPage/ArrowCanvasSpecial.vue'
import RectangleBorder from './AIdevelopPage/RectangleBorder.vue'

import ArtWord from '../ArtWord.vue'
import TimeNode from './AIdevelopPage/TimeNode.vue'

export default {
  name: 'AIdevelopPage',
  components: {
    TopNavigationBar,
    SideNavigationBar,
    BottomNavigationBar,
    // ArrowRight,
    // ArrowCanvasSpecial,
    RectangleBorder,
    ArtWord,
    TimeNode,
  },
  data() {
    return {
      title: '人工智能',
      subtitle: '',
      switchButton: false,
      // 返回
      backshow: false,
      // 箭头的坐标
      arrowdatas: [
        {
          id: '0',
          length: '430',
          left: '348px',
          top: '150px',
        },
        {
          id: '1',
          length: '405',
          left: '975px',
          top: '150px',
        },
        {
          id: '2',
          length: '372',
          left: '408px',
          top: '550px',
        },
        {
          id: '3',
          length: '100',
          left: '80px',
          top: '550px',
        },
      ],

      // 发展过程数据
      developdatas: [
        {
          year: '1950年',
          thing: '图灵测试机',
          intro: '在1950年，阿兰·图灵提出图灵测试机，大意是将人和机器放在一个小黑屋里与屋外的人对话，如果屋外的人分不清对话者是人类还是机器，那么这台机器就拥有像人一样的智能。',
          introWidth: '500px', //介绍框的长度
          left: '180px',
          top: '130px',
        },
        {
          year: '1956年',
          thing: '达特茅斯会议',
          intro: '在1956年达特茅斯会议上正式提出使用了人工智能这一术语，标志着人工智能学科的诞生。而后人工智能迅速发展，产生了诸多流派。',
          introWidth: '450px',
          left: '780px',
          top: '130px',
        },
        {
          year: ' ',
          thing: '机器学习',
          intro: '机器学习的加入，推着人工智能向更加智能的方向迈进，而后诞生了深度学习、神经网络等诸多概念。',
          introWidth: '400px',
          left: '1383px',
          top: '130px',
        },
        {
          year: ' ',
          thing: '人工智能大爆发',
          intro: '硬件、算法、大数据三个因素在各个领域的突破达到一定程度时，带来了人工智能的大爆发。',
          introWidth: '500px',
          left: '180px',
          top: '530px',
        },
        {
          year: '2016年',
          thing: 'AlpaGO',
          intro: '围棋一直被称为人类与AI对决的最后的阵地，在2016年，AlphaGO战胜人类顶尖的选手，让人工智能进入到大众视野，也证明了AI的强大。',
          introWidth: '450px',
          left: '780px',
          top: '530px',
        },
      ],

      // 拓展介绍
      usedatas: [
        {
          title: '如何训练AI',
          intro1: '人工智能的学习可以分为',
          intro2: '这三种方法常综合使用，用于让AI学习各种技能。',
          content: [
            {
              subtitle: '监督学习',
              text: '监督学习可以理解为给机器题目和答案，当看的足够多时，就能辨认题目和对应答案了，例如给AI一堆动物照片，再告诉它哪个是猫哪个是狗。这种方法常用于训练AI进行识别任务。',
            },
            {
              subtitle: '无监督学习',
              text: '无监督学习可以理解为在一堆数据中，AI根据不同的特征将相似的东西分为一组，例如给AI一堆动物照片，但是不告诉它什么是什么，让AI通过关键词进行分类，关键词可以是动物颜色，动物耳朵等特征。这种方法适用于训练AI从一堆东西中寻找隐藏规律。',
            },
            {
              subtitle: '强化学习',
              text: '强化学习指通过AI直接与环境进行互动，通过环境给出的奖惩来学习，通过一系列动作获得最大的奖励，在互动的过程中，AI会不断调整自己的行为，对环境变化做出最佳的应对，这种方法适用于训练行为，如玩游戏，自动驾驶等。',
            },
          ],
        },
        {
          title: 'ChatGPT到底是什么',
          content: [
            {
              chapter:
                '         从原理上来讲，ChatGPT 其实也不是新事物，它背后的基础，是母公司 OpenAI 在几年前发布的自然语言模型 GPT。OpenAI 于 2018 年发布了 GPT-1，首次让人工智能能够让人类一样「理解文字」、写出文字。随后几年里，OpenAI 陆续   推出了 GPT-2、GPT-3，用更庞大的参数实现了更精细的学习。通俗来说，就是让人工智能更「像人」了。',
            },
            {
              chapter:
                '         所以它才叫 ChatGPT，也就是「可以聊天的 GPT」。那么，GPT 又是什么呢？它的全称是 Generative Pre-trained Transformer，生成式预训练转换器。简单来说，它的原理是：先给它提供一个庞大的语料库（通常是直接从互联网上抓取），让模型通过上千亿个参数对这些文本进行打散、标记、学习，构建起一个复杂的预测模型。然后再依据这个预测模型，判断一个单词在这个情境下应该接哪一个单词。就这样一个一个单词串起来，形成一段话，或者一篇文章。',
            },
            {
              chapter:
                '         这种预测的模式，其实跟我们大脑的学习和加工模式是非常相似的。因此，这也是它能够更「像人」的一个重要原因。我们可以用三层模型来理解：这个模型背后无需人工参与的「无监督」式预训练自学习原理，或者说让模型像大脑「自由生长」的过程，就是它的动力层；借由这个原理所完成的 GPT-3.5，就是一个结构层，是 ChatGPT 起作用的主要基础，而对这个 GPT-3.5 进行包装、优化所形成的 ChatGPT，就是一个交互层，它的本质就是加了一层更友好的用户界面和交互方式，让个人用户能够更容易地应用它。',
            },
          ],
        },
      ],

      // 底部导航栏
      navItem: [
        { label: '发展过程', selected: true },
        { label: '拓展介绍', selected: false },
      ],
      // 第一个介绍框是否展开
      Expanded: false,

      // 当前所在的页数
      clickIndex: 1,
    }
  },
  computed: {
    // 实时监测底部导航栏点击事件的变化
    Index() {
      return -this.clickIndex * 1920
    },
  },
  methods: {
    // 接收子组件的值，导航栏点击事件
    handleIndex(val) {
      setTimeout(() => {
        this.clickIndex = val
        //   console.log(this.clickIndex)
      }, 300)
    },
    // 点击后展开
    ExpandEvent1() {
      const part1 = document.querySelector('.AI')
      const part2 = document.querySelector('.GPT')
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
      const part1 = document.querySelector('.AI')
      const part2 = document.querySelector('.GPT')
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
    if (subnav === '拓展介绍+') {
      this.Expanded = false
      setTimeout(() => {
        this.ExpandEvent2()
      }, 100)
      this.clickIndex = 1
      this.navItem[1].selected = true
    }
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
  }

  .expand {
    height: 100%;
    padding: 30px 0;
    margin-left: 30px;
    transition: all 0.5s;
    .part {
      border: 5px dashed rgba(166, 166, 166, 1);
      width: 1820px;
      margin: 0 auto;
      padding: 0 80px 0 50px;
      overflow: hidden;

      transition: all 0.5s;
      .tit {
        display: flex;
        position: relative;
        width: 100%;
        padding: 0px 0 10px 20px;
        cursor: pointer;
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
      .intro {
        display: flex;
        font-size: 30px;
        height: 70px;
        line-height: 70px;
        color: #fff;
        margin-bottom: 40px;
        .ot {
          display: flex;
        }
      }
      .con {
        display: flex;
        margin-bottom: 30px;
        .subtitle {
          width: 15%;
        }
        .text {
          width: 85%;
          font-size: $text-size;
          color: #fff;
          line-height: 50px;
        }
      }
      .content {
        overflow: auto;
      }
      .chapter {
        padding: 0 0 20px 40px;
        text-indent: 2em;
        width: 100%;
        font-size: $text-size;
        color: #fff;
        line-height: 45px;
      }
    }
  }
  .AI {
    height: 715px;
  }
  .GPT {
    height: 115px;
  }
}
</style>
