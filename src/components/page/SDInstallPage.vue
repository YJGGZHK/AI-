<template>
  <!-- Stable Diffusion Webui“本地安装”页面 -->
  <!-- Stable Diffusion Webui -> 进阶原理 -> 本地安装 -->
  <div id="app">
    <!-- 侧边栏导航 -->
    <SideNavigationBar style="z-index: 999"></SideNavigationBar>
    <!-- 顶部导航栏 -->
    <TopNavigationBar :titleSize="42" :sub="'SDUpgrade'" :backShow="true" :title="title" :moTitle="'本地搭建'"></TopNavigationBar>
    <!-- body -->
    <div class="body" :style="{ left: Index + 'px' }">
      <!-- 1. 安装Git -->
      <div class="sec">
        <div class="moveboxA">
          <div class="expand">
            <SDInstallTitle :numberImg="LocalInstall[0].numberImg" :title="LocalInstall[0].title"></SDInstallTitle>
            <div class="seccommon a">
              <img :src="LocalInstall[0].introImg1" alt="" />
              <BoxWord :boxword="LocalInstall[0].tips" :wordSize="24" :wordCenter="true" :wordMarginTop="25"></BoxWord>
              <BoxWord :boxword="LocalInstall[0].intro" :wordMarginTop="25" :wordSize="30" :lineHeight="1.75"></BoxWord>
            </div>
          </div>
          <div class="expand qwe">
            <div class="conbox">
              <BoxWord :boxword="LocalInstall[0].contentTitle" :textIndent="false" :wordSize="36"></BoxWord>
              <BoxWord :boxword="LocalInstall[0].content" :boxWidth="1600" :wordSize="30" :lineHeight="1.75" :wordMarginTop="15"></BoxWord>
            </div>
          </div>
        </div>
        <div class="SideButton" style="position: absolute; height: 900px; padding-top: 450px; right: 10px; top: 0; font-size: 24px; width: 40px; text-align: center">
          <div class="clic" @click="exchangeGit()">
            <div class="trri" :class="{ left: this.isGit }"></div>
            <div class="buto" style="transform: translateY(-62%); margin: auto; color: #fff; cursor: pointer">{{ installGitCh }}</div>
          </div>
        </div>
      </div>
      <!-- 2. 安装python  -->
      <div class="sec">
        <div class="moveboxB">
          <div class="expand">
            <SDInstallTitle :numberImg="LocalInstall[1].numberImg" :title="LocalInstall[1].title"></SDInstallTitle>
            <div class="seccommon b">
              <img :src="LocalInstall[1].introImg1" alt="" />
              <div class="Bboxword" style="font-size: 24px">
                <div>{{ LocalInstall[1].tips[0].text }}</div>
                <div>{{ LocalInstall[1].tips[1].text }}</div>
              </div>
              <BoxWord :boxword="LocalInstall[1].intro" :wordMarginTop="20" :boxWidth="1600" :lineHeight="1.75"></BoxWord>
            </div>
          </div>
          <div class="expand qwe">
            <div class="conbox">
              <BoxWord :boxword="LocalInstall[1].contentTitle" :textIndent="false" :wordSize="36"></BoxWord>
              <BoxWord :boxword="LocalInstall[1].content" :boxWidth="1600" :wordSize="30" :lineHeight="1.75" :wordMarginTop="15"></BoxWord>
            </div>
          </div>
        </div>

        <div class="SideButton" style="position: absolute; height: 900px; padding-top: 450px; right: 10px; top: 0; font-size: 24px; width: 40px; text-align: center">
          <div class="clic" @click="exchangePython()">
            <div class="trri" :class="{ left: this.isPython }"></div>
            <div class="buto" style="transform: translateY(-62%); margin: auto; color: #fff; cursor: pointer">{{ installPython }}</div>
          </div>
        </div>
      </div>
      <!-- 3. 安装stable-diffusion-webui -->
      <div class="sec">
        <SDInstallTitle :numberImg="LocalInstall[2].numberImg" :title="LocalInstall[2].title"></SDInstallTitle>
        <div class="c">
          <div class="t">
            <div class="image"><img :src="LocalInstall[2].introImg1" alt="" /></div>
            <div>
              <BoxWord :boxword="LocalInstall[2].intro" :textIndent="false" :wordMarginTop="120"></BoxWord>
              <BoxWord :boxword="LocalInstall[2].tips" style="margin-top: 52px" :textIndent="false" :wordSize="30" :lineHeight="1.75" :boxWidth="740"></BoxWord>
            </div>
          </div>
          <img :src="LocalInstall[2].introImg2" alt="" />
        </div>
      </div>
      <!-- 4. 下载model -->
      <div class="sec">
        <SDInstallTitle :numberImg="LocalInstall[3].numberImg" :title="LocalInstall[3].title"></SDInstallTitle>
        <div class="seccommon d">
          <img :src="LocalInstall[3].introImg1" alt="" />
          <BoxWord :boxword="LocalInstall[3].tips" :wordSize="24" :wordCenter="true" :wordMarginTop="20"></BoxWord>
          <BoxWord :boxword="LocalInstall[3].intro" :wordMarginTop="20" :wordSize="30" :lineHeight="1.75"></BoxWord>
        </div>
      </div>
      <!-- 5. 修改webui-user.bat -->
      <div class="sec">
        <SDInstallTitle :numberImg="LocalInstall[4].numberImg" :title="LocalInstall[4].title"></SDInstallTitle>
        <div class="e">
          <div class="t">
            <img :src="LocalInstall[4].introImg1" alt="" />
            <div style="margin-top: 70px">
              <BoxWord :boxword="LocalInstall[4].intro" :textIndent="false" :lineHeight="3"></BoxWord>
            </div>
          </div>
          <img :src="LocalInstall[4].introImg2" alt="" />
        </div>
      </div>
      <!-- 6. 下载依赖，修改launch.py -->
      <div class="sec">
        <SDInstallTitle :numberImg="LocalInstall[5].numberImg" :title="LocalInstall[5].title"></SDInstallTitle>
        <div class="f">
          <BoxWord :boxword="LocalInstall[5].intro" :textIndent="false" style="margin-left: 55px"></BoxWord>
          <div class="more">
            <div class="lf">
              <div><img :src="LocalInstall[5].introImg1" alt="" /></div>
              <div><img :src="LocalInstall[5].introImg2" alt="" class="hov" /></div>
            </div>
            <div class="rt">
              <BoxWord :boxword="LocalInstall[5].tips" :textIndent="false" :boxWidth="920" :wordMarginTop="35"></BoxWord>
            </div>
          </div>
        </div>
      </div>
      <!-- 7. 运行 -->
      <div class="sec">
        <SDInstallTitle :numberImg="LocalInstall[6].numberImg" :title="LocalInstall[6].title"></SDInstallTitle>
        <div class="g">
          <img :src="LocalInstall[6].introImg1" alt="" />
          <BoxWord :boxword="LocalInstall[6].intro" :wordMarginTop="90" :textIndent="false" :boxWidth="1600"></BoxWord>
        </div>
      </div>
    </div>
    <!-- 底部导航栏 -->
    <BottomNavigationBar @clickIndex="handleIndex" :navItem="this.navItem" :gap="330" :currentIndex="this.clickIndex"></BottomNavigationBar>
  </div>
</template>

<script>
import TopNavigationBar from '../TopNavigationBar.vue'
import SideNavigationBar from '../SideNavigationBar.vue'
import BottomNavigationBar from '../BottomNavigationBar.vue'
import SDInstallTitle from './SDInstallPage/SDInstallTitle.vue'
import BoxWord from '../BoxWord.vue'
export default {
  name: 'SDInstallPage',
  components: {
    TopNavigationBar,
    SideNavigationBar,
    BottomNavigationBar,
    SDInstallTitle,
    BoxWord,
  },
  data() {
    return {
      title: 'stable diffusion',
      subtitle: '',

      //   本地搭建
      isGit: false,
      installGitCh: '主要功能',
      isPython: false,
      installPython: '主要功能',
      LocalInstall: [
        {
          id: '1',
          numberImg: 'https://img.js.design/assets/img/64bbde6448740206395d6445.png#d8f8acb541e7714fca6626770b3512df',
          title: '安装Git',
          introImg1: 'https://img.js.design/assets/img/64d59590df9a299b5b4e7658.png#55e81e2433b86cd88a507942f0965cca',
          intro: [
            {
              text: 'Git是一个分布式版本控制系统，它被广泛用于软件开发项目的版本管理。它主要用于跟踪文件的更改、协调多人协作、回退到历史版本以及将更改合并到不同的分支中。',
            },
          ],
          tips: [
            {
              text: 'https://git-scm.com/download/win',
            },
          ],
          contentTitle: [
            {
              text: 'Git的主要功能',
            },
          ],
          content: [
            {
              text: ' 1. 版本控制：Git可以记录文件的每一次更改，包括添加、修改和删除。这使得开发人员可以在需要时回退到之前的版本，或者查看文件的修改历史。         ',
            },
            {
              text: '2. 分支管理：Git允许创建多个分支，每个分支可以独立进行开发工作。这使得团队成员可以并行开展工作，而不会干扰彼此的进展。最终，分支可以合并到主分支中，将不同的开发工作整合在一起。',
            },
            {
              text: '3. 协作与合并：Git使得多人协作变得更加容易。开发人员可以在各自的分支上独立工作，然后将自己的修改合并到共享的代码库中。Git提供了强大的合并工具，可以自动合并大部分冲突，并且允许手动解决合并冲突。',
            },
            {
              text: '4. 分布式：Git是一个分布式版本控制系统，每个开发人员都可以拥有完整的代码仓库副本。这意味着即使没有网络连接，开发人员仍然可以进行版本控制和提交更改。当网络恢复后，可以轻松地将本地更改同步到远程代码库中。',
            },
            {
              text: '5. 快速和高效: Git的设计目标之一是快速和高效。它使用了一些优化策略来减少存储空间占用和操作时间。这使得Git在处理大型项目或包含大量历史记录的项目时也能保持良好的性能。',
            },
            {
              text: '总的来说，Git提供了一个强大而灵活的版本控制系统，可以帮助开发人员更好地管理和协作开发项目。',
            },
          ],
        },
        {
          id: '2',
          numberImg: 'https://img.js.design/assets/img/64bbe14848740206395d89f2.png#1c19164358517234612802409d45a7dd',
          title: '安装python',
          introImg1: 'https://img.js.design/assets/img/64d59d85e0ce60294cb06968.png#8a3cd96238d6b4cfd9fb16de925b8216',
          intro: [
            {
              text: 'Python是一种高级编程语言，它被广泛用于各种领域的软件开发、数据分析、人工智能和科学计算等任务。Python的设计目标是简洁、易读和易于学习，因此它成为了许多开发者的首选语言。',
            },
          ],
          tips: [
            { text: 'https://git-scm.com/download/win' },
            {
              text: 'https://www.python.org/downloads/release/python-3106/',
            },
          ],
          contentTitle: [
            {
              text: 'Python的主要功能：  ',
            },
          ],
          content: [
            {
              text: '1. 简单易学：Python的语法简洁而清晰，易于理解和学习。它使用明确的代码结构和缩进风格，使得代码的可读性非常高。 ',
            },
            {
              text: '2. 跨平台：Python是一种跨平台的编程语言，可以在各种操作系统上运行，包括Windows、Mac和Linux等。',
            },
            {
              text: '3. 大量的库和框架：Python拥有庞大而活跃的社区，因此有很多优秀的第三方库和框架可供使用。这些库和框架提供了丰富的功能和工具，使得开发人员能够快速构建复杂的应用程序。',
            },
            {
              text: '4. 数据分析和科学计算：Python在数据分析和科学计算方面表现出色。它提供了许多专门用于处理和分析数据的库，如NumPy、Pandas和Matplotlib等。这些库使得数据处理、统计分析和可视化变得更加简单和高效。',
            },
            {
              text: '5. Web开发：Python可以用于构建 Web 应用程序和 API。框架如Django和Flask提供了强大的工具和功能来简化网站开发过程。',
            },
            {
              text: '6. 人工智能和机器学习：Python在人工智能和机器学习领域得到了广泛应用。库如TensorFlow和PyTorch提供了强大的机器学习和深度学习功能，使得开发人员能够构建和训练复杂的神经网络模型。',
            },
            {
              text: '总的来说，Python是一种功能强大且灵活的编程语言，适用于多种应用场景，从简单的脚本到大规模的应用程序开发，都能得心应手。 ',
            },
          ],
        },
        {
          id: '3',
          numberImg: 'https://img.js.design/assets/img/64bca8edf4653c66a96fa526.png#c0adaa0c95f5c5a0437fb6d6be2da82f',
          title: '安装stable-diffusion-webui',
          introImg1: 'https://img.js.design/assets/img/64d5a34b32a772a3fbc42505.png#542f5033397c49aa9b67b1f296afa35f',
          introImg2: 'https://img.js.design/assets/img/64d5a770ea687f32d9b37a74.png#4dbbd4480d62ee2198219b1a6e230da3',
          intro: [
            {
              text: '在想要安装的目录右键，选择Git Bash Here',
            },
          ],
          tips: [
            { text: 'git clone ' },
            {
              text: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui.gitn',
            },
          ],
          contentTitle: '',
          content: [
            {
              text: '',
            },
          ],
        },
        {
          id: '4',
          numberImg: 'https://img.js.design/assets/img/64bca9cabc7a42199ce33a6c.png#fe6f79c1b7326ec4ef0e9cd78fe904c0',
          title: '下载model',
          introImg1: 'https://img.js.design/assets/img/64d5a8887787a3e983ba1486.png#ea66adbb126667337e3d48fb648e1aad',
          intro: [
            {
              text: '下载完model后把model解压，粘贴到stable diffusion-webui/models/stable diffusion/底下也可以专门下一些适合自己的model。',
            },
          ],
          tips: [
            {
              text: 'https://huggingface.co/runwayml/stable-diffusion-v1-5',
            },
          ],
          contentTitle: '',
          content: [{}],
        },
        {
          id: '5',
          numberImg: 'https://img.js.design/assets/img/64d5ab6f32a772a3fbc77b29.png#8d3c6ed9891bc6b6ad9d2c5e2cbdda36',
          title: '修改webui-user.bat',
          introImg1: 'https://img.js.design/assets/img/64d5a9f2636d7fd3691ad8d6.png#0dc8aaa189623dada9c136cd5edc13b4',
          introImg2: 'https://img.js.design/assets/img/64d5a97e8a9482ff862f44c6.png#078d02c2efcc2dacbff84fe071e5e8e4',
          intro: [
            {
              text: '找到安装的目录下的webui-user.bat',
            },
            {
              text: '在最上面加上那个 git pull，以保持sdwebui是最新的',
            },
          ],
          tips: [{}],
          contentTitle: '',
          content: [{}],
        },
        {
          id: '6',
          numberImg: 'https://img.js.design/assets/img/64d5ac009d8cf25900e2416b.png#d0a4a44f56ab479057eae17e4d65b47b',
          title: '下载依赖，修改launch.py',
          introImg1: 'https://img.js.design/assets/img/64d5ac623392c7f211072dee.png#fe496a3df9022ff9c59a867662093054',
          introImg2: 'https://img.js.design/assets/img/64d5c0308f92c10846ac74f9.png#5442cb2bbaa20cf6595ec56dee5412c4',
          intro: [
            {
              text: '下载依赖时，比如gfpgan等会遇到网络问题，要改launch文件，在原来的github网址前面加上镜像网址，这样就不会遇到网络问题了',
            },
          ],
          tips: [
            {
              text: '找到安装的目录下的launch.py',
            },
            {
              text: '找到 gfpgan_package，git+https://github.com/ 修改为git+https://ghproxy.com/https://github.com/',
            },
            {
              text: '找到 clip_package，git+https://github.com/ 修改为 git+https://ghproxy.com/https://github.com/',
            },
          ],
          contentTitle: '',
          content: [{}],
        },
        {
          id: '7',
          numberImg: 'https://img.js.design/assets/img/64d5c0f0eef3bf8dd7843335.png#d62edc4f826412d08b756e2defec3ac9',
          title: '运行',
          introImg1: 'https://img.js.design/assets/img/64d5c1447073e2b17aceafa8.png#93ed1cd2a5d2b8fadc5450cd07863de1',
          introImg2: 'https://img.js.design/assets/img/64d5c1b1eef3bf8dd7843eaf.png#b344610a2ce70c191e5abe7301f37ee8',
          intro: [
            {
              text: '找到安装的目录下的webui-user.bat，双击运行，等待运行完成后， 浏览器默认网址127.0.0.1:7860',
            },
          ],
          tips: [{}],
          contentTitle: '',
          content: [{}],
        },
      ],

      // 底部导航栏
      navItem: [
        { label: '安装Git', selected: true },
        { label: '安装python3.10版', selected: false },
        { label: '安装stable diffusion-webui', selected: false },
        { label: '下载model', selected: false },
        { label: '修改webui-user.bat', selected: false },
        { label: '下载依赖，修改launch.py', selected: false },
        { label: '运行', selected: false },
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
    // Git
    exchangeGit() {
      const moveboxA = document.querySelector('.moveboxA')
      if (!this.isGit) {
        moveboxA.style.transform = 'translateY(5%)'
        setTimeout(() => {
          moveboxA.style.transform = 'translateY(-53%)'
          this.installGitCh = '安装教程'
          setTimeout(() => {
            moveboxA.style.transform = 'translateY(-50%)'
          }, 300)
        }, 200)
      } else {
        moveboxA.style.transform = 'translateY(-55%)'
        setTimeout(() => {
          moveboxA.style.transform = 'translateY(3%)'
          this.installGitCh = '主要功能'
          setTimeout(() => {
            moveboxA.style.transform = 'translateY(0%)'
          }, 300)
        }, 200)
      }
      this.isGit = !this.isGit
    },
    exchangePython() {
      const moveboxB = document.querySelector('.moveboxB')
      if (!this.isPython) {
        moveboxB.style.transform = 'translateY(5%)'
        setTimeout(() => {
          moveboxB.style.transform = 'translateY(-53%)'
          this.installPython = '安装教程'
          setTimeout(() => {
            moveboxB.style.transform = 'translateY(-50%)'
          }, 300)
        }, 200)
      } else {
        moveboxB.style.transform = 'translateY(-55%)'
        setTimeout(() => {
          moveboxB.style.transform = 'translateY(3%)'
          this.installPython = '主要功能'
          setTimeout(() => {
            moveboxB.style.transform = 'translateY(0%)'
          }, 300)
        }, 200)
      }
      this.isPython = !this.isPython
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
  width: 13440px;
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
    .seccommon {
      position: absolute;

      text-align: center;
      img {
        width: 1215px;
      }
    }
    .moveboxA {
      transition: all 0.25s;
      .a {
        transform: translate(100px, -75px);
        img {
          margin-left: 15px;
        }
      }
      .qwe {
        margin: 30px 0 0 75px;
      }
      .expand {
        width: 100%;
        height: 920px;

        .conbox {
          margin: 0px auto;
        }
      }
    }
    .moveboxB {
      transition: all 0.25s;
      .b {
        transform: translate(100px, -75px);
        img {
          margin-left: 165px;
        }
        .Bboxword {
          display: flex;
          justify-content: space-around;
          color: #fff;
          font-size: 30px;
          margin-top: 30px;
        }
      }
      .qwe {
        margin: 20px 0 0 75px;
      }
      .expand {
        width: 100%;
        height: 920px;

        .conbox {
          margin: 0px auto;
        }
      }
    }

    .c {
      .t {
        display: flex;
        margin-bottom: 20px;
        .image {
          width: 915px;
          height: 455px;
          margin: 0;
          z-index: 5;
          img {
            width: 915px;
            transition: all 0.35s;
            &:hover {
              width: 1415px;
            }
          }
        }

        div {
          margin: 0px 0 0 30px;
        }
      }
      margin: 25px 0 0 50px;
    }
    .d {
      transform: translate(120px, -60px);

      img {
        margin-left: 150px;
      }
    }
    .e {
      .t {
        display: flex;
        margin-bottom: 20px;
        img {
          width: 600px;
        }
        div {
          margin: 50px 0 0 30px;
        }
      }
      margin: 30px 0 0 50px;
      img {
        width: 1200px;
      }
    }
    .f {
      margin-top: 75px;
      .more {
        display: flex;
        margin-top: 60px;
        .lf {
          margin-right: 35px;
          div {
            width: 800px;
          }
          img {
            width: 800px;
            margin-bottom: 25px;
            transition: all 0.35s;
          }
          .hov {
            transform-origin: left bottom;
          }
          .hov:hover {
            transform: translateY(-300px);
            width: 1760px;
          }
        }
      }
    }
    .g {
      margin: 100px 0 0 45px;
      img {
        width: 1590px;
      }
    }
  }
}
.SideButton {
  .trri {
    position: absolute;
    top: 36%;
    left: 37%;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 0;
    border-left: 15px solid rgba(255, 255, 255, 1);
    cursor: pointer;
    transition: all 0.3s;
  }
  .left {
    border-left: 0;
    border-right: 15px solid rgba(255, 255, 255, 1);
    // transform: rotate(180deg);
  }
}
</style>
