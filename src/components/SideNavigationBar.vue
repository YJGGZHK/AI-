<template>
  <div id="sidenav" style="position: relative">
    <!-- 蒙版 -->
    <!-- 侧边栏按钮 -->
    <div
      class="sidebar-button"
      :style="{
        left: sidebarVisible ? '1920px' : '',
        transform: sidebarVisible ? 'translateX(-100%)' : 'translateX(0%)',
        backgroundColor: sidebarVisible ? '#727272' : 'rgba(229, 229, 229, 0.3)',
      }"
      @click="toggleSidebar"
    >
      <!-- 箭头 -->
      <div class="arrow" :class="{ left: isArrowLeft }"></div>
    </div>

    <!-- 侧边栏页面 -->

    <div
      class="sidebar"
      :style="{
        left: sidebarVisible ? '0' : '-1920px',
      }"
    >
      <!-- 背景 -->
      <div class="backg" style="width: 100%; height: 100%; position: relative">
        <div class="block" style="width: 100%; height: 100%; background-color: rgba(43, 43, 43, 0.8); backdrop-filter: blur(14px); position: absolute; top: 0; left: 0"></div>
        <img src="../assets/pictures/SidenavBackground.png" alt="" style="height: 100%; position: absolute; left: 0; top: 0" />
      </div>
      <!-- 蒙版 -->
      <!-- 线条 -->
      <img :src="theme.branchImg" alt="" class="theme-img" v-for="(theme, id) in navigations" :key="id" :style="{ left: theme.branchImgLeft, top: theme.branchImgTop, display: theme.branchShow ? 'block' : 'none' }" style="position: absolute" />
      <!-- 大标题 -->
      <div class="theme-button" v-for="(theme, id) in navigations" :key="id" :style="{ left: theme.left, top: theme.top }" :class="{ 'sm-size': theme.isSmall, display: theme.branchShow ? 'block' : 'none' }" @click="themeClick(id)">{{ theme.theme }}</div>
      <!-- 小标题 -->
      <div class="theme" v-for="(item, id) in navigations" :key="id">
        <div
          class="theme-button"
          v-for="(branch, key) in item.branch"
          :key="key"
          :style="{ left: branch.left, top: branch.top, display: item.branchShow ? 'block' : 'none', zIndex: item.branchShow ? '10' : '0' }"
          @click="this.$router.push({ name: branch.routeName, query: { title: item.theme, subnav: branch.subnav } })"
        >
          {{ branch.title }}
        </div>
        <div class="smtitle-button" v-for="(leaves, key) in item.leaves" :key="key" :style="{ left: leaves.left, top: leaves.top, opacity: item.branchShow ? '1' : '0' }" @click="this.$router.push({ name: leaves.routeName, query: { title: item.theme, subnav: leaves.subnav } })">
          {{ leaves.title }}
        </div>
      </div>
      <!-- 知识点目录 -->
      <div class="tips" style="position: absolute; right: -300px; top: 10px" v-if="this.sidebarVisible">
        <ArtWord :text="'知识点目录'"></ArtWord>
      </div>
    </div>
  </div>
</template>

<script>
import ArtWord from './ArtWord.vue'
export default {
  name: 'SideNavigationBar',
  components: { ArtWord },
  data() {
    return {
      sidebarVisible: false, // 侧边栏是否可见
      isArrowLeft: false, // 箭头方向是否向左
      navigations: [
        {
          id: 0,
          theme: '人工智能',
          left: '145px',
          top: '175px',
          branchImg: require('../assets/pictures/SideNavLine/1.png'),
          branchImgLeft: '330px',
          branchImgTop: '210px',
          branchShow: false,
          branch: [
            {
              title: '发展过程',
              left: '440px',
              top: '390px',
              routeName: 'AIdevelopPage',
              subnav: '发展过程',
            },
            {
              title: '拓展介绍',
              left: '440px',
              top: '600px',
              routeName: 'AIdevelopPage',
              subnav: '拓展介绍',
            },
            {
              title: '如何训练AI',
              left: '730px',
              top: '495px',
              routeName: 'AIdevelopPage',
              subnav: '拓展介绍',
            },
            {
              title: 'ChatGPT',
              left: '730px',
              top: '705px',
              routeName: 'AIdevelopPage',
              subnav: '拓展介绍+',
            },
          ],
        },
        {
          id: 1,
          theme: 'AI绘画',
          left: '145px',
          top: '390px',
          branchShow: false,
          branchImg: require('../assets/pictures/SideNavLine/2.png'),
          branchImgLeft: '325px',
          branchImgTop: '95px',
          branch: [
            {
              title: '入门原理',
              left: '435px',
              top: '170px',
              routeName: 'APIntroPage',
              subnav: '绘制过程',
            },
            {
              title: '进阶原理',
              left: '435px',
              top: '665px',
              routeName: 'APUpgradePage',
              subnav: '绘制过程',
            },
            {
              title: '绘制过程',
              left: '730px',
              top: '65px',
              routeName: 'APIntroPage',
              subnav: '绘制过程',
            },
            {
              title: '使用原理',
              left: '730px',
              top: '275px',
              routeName: 'APIntroPage',
              subnav: '使用原理',
            },
            {
              title: '图像特征',
              left: '1040px',
              top: '115px',
              routeName: 'APIntroPage',
              subnav: '使用原理',
            },
            {
              title: '噪声图',
              left: '1040px',
              top: '225px',
              routeName: 'APIntroPage',
              subnav: '使用原理',
            },
            {
              title: '生成新图',
              left: '1040px',
              top: '330px',
              routeName: 'APIntroPage',
              subnav: '使用原理',
            },
            {
              title: '训练模型',
              left: '1040px',
              top: '435px',
              routeName: 'APIntroPage',
              subnav: '使用原理',
            },
            {
              title: '提示词',
              left: '730px',
              top: '415px',
              routeName: 'APUpgradePage',
              subnav: '提示词',
            },
            {
              title: '噪声图',
              left: '730px',
              top: '525px',
              routeName: 'APUpgradePage',
              subnav: '噪声图',
            },
            {
              title: '前向扩散',
              left: '730px',
              top: '630px',
              routeName: 'APUpgradePage',
              subnav: '前向扩散',
            },
            {
              title: '后向扩散',
              left: '730px',
              top: '740px',
              routeName: 'APUpgradePage',
              subnav: '后向扩散',
            },
            {
              title: '采样图',
              left: '730px',
              top: '845px',
              routeName: 'APUpgradePage',
              subnav: '采样图',
            },
            {
              title: 'U-Net模型',
              left: '730px',
              top: '955px',
              routeName: 'APUpgradePage',
              subnav: 'U-Net模型',
            },
          ],
        },
        {
          id: 2,
          theme: 'Stable Diffusion',
          left: '145px',
          top: '620px',
          isSmall: true,
          branchShow: false,
          branchImg: require('../assets/pictures/SideNavLine/3.png'),
          branchImgLeft: '375px',
          branchImgTop: '150px',
          branch: [
            {
              title: '入门原理',
              left: '485px',
              top: '270px',
              routeName: 'SDIntroPage',
              subnav: '基本介绍',
            },
            {
              title: '进阶原理',
              left: '485px',
              top: '765px',
              routeName: 'SDUpgradePage',
              subnav: '基本介绍',
            },
            {
              title: '基本介绍',
              left: '775px',
              top: '165px',
              routeName: 'SDIntroPage',
              subnav: '基本介绍',
            },
            {
              title: '本地搭建',
              left: '775px',
              top: '270px',
              routeName: 'SDIntroPage',
              subnav: '本地搭建',
            },
            {
              title: '交互拟真',
              left: '775px',
              top: '375px',
              routeName: 'SDIntroPage',
              subnav: '交互拟真',
            },
            {
              title: '基本介绍',
              left: '775px',
              top: '625px',
              routeName: 'SDUpgradePage',
              subnav: '基本介绍',
            },
            {
              title: '本地搭建',
              left: '775px',
              top: '760px',
              routeName: 'SDUpgradePage',
              subnav: '本地搭建',
            },
            {
              title: '交互拟真',
              left: '775px',
              top: '900px',
              routeName: 'SDUpgradePage',
              subnav: '交互拟真',
            },
          ],
          leaves: [
            {
              title: 'stable diffusion',
              left: '1070px',
              top: '130px',
              routeName: 'SDIntroPage',
              subnav: '基本介绍',
            },
            {
              title: 'stable diffusion-webui',
              left: '1070px',
              top: '220px',
              routeName: 'SDIntroPage',
              subnav: '基本介绍',
            },
            {
              title: '文生图',
              left: '1070px',
              top: '300px',
              routeName: 'SDRealismPage',
              subnav: '文生图',
            },
            {
              title: '图生图',
              left: '1070px',
              top: '385px',
              routeName: 'SDRealismPage',
              subnav: '图生图',
            },
            {
              title: '图片后期',
              left: '1070px',
              top: '465px',
              routeName: 'SDRealismPage',
              subnav: '图片后期',
            },
            {
              title: 'stable diffusion',
              left: '1070px',
              top: '590px',
              routeName: 'SDUpgradePage',
              subnav: '基本介绍',
            },
            {
              title: 'stable diffusion-webui',
              left: '1070px',
              top: '680px',
              routeName: 'SDUpgradePage',
              subnav: '基本介绍+',
            },
            {
              title: '文生图',
              left: '1070px',
              top: '820px',
              routeName: '',
              subnav: '文生图',
            },
            {
              title: '图生图',
              left: '1070px',
              top: '905px',
              routeName: '',
              subnav: '图生图',
            },
            {
              title: '图片后期',
              left: '1070px',
              top: '990px',
              routeName: '',
              subnav: '图片后期',
            },
            {
              title: '安装Git',
              left: '1465px',
              top: '380px',
              routeName: 'SDInstallPage',
              subnav: '安装Git',
            },
            {
              title: '安装python3.10版',
              left: '1465px',
              top: '470px',
              routeName: 'SDInstallPage',
              subnav: '安装python3.10版',
            },
            {
              title: '安装stable diffusion-webui',
              left: '1465px',
              top: '550px',
              routeName: 'SDInstallPage',
              subnav: '安装stable diffusion-webui',
            },
            {
              title: '下载model',
              left: '1465px',
              top: '630px',
              routeName: 'SDInstallPage',
              subnav: '下载model',
            },
            {
              title: '修改webui-user.bat',
              left: '1465px',
              top: '720px',
              routeName: 'SDInstallPage',
              subnav: '修改webui-user.bat',
            },
            {
              title: '下载依赖，修改launch.py',
              left: '1465px',
              top: '800px',
              routeName: 'SDInstallPage',
              subnav: '下载依赖，修改launch.py',
            },
            {
              title: '运行',
              left: '1465px',
              top: '880px',
              routeName: 'SDInstallPage',
              subnav: '运行',
            },
          ],
        },
        {
          id: 3,
          theme: '实际运用',
          left: '145px',
          top: '860px',
          branchShow: false,
          branchImg: require('../assets/pictures/SideNavLine/4.png'),
          branchImgLeft: '330px',
          branchImgTop: '440px',
          branch: [
            {
              title: '绘画辅助',
              left: '470px',
              top: '410px',
              routeName: 'PAPaintingPage',
              subnav: '绘画辅助',
            },
            {
              title: '辅助建筑设计',
              left: '470px',
              top: '545px',
              routeName: 'PAPaintingPage',
              subnav: '辅助建筑设计',
            },
            {
              title: '绘画2D转3D',
              left: '470px',
              top: '680px',
              routeName: 'PAPaintingPage',
              subnav: '绘画2D转3D',
            },
          ],
        },
      ],
    }
  },
  methods: {
    toggleSidebar() {
      // 切换侧边栏的可见状态
      this.sidebarVisible = !this.sidebarVisible
      // 切换箭头朝向
      this.isArrowLeft = !this.isArrowLeft
    },
    themeClick(id) {
      for (var i = 0; i < this.navigations.length; i++) {
        this.navigations[i].branchShow = false
      }
      this.navigations[id].branchShow = true
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar-button {
  position: relative;
  width: 40px;
  height: 1080px;
  background-color: rgb(166, 166, 166);
  position: fixed;
  cursor: pointer;
  transition: all 0.65s;
  z-index: 999;
  /* 箭头 */
  .arrow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-right: 0;
    border-left: 20px solid #4a4a4a;
    cursor: pointer;
    transition: all 0.3s;
  }

  .arrow.left {
    border-left: 0;
    border-right: 20px solid #4a4a4a;
    // transform: rotate(180deg);
  }
}

.sidebar {
  position: relative;
  width: 1920px;
  height: 1080px;
  background-repeat: no-repeat;
  position: fixed;
  left: 30px;
  top: 0;
  transition: all 0.65s;
  z-index: 998;
  .theme-button {
    position: absolute;
    min-width: 180px;
    height: 65px;
    border-radius: 30px;
    padding: 0 27px;
    background: rgba(92, 92, 92, 0.5);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 5px rgba(105, 255, 246, 1);
    font-size: 30px;
    line-height: 65px;
    text-align: center;

    color: rgba(105, 255, 246, 1);
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  .smtitle-button {
    position: absolute;
    min-width: 145px;
    height: 45px;
    border-radius: 30px;
    padding: 0 20px;
    background: rgba(92, 92, 92, 0.5);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 5px rgba(105, 255, 246, 1);
    font-size: 24px;
    line-height: 45px;
    text-align: center;

    color: rgba(105, 255, 246, 1);
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.sm-size {
  font-size: 24px !important;
}
</style>
