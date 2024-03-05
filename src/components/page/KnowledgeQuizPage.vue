<template>
  <!-- 题库 页面 -->
  <!-- 这里没什么好看的，你可能看不太明白，毕竟是屎山代码 -->
  <div id="app">
    <!-- 侧边栏导航 -->
    <SideNavigationBar style="z-index: 99"></SideNavigationBar>
    <!-- 顶部导航栏 -->
    <TopNavigationBar @backtonav="handleback" :sub="this.sub" :backShow="true" :title="title"></TopNavigationBar>
    <div class="body" :style="{ left: Index + 'px' }">
      <!-- 题库 -->
      <div class="sec" style="padding: 25px 0 0 200px">
        <RectangleLongStrange class="rectanglestrange"></RectangleLongStrange>
        <div class="movebox">
          <!-- 目录 -->
          <div class="expand" style="margin-top: 20px">
            <div class="cate">
              <div class="rank" style="position: absolute; left: 370px; top: 135px">分类</div>
              <div class="lev1 level">
                <div class="catebutton" v-for="(bank, id) in categories" :key="id" :class="{ categoryChoice: id == this.bankIndex }" @click="categoryClick(1, id)" :style="{ color: bank.color ? bank.color : '' }">{{ bank.bank }}</div>
              </div>
              <div class="lev2 level">
                <div class="catebutton" v-for="(subbank, id) in categories[this.bankIndex].subbank" :key="id" :class="{ categoryChoice: id == this.subbankIndex }" @click="categoryClick(2, id)" :style="{ color: subbank.color ? subbank.color : '' }">{{ subbank.text }}</div>
              </div>
              <div class="lev3 level" v-if="categories[this.bankIndex].subbank[this.subbankIndex].title[0].text != ''">
                <div
                  class="catebutton"
                  v-for="(title, id) in categories[this.bankIndex].subbank[this.subbankIndex].title"
                  :key="id"
                  :class="{ categoryChoice: id == this.titleIndex && this.subbankIndex == 0 && this.bankIndex == 0 }"
                  @click="categoryClick(3, id)"
                  :style="{ color: title.color ? title.color : '' }"
                >
                  {{ title.text }}
                </div>
              </div>
              <div class="lev4 level" v-if="categories[this.bankIndex].subbank[this.subbankIndex].title[this.titleIndex].subtitle[0].text != ''">
                <div
                  class="catebutton"
                  v-for="(subtitle, id) in categories[this.bankIndex].subbank[this.subbankIndex].title[this.titleIndex].subtitle"
                  :key="id"
                  :class="{ categoryChoice: id == this.subtitleIndex && this.titleIndex == 1 }"
                  @click="categoryClick(4, id)"
                  :style="{ color: subtitle.color ? subtitle.color : '' }"
                >
                  {{ subtitle.text }}
                </div>
              </div>
              <div class="lev5 level" v-if="categories[this.bankIndex].subbank[this.subbankIndex].title[this.titleIndex].subtitle[this.subtitleIndex].category.length != 0">
                <div class="catebutton" v-for="(category, id) in categories[this.bankIndex].subbank[this.subbankIndex].title[this.titleIndex].subtitle[this.subtitleIndex].category" :key="id" @click="categoryClick(5, id, category.text)" :style="{ color: category.color ? category.color : '' }">
                  {{ category.text }}
                </div>
              </div>
              <div class="start" @click="startClick()" :class="{ startSellected: isCategory }">{{ startWords }}</div>
              <div class="random" @click="categoryClick(0, -1)" style="">随机抽取</div>
            </div>
          </div>
          <!-- 题目 -->
          <div class="expand">
            <div class="testBox">
              <div class="testContent" v-if="this.iscateShow">
                <transition name="fade" mode="out-in">
                  <div class="tests" :key="currentQuestionKey">
                    <div class="content">{{ currentQuestion.content }}</div>
                    <div class="options">
                      <div v-for="(option, index) in currentQuestion.options" :key="index" class="option" style="display: flex; margin-bottom: 30px">
                        <div class="circle" :style="{ opacity: this.analyse ? '0' : '1' }">{{ String.fromCharCode(65 + index) }}.{{ option }}</div>
                        <div class="analys" :style="{ opacity: this.analyse ? '1' : '0' }">
                          <div class="answ">正确答案：{{ currentQuestion.correct }}.{{ currentQuestion.options[correctedNumber] }}</div>
                          <div class="answ">答案解析：{{ currentQuestion.analyse }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="choice">
                      <div class="cho" v-for="(option, index) in currentQuestion.options" :key="index" @click="choiceClick(index)">
                        {{ String.fromCharCode(65 + index) }}
                      </div>
                    </div>
                    <div class="title">
                      {{ currentQuestion.bank }}-{{ currentQuestion.subbank }}<span v-if="currentQuestion.title">-{{ currentQuestion.title }}</span
                      ><span v-if="currentQuestion.subtitle">-{{ currentQuestion.subtitle }}</span
                      ><span v-if="currentQuestion.category">-{{ currentQuestion.category }}</span>
                    </div>
                    <div class="jump" @click="jumpClick()" style="">下一题</div>
                    <div class="collect"><img :src="collected ? collect[0].img : collect[1].img" alt="" @click="collectFunc(currentQuestion.content)" /></div>
                    <div class="trueOrfa"><span v-if="this.right">正确</span><span v-if="!this.right">错误</span></div>
                    <ArtWord :text="'错题回顾'" v-if="this.fromMistake" :vertical="true" style="position: absolute; left: -350px; top: -50px; z-index: 99"></ArtWord>
                  </div>
                </transition>
              </div>
              <!-- 答题报告 -->
              <div class="report" v-if="!this.iscateShow" style="padding: 100px 0px">
                <div class="result">恭喜你完成所有试题</div>
                <div class="contentqp">
                  <div class="qp">题库内共有{{ this.correctNumber }}道试题，答对{{ this.correctNumber - this.mistakeCollection.length }}道，答错{{ this.mistakeCollection.length }}道</div>
                  <div class="qp">正确率{{ resultPercent }}%</div>
                  <div class="qp">
                    <span v-if="this.mistakeCollection.length != 0">您可以选择重做错题或者返回目录重新开始小测</span>
                    <span v-if="this.mistakeCollection.length == 0">没有错题，您可以选择返回目录重新开始小测</span>
                  </div>
                  <div class="buttonqp">
                    <div v-if="this.mistakeCollection.length != 0">
                      <WhiteBoxBorder class="whitebox" :content="'重做错题'" @click="redoMistakeTest()"></WhiteBoxBorder>
                    </div>
                    <div>
                      <WhiteBoxBorder class="whitebox" :content="'返回目录'" @click="backToNav()"></WhiteBoxBorder>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 收藏本 -->
      <div class="sec">
        <div class="collectionbox">
          <div class="collectCard" v-for="(item, id) in collectionData" :key="id">
            <div @click="gotoTest(item.content)">{{ item.content }}</div>
            <img :src="item.collected ? collect[0].img : collect[1].img" alt="" @click="collectRecordFunc(id)" style="width: 45px; cursor: pointer" />
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
import RectangleLongStrange from './SDIntroPage/RectangleLongStrange.vue'
import WhiteBoxBorder from './KnowledgeQuiz/WhiteBoxBorder.vue'
import ArtWord from '../ArtWord.vue'
import { getTestsDatas } from '@/api/localAPI'

// 题目记录&收藏记录的持久存储
import { mapState, mapActions } from 'vuex'
export default {
  name: 'KnowledgeQuizPage',
  components: {
    TopNavigationBar,
    SideNavigationBar,
    BottomNavigationBar,
    RectangleLongStrange,
    WhiteBoxBorder,
    ArtWord,
  },
  data() {
    return {
      title: '知识小测',
      subtitle: '',

      // 所有的题目
      testDataAll: [],
      // 用户选出来的题目
      testData: [],
      // 跳过的题目
      jumpNumber: 0,

      sub: 'KQ',

      //  错题集
      mistakeCollection: [],
      iscateShow: true,

      // 是否在练习页面，否则当前在目录页面

      // 分类目录
      bankIndex: 0,
      subbankIndex: 0,
      titleIndex: 0,
      subtitleIndex: 0,
      categoryIndex: 0,
      startWords: '开始答题',
      // 是否已经选择响应的题目
      isCategory: false,

      // 练习题
      //  是否选中
      selectedOptionIndex: {},
      //   追踪当前显示的题目索引
      currentQuestionIndex: 0,
      nextButtonText: '下一题',
      // 是否收藏
      // collected: false,
      // ABCD当前选项
      currentOption: -1,
      // 选项已经提交
      choiced: false,
      // 错误时显示解析
      analyse: false,
      // 复习知识点
      // reviewed: false,
      // 是否从收藏本跳转而来
      fromCollect: false,
      // ABCD所选的选项是否正确
      right: true,
      // 是否为重做错题
      fromMistake: false,

      // 收藏图标
      collect: [
        {
          img: 'https://img.js.design/assets/img/64d8f2b2caf7607c916cfd7d.png#46408a8cdedc37fb56b0a349c14de06b',
        },
        {
          img: 'https://img.js.design/assets/img/64d8f2ad9b0705d42a039c56.png#69f2c88a1bb01809d4dc3ccd92d0bcef',
        },
      ],

      // 分类
      categories: [
        {
          bank: '原理',
          subbank: [
            {
              text: '知识点',
              title: [
                {
                  text: '人工智能',
                  subtitle: [
                    {
                      text: '发展历程',
                      category: [],
                      color: '#fff',
                    },
                    {
                      text: '拓展介绍',
                      category: [],
                      color: '#fff',
                    },
                  ],
                },
                {
                  text: 'AI绘画',
                  subtitle: [
                    {
                      text: '入门原理',
                      category: [
                        {
                          text: '绘制过程',
                          color: '#fff',
                        },
                        {
                          text: '使用原理',
                          color: '#fff',
                        },
                      ],
                    },
                    {
                      text: '进阶原理',
                      category: [
                        {
                          text: '提示词',
                          color: '#fff',
                        },
                        {
                          text: '噪声图',
                          color: '#fff',
                        },
                        {
                          text: '前向扩散',
                          color: '#fff',
                        },
                        {
                          text: '后向扩散',
                          color: '#fff',
                        },
                        {
                          text: '采样图',
                          color: '#fff',
                        },
                        {
                          text: 'U-Net模型',
                          color: '#fff',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              text: '测试',
              title: [
                {
                  text: '1',
                  color: '#fff',
                  subtitle: [
                    {
                      text: '',
                      category: [],
                    },
                  ],
                },
                {
                  text: '2',
                  color: '#fff',
                  subtitle: [
                    {
                      text: '',
                      category: [],
                    },
                  ],
                },
                {
                  text: '3',
                  color: '#fff',
                  subtitle: [
                    {
                      text: '',
                      category: [],
                    },
                  ],
                },
                {
                  text: '4',
                  color: '#fff',
                  subtitle: [
                    {
                      text: '',
                      category: [],
                    },
                  ],
                },
                {
                  text: '5',
                  color: '#fff',
                  subtitle: [
                    {
                      text: '',
                      category: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          bank: '实操',
          subbank: [
            {
              text: '测试',
              title: [
                {
                  text: '1',
                  color: '#fff',
                  subtitle: [
                    {
                      text: '',
                      category: [],
                    },
                  ],
                },
                {
                  text: '2',
                  color: '#fff',
                  subtitle: [
                    {
                      text: '',
                      category: [],
                    },
                  ],
                },
                {
                  text: '3',
                  color: '#fff',
                  subtitle: [
                    {
                      text: '',
                      category: [],
                    },
                  ],
                },
                {
                  text: '4',
                  color: '#fff',
                  subtitle: [
                    {
                      text: '',
                      category: [],
                    },
                  ],
                },
                {
                  text: '5',
                  color: '#fff',
                  subtitle: [
                    {
                      text: '',
                      category: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],

      // 收藏题目笔记本
      collectionData: [],

      // 底部导航栏
      navItem: [
        { label: '题库', selected: true },
        { label: '收藏本', selected: false },
      ],
      clickIndex: 0,
    }
  },
  watch: {
    // 监听 collectionData 的变化，并将变化赋给vuex中的collection
    collectionData: {
      handler(newCollect) {
        // 在 collect 变化时，更新 collections
        this.$store.commit('setCollections', newCollect)
        // console.log(this.collections)
        // console.log('这是watch函数')
      },
      deep: true, // 使用 deep 选项，使其深度监听
    },
    // categories: {
    //   handler(newTestRecording) {
    //     // 在 testRecording 变化时，处理相关逻辑
    //     this.$store.commit('setTestRecording', newTestRecording)
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    // 在组件创建时调用 action 来获取并设置 collections
    this.fetchAndSetCollections()
    // 初始化 collect 与 collections 相同的值
    this.collectionData = [...this.collections] // 或者 this.collect = this.collections.slice();
    // console.log(this.collectionData)
    // console.log('这是新的')

    // this.fetchAndSetData()
    // this.categories = [...this.testRecording]
  },
  computed: {
    // vuex的持久存储
    ...mapState(['collections', 'testRecording']),
    // 实时监测改值的变化
    Index() {
      return -this.clickIndex * 1920
    },
    currentQuestion() {
      return this.testData[this.currentQuestionIndex] || {}
    },
    currentQuestionKey() {
      return this.currentQuestionIndex
    },
    correctedNumber() {
      // 使用一个映射将字母选项转换为数字
      const letterToNumberMap = {
        A: '0',
        B: '1',
        C: '2',
        D: '3',
      }
      return letterToNumberMap[this.currentQuestion.correct]
    },
    // 是否收藏
    collected() {
      for (var i = 0; i < this.collectionData.length; i++) {
        if (this.collectionData[i].content === this.currentQuestion.content) {
          return true
        }
      }
      return false
    },
    // 答题报告正确题数
    correctNumber() {
      return this.testData.length - this.jumpNumber
    },
    // 答题报告正确率百分比
    resultPercent() {
      const result = 100 - (this.mistakeCollection.length / this.correctNumber) * 100
      return result.toFixed(1)
    },
  },
  methods: {
    ...mapActions(['fetchAndSetCollections']),
    // 接收底部导航栏的值，
    handleIndex(val) {
      this.clickIndex = val
      this.deleteCollect()
      // console.log(this.clickIndex)
    },

    // 目录功能function
    // 开始答题
    startClick() {
      if (this.isCategory) {
        this.gotoTest()
        this.startWords = '继续答题'
      }
    },
    // 重置
    reset() {},
    // 跳转至习题
    gotoTest(content = '') {
      this.clickIndex = 0
      // 收藏记录本跳转至题目的功能
      if (content.length != '') {
        for (var i = 0; i < this.testDataAll.length; i++) {
          if (this.testDataAll[i].content === content) {
            this.testData = []
            this.currentQuestionIndex = 0
            this.testData.push(this.testDataAll[i])
            this.fromCollect = true
            this.mistakeCollection = []
            this.fromMistake = false
            this.jumpNumber = 0
            break
          }
        }
      }
      const movebox = document.querySelector('.movebox')
      movebox.style.transform = 'translateY(-50%)'
      this.sub = 'KQN'
      console.log(this.testData)
    },
    // 点击目录
    categoryClick(id, index, category = '') {
      this.currentQuestionIndex = 0
      this.jumpNumber = 0
      this.fromCollect = false
      this.mistakeCollection = []
      this.fromMistake = false
      this.testData = []
      this.isCategory = false

      if (id == 1) {
        this.bankIndex = index
        this.subbankIndex = 0
        this.titleIndex = 0
        this.subtitleIndex = 0
        this.categoryIndex = 0
      } else if (id == 2) {
        this.subbankIndex = index
        this.titleIndex = 0
        this.subtitleIndex = 0
        this.categoryIndex = 0
      } else if (id == 3) {
        this.titleIndex = index
        this.subtitleIndex = 0
        this.categoryIndex = 0
        var count = 0
        if (this.bankIndex == 1) {
          for (const question of this.testDataAll) {
            // 一级标题“实操”
            if (question.bank === '实操') {
              if (count === index) {
                this.isCategory = true
                this.testData.push(question)
              }
              count++
            }
          }
        } else if (this.bankIndex == 0 && this.subbankIndex == 1) {
          for (const question of this.testDataAll) {
            // “原理”下的二级标题“测试”
            if (question.bank === '原理' && question.subbank === '测验') {
              if (count === index) {
                this.isCategory = true
                this.testData.push(question)
              }
              count++
            }
          }
        }
        console.log(count)
      } else if (id == 4) {
        this.subtitleIndex = index
        this.categoryIndex = 0
        if (this.titleIndex == 0 && this.subtitleIndex == 0) {
          for (const question of this.testDataAll) {
            // “原理”下的“知识点”的“人工智能”下的四级标题“发展历程” & “拓展介绍”
            if (question.subtitle === '发展历程') {
              this.isCategory = true
              this.testData.push(question)
            }
          }
        } else if (this.titleIndex == 0 && this.subtitleIndex == 1) {
          for (const question of this.testDataAll) {
            if (question.subtitle === '拓展介绍') {
              this.isCategory = true
              this.testData.push(question)
            }
          }
        }
      } else if (id == 5) {
        this.categoryIndex = index
        if (this.titleIndex == 1) {
          for (const question of this.testDataAll) {
            if (question.category === category) {
              this.isCategory = true
              this.testData.push(question)
            }
          }
        }
      } else if (id == 0) {
        var testNumber = Math.floor(Math.random() * 11) + 10
        console.log(testNumber)
        this.testData = []
        console.log(this.testData)

        setTimeout(() => {
          for (var i = 0; i < testNumber; i++) {
            this.isCategory = true
            // 随机生成数字
            const randomNumber = Math.floor(Math.random() * (20 - i))
            var j = 0
            for (j = 0; j < this.testData.length; j++) {
              if (this.testData[j].id === this.testDataAll[randomNumber].id) {
                break
              }
            }
            if (j === this.testData.length) {
              this.testData.push(this.testDataAll[randomNumber])
            }
          }

          console.log(this.testData)
          console.log('this')
        }, 100)
      }
    },

    // 习题功能function
    // 下一题
    nextQuestion() {
      this.right = true

      this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.testdata.length // 切换到下一题
    },
    // 选项ABCD
    choiceClick(index) {
      const choice = document.querySelectorAll('.cho')
      const option = document.querySelectorAll('.circle')
      const trueOrfa = document.querySelector('.trueOrfa')

      const currentOp = option[index]
      const currentChoice = choice[index]
      const correctChoice = choice[this.correctedNumber]
      if (currentChoice.innerHTML == '提交' && index == this.currentOption) {
        this.choiced = true
        correctChoice.innerHTML = '下一题'
        trueOrfa.style.opacity = '1'
        if (index == this.correctedNumber) {
          this.right = true
          correctChoice.style.background = 'rgba(67, 207, 124, 0.3)'
          this.testDataAll[this.currentQuestion.id].status = 0
        } else {
          this.right = false
          correctChoice.style.background = 'rgba(212, 48, 48, 0.3)'
          currentChoice.innerHTML = '复习知识点'
          currentChoice.style.background = 'rgba(67, 207, 124, 0.3)'
          this.analyse = true
          this.mistakeCollection.push(this.currentQuestion)
          this.testDataAll[this.currentQuestion.id].status = 1

          // console.log(currentChoice.innerHTML)
        }
        console.log(this.testDataAll[this.currentQuestion.id].status)
      } else if (currentChoice.innerHTML == '复习知识点') {
        // 显示复习知识点
        this.$router.push({ name: this.currentQuestion.routeName, query: { subnav: this.currentQuestion.subnav, backshow: true } })
      } else if ((index == this.correctedNumber && correctChoice.innerHTML == '下一题') || index == 99) {
        // 下一题
        this.analyse = false
        this.currentQuestionIndex++
        this.choiceRenew()
        this.collected = false
        // 题目做完，显示报告
        if (this.currentQuestionIndex === this.testData.length) {
          this.gotoReport()
        }
      } else if (!this.choiced) {
        this.choiceRenew()
        currentChoice.innerHTML = '提交'
        // console.log(currentChoice.innerHTML)
        this.currentOption = index
        // console.log(this.currentOption)
        currentChoice.style.background = 'rgba(0, 0, 0, 0.3)'
        currentOp.style.color = 'rgba(105, 255, 246, 1)'
      }
      // console.log(this.currentQuestionIndex)
      // console.log(this.testData)
    },
    // 答题报告
    gotoReport() {
      this.iscateShow = false
    },
    // 返回至目录
    backToNav() {
      const movebox = document.querySelector('.movebox')
      movebox.style.transform = 'translateY(0%)'
      this.sub = 'KQ'
      this.iscateShow = true
      // console.log(this.sub)
      if (this.fromCollect) {
        this.clickIndex = 1
        this.fromCollect = false
      }
      this.mistakeCollection = []
      this.isCategory = false
      this.fromMistake = false
      this.renewCatalogue()
      console.log(this.categories)
      console.log('category')
    },
    // 重置ABCD所有选项及其属性
    choiceRenew() {
      const choice = document.querySelectorAll('.cho')
      const option = document.querySelectorAll('.circle')
      for (var i = 0; i < choice.length; i++) {
        choice[i].innerHTML = String.fromCharCode(65 + i)
        choice[i].style.background = 'transparent'
        option[i].style.color = '#fff'
      }
      this.currentOption = -1
      this.choiced = false
      this.analyse = false
    },
    // 跳过该题按钮
    jumpClick() {
      if (!this.choiced) {
        this.jumpNumber++
        this.testData.push(this.currentQuestion)
      }
      console.log(this.testData)
      this.currentQuestionIndex++
      this.choiceRenew()
      this.collected = false

      // 题目做完，显示报告
      if (this.currentQuestionIndex === this.testData.length) {
        this.gotoReport()
      }
    },
    // 从题库页面返回目录页面，获取响应的值
    handleback(val) {
      if (val) {
        this.backToNav()
      }
    },
    // 重做错题，将数据重置
    redoMistakeTest() {
      this.iscateShow = true
      this.testData = this.mistakeCollection
      console.log(this.testData)
      this.currentQuestionIndex = 0
      this.mistakeCollection = []
      this.fromMistake = true
      this.jumpNumber = 0
    },

    // 记录本中收藏
    collectRecordFunc(index) {
      console.log(index)
      if (this.collectionData[index].collected == true) {
        this.collectionData[index].collected = false
      } else {
        this.collectionData[index].collected = true
      }
      // 取消收藏，星星为空心
    },
    // 而后删除记录，需要在离开“记录本”后删除记录，而不是当前立即删除
    deleteCollect() {
      for (var i = 0; i < this.collectionData.length; i++) {
        if (this.collectionData[i].collected == false) {
          this.collectionData.splice(i, 1)
        }
      }
    },
    // 题库中收藏功能function
    collectFunc(content) {
      // 新的content项
      var id = 0
      for (var j = 0; j < this.testDataAll.length; j++) {
        if (content === this.testDataAll[j].content) {
          id = j
          break
        }
      }
      console.log(id)

      // 是否已被收藏
      var collected = false
      for (var i = 0; i < this.collectionData.length; i++) {
        if (this.collectionData[i].content === this.testDataAll[id].content) {
          collected = true
          this.collectionData.splice(i, 1)
        }
      }

      if (!collected) {
        const newContent = {
          id: this.testDataAll[id].id,
          content: this.testDataAll[id].content,
          collected: true,
        }
        this.collectionData.push(newContent)
      }
      console.log(this.collectionData)
    },

    // 底部导航的显示
    bottomNav(subnav) {
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
    // 按照正确/错误/未做题显示颜色
    renewCatalogue() {
      for (var i = 0; i < this.testDataAll.length; i++) {
        if (i < 2) {
          if (this.testDataAll[i].status == 1) {
            this.categories[0].subbank[0].title[0].subtitle[i].color = '#D43030'
          } else if (this.testDataAll[i].status == 0) {
            this.categories[0].subbank[0].title[0].subtitle[i].color = '#69FFF6'
          }
        } else if (i < 4 && 1 < i) {
          if (this.testDataAll[i].status == 1) {
            this.categories[0].subbank[0].title[1].subtitle[0].category[i - 2].color = '#D43030'
          } else if (this.testDataAll[i].status == 0) {
            this.categories[0].subbank[0].title[1].subtitle[0].category[i - 2].color = '#69FFF6'
          }
        } else if (i < 10 && i > 3) {
          if (this.testDataAll[i].status == 1) {
            this.categories[0].subbank[0].title[1].subtitle[1].category[i - 4].color = '#D43030'
          } else if (this.testDataAll[i].status == 0) {
            this.categories[0].subbank[0].title[1].subtitle[1].category[i - 4].color = '#69FFF6'
          }
        } else if (i < 15 && i > 9) {
          if (this.testDataAll[i].status == 1) {
            this.categories[0].subbank[1].title[i - 10].color = '#D43030'
          } else if (this.testDataAll[i].status == 0) {
            this.categories[0].subbank[1].title[i - 10].color = '#69FFF6'
          }
        } else {
          if (this.testDataAll[i].status == 1) {
            this.categories[1].subbank[0].title[i - 15].color = '#D43030'
          } else if (this.testDataAll[i].status == 0) {
            this.categories[1].subbank[0].title[i - 15].color = '#69FFF6'
          }
        }
      }
    },
  },
  created() {
    // 获取传过来的值，标题以及副标题
    this.subtitle = this.$route.query.subtitle
    const subnav = this.$route.query.subnav
    this.switchButton = this.$route.query.switchButton
    this.bottomNav(subnav)

    // 初始化题库数据
    getTestsDatas().then(response => {
      this.testDataAll = response
      console.log(response)
    })
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
    overflow: hidden;

    .collectionbox {
      overflow: auto;
      height: 900px;
      padding-bottom: 35px;
      .collectCard {
        position: relative;
        margin: 0 auto;
        width: 1600px;
        height: 115px;
        margin-top: 55px;
        line-height: 115px;
        color: #fff;
        font-size: 36px;
        padding: 0 35px;
        border: 4px solid rgba(255, 255, 255, 1);
        div {
          cursor: pointer;
        }

        img {
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .expand {
      z-index: 20 !important;
      margin: 9px 0 0 200px;
      .testBox {
        padding-left: 100px;
      }
    }
    .movebox {
      width: 100%;
      height: 1800px;
      transition: all 0.25s;
      position: absolute;
      left: -120px;
      top: 0px;
      .expand {
        height: 50%;
        .cate {
          position: relative;
          width: 1350px;
          height: 800px;
          padding: 90px 0 0 300px;
          color: #fff;
          font-size: 36px;
          .start {
            margin: 50px 0 0 425px;
            border: 4px solid #cccccc;
            color: #cccccc;
            width: 250px;
            height: 75px;
            line-height: 70px;
            text-align: center;
            cursor: not-allowed;
            transition: all 0.25s;
          }
          .startSellected {
            border: 4px solid #fff;
            color: #fff;
            cursor: pointer;
          }
          .random {
            width: 65px;
            height: fit-content;
            padding: 25px 15px;
            text-align: center;
            border: 4px solid rgba(105, 255, 246, 1);
            font-size: 30px;
            cursor: pointer;
            position: absolute;
            right: -375px;
            top: 10px;
          }
          .level {
            display: flex;
            padding: 45px 0 5px 0;
            width: 1200px;
            font-size: 30px;
            border-bottom: 2px solid rgba(166, 166, 166, 1);
            flex-wrap: wrap;
            .catebutton {
              width: 235px;
              transition: all 0.25s;
              min-height: 53px;
              transform-origin: center center;
              cursor: pointer;
              &:first-child {
                margin-left: 235px;
              }
            }
          }
          .lev3 {
            padding: 0;
            .catebutton {
              margin-top: 30px;
              &:nth-child(5) {
                margin-left: 235px;
              }
            }
          }
          .lev5 {
            padding: 0;
            .catebutton {
              margin-top: 30px;
              &:nth-child(5) {
                margin-left: 235px;
              }
            }
          }
        }
        .testBox {
          position: relative;
          .testContent {
            width: 1350px;
            height: 800px;
            padding: 90px 0 0 250px;
            .tests {
              color: #fff;
              font-size: 36px;
              position: relative;
              .content {
                margin-bottom: 22px;
                height: 106px;
              }
              .options {
                margin-bottom: 120px;
                height: 305px;
                .circle {
                  transition: all 0.25s;
                }
                .analys {
                  transition: all 0.25s;
                  position: absolute;
                  font-size: 34px;
                  left: 10px;
                  top: 130px;
                  font-weight: normal;
                }
              }
              .choice {
                display: flex;
                margin-bottom: 20px;
                border: 4px solid rgba(255, 255, 255, 1);
                width: fit-content;
                .cho {
                  border-right: 4px solid rgba(255, 255, 255, 1);
                  text-align: center;
                  height: 75px;
                  width: 245px;
                  line-height: 75px;
                  transition: all 0.25s;
                  cursor: pointer;
                }
              }
              .title {
                font-size: 30px;
                color: rgba(229, 229, 229, 1);
                margin-left: 440px;
                width: 550px;
                text-align: right;
                transition: all 0.25s;
              }
              .jump {
                width: 65px;
                height: 195px;
                position: absolute;
                right: -270px;
                top: -83px;
                padding: 25px 15px;
                text-align: center;
                border: 4px solid rgba(105, 255, 246, 1);
                font-size: 30px;
                cursor: pointer;
              }
              .trueOrfa {
                position: absolute;
                right: 150px;
                bottom: 175px;
                font-size: 72px;
                color: rgba(105, 255, 246, 1);
                opacity: 0;
                transition: all 0.25s;
              }
              .collect {
                position: absolute;
                right: -262px;
                top: 135px;
                img {
                  width: 45px;
                  cursor: pointer;
                }
              }
            }
          }
          .report {
            width: 1600px;
            font-size: 36px;
            color: #fff;
            .result {
              font-size: 42px;
              text-align: center;
              padding-bottom: 80px;
            }
            .contentqp {
              width: 760px;
              margin: 0 auto;
              line-height: 75px;
            }
            .buttonqp {
              display: flex;
              justify-content: space-around;
              margin-top: 100px;
              .whitebox {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .line {
    border-bottom: 2px solid rgba(166, 166, 166, 1);
    .but {
      width: 235px;
    }
  }
  .categoryChoice {
    color: rgba(105, 255, 246, 1);
    font-size: 36px;
  }
}
</style>
