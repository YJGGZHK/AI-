<template>
  <div class="bottom">
    <div class="bottom-nav">
      <div class="navPage" v-for="(page, id) in pageNav" :key="id">
        <div :class="{ selected: item.selected }" v-for="(item, index) in page" :key="index" class="nav-item" @click="selectNavItem(id, index)">
          {{ item.label }}
        </div>
      </div>
    </div>
    <!-- 对焦三角形 -->
    <div class="tri" style="left: 0px">
      <div class="triangle left"></div>
      <div class="triangle right"></div>
    </div>
    <!-- 导航栏页数 -->
    <div class="buttonPage" @click="toggleSidebar()">
      <div class="arrow" :class="{ left: isArrowLeft }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomNavigationBar',
  props: {
    navItem: {
      type: Object,
      default: undefined,
      required: true,
    },
    gap: {
      type: Number,
      default: 185,
    },
    initIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      navItems: [
        { label: '绘制过程', selected: true },
        { label: '使用原理', selected: false },
        { label: '应用场景', selected: false },
        { label: '多功能', selected: false },
      ],
      pageNav: [],
      // 当前的
      currentIndex: 0,
      // 底部导航栏的当前页数
      pageNavPage: 0,
      // 超过一页时的箭头朝向
      isArrowLeft: false,
    }
  },
  methods: {
    selectNavItem(id, nextIndex) {
      if (this.currentIndex > 3 && nextIndex == 3) {
        nextIndex = 2
      }
      var currentNavPage = document.querySelector('.navPage')
      if (this.pageNav.length > 1) {
        currentNavPage = document.querySelectorAll('.navPage')
        currentNavPage = currentNavPage[id]
      }
      var Index = 0
      if (id == 0) {
        Index = nextIndex + id * this.pageNav[this.pageNavPage].length
      } else {
        Index = nextIndex + id * this.pageNav[this.pageNavPage].length + 1
      }

      // 当前的按钮
      var navButton = currentNavPage.querySelectorAll('.nav-item')
      const currentNavButton = navButton[nextIndex]

      // 三角形及其动画
      const tri = document.querySelector('.tri')
      const right = tri.querySelector('.right')
      var currentLeft = parseInt(tri.style.left, 10)
      if (this.currentIndex < nextIndex) {
        tri.style.left = currentLeft - 20 + 'px'
        setTimeout(() => {
          tri.style.left = currentNavButton.offsetLeft + 10 + 'px'
          right.style.marginLeft = currentNavButton.offsetWidth + 5 + 'px'
          setTimeout(() => {
            tri.style.left = currentNavButton.offsetLeft - 20 + 'px'
            this.currentIndex = nextIndex
          }, 300)
        }, 150)
      } else {
        tri.style.left = currentLeft + 20 + 'px'
        setTimeout(() => {
          tri.style.left = currentNavButton.offsetLeft - 35 + 'px'
          right.style.marginLeft = currentNavButton.offsetWidth + 5 + 'px'
          setTimeout(() => {
            tri.style.left = currentNavButton.offsetLeft - 20 + 'px'
            this.currentIndex = nextIndex
          }, 350)
        }, 250)
      }
      for (var j = 0; j < this.pageNav.length; j++) {
        for (var i = 0; i < this.pageNav[j].length; i++) {
          this.pageNav[j][i].selected = false
          if (Index == this.pageNav[0].length * j + i) {
            this.pageNav[j][i].selected = true
          }
        }
      }

      this.$emit('clickIndex', Index)
      // console.log('botto,' + Index)
    },
    toggleSidebar() {
      // 切换箭头朝向
      this.selectedIndex = 0
      const bottomNav = document.querySelector('.bottom')
      const buttonPage = document.querySelector('.buttonPage')
      if (this.isArrowLeft) {
        bottomNav.style.left = '0'
        this.pageNavPage = 0
        buttonPage.style.right = '0'
      } else if (!this.isArrowLeft) {
        bottomNav.style.left = '-1920px'
        this.pageNavPage = 1
        buttonPage.style.right = '-1920px'
      }
      this.isArrowLeft = !this.isArrowLeft
      // this.resetTri()
    },
    resetTri() {
      var length = this.pageNav[this.pageNavPage].length
      var index = length - 2
      const left = parseInt(this.triangle[index].left, 10)
      const move = parseInt(this.triangle[index].move, 10)
      const tri = document.querySelector('.tri')

      tri.style.left = left + this.currentIndex * move + 'px'
      const bottomNav = document.querySelector('.bottom-nav')
      bottomNav.style.width = 1920 * this.pageNav.length + 'px'
    },
  },
  mounted() {
    this.navItems = this.navItem
    const arrow = document.querySelector('.buttonPage')

    // 当导航按钮数量大于7时
    if (this.navItems.length >= 7) {
      const firstGroup = this.navItem.slice(0, 4)
      const secondGroup = this.navItem.slice(4, 7)
      this.pageNav = [firstGroup, secondGroup]
      arrow.style.opacity = '1'
    } else {
      this.pageNav = [this.navItems]
    }
    const bottomNav = document.querySelector('.bottom-nav')
    bottomNav.style.width = 1920 * this.pageNav.length + 'px'

    // 针对长度为7的导航栏需要跳至导航栏第二页
    for (var i = 0; i < this.navItems.length; i++) {
      if (this.navItems.length == 7) {
        if (this.navItems[i].selected == true && i > 3) {
          this.toggleSidebar()
        }
      }
      if (this.navItems[i].selected == true) {
        this.currentIndex = i
      }
    }
    // console.log(this.navItems)

    // console.log('currentindex' + this.currentIndex)
    // 初始化位置
    setTimeout(() => {
      if (this.navItems.length == 7) {
        if (this.currentIndex < 4) {
          this.selectNavItem(0, this.currentIndex)
        } else {
          this.selectNavItem(1, this.currentIndex - 4)
        }
      } else {
        this.selectNavItem(0, this.currentIndex)
        // console.log('cu' + this.currentIndex)
      }
    }, 250)
  },
}
</script>

<style lang="scss" scoped>
.bottom {
  position: relative;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 1920px;
  height: 90px;
  .bottom-nav {
    position: absolute;
    left: 0;
    display: flex;

    background-color: transparent;
    padding: 17.5px 10px;
    text-align: center;
    transition: all 0.35s;
    .navPage {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 1920px;
      z-index: 5;
      .nav-item {
        cursor: pointer;
        padding: 10px;
        min-width: 180px;
        height: 44px;
        font-size: 30px;

        line-height: 44px;
        color: #fff;
        transition: all 0.25s;
      }
    }
  }
  .tri {
    display: flex;
    position: absolute;
    top: 35.5px;
    left: 0px;
    transition: all 0.25s;

    .triangle {
      border-style: solid;
    }
    .left {
      border-width: 15px 0 15px 17px;
      border-color: transparent transparent transparent rgba(105, 255, 246, 1);

      transition: left 0.3s ease;
    }
    .right {
      border-width: 15px 17.3px 15px 0;
      border-color: transparent rgba(105, 255, 246, 1) transparent transparent;

      transition: right 0.3s ease;
    }
  }
}
.buttonPage {
  position: absolute;
  right: 0;
  top: 8%;
  width: 45px;
  height: 90%;
  opacity: 0;
  background: rgba(255, 255, 255, 0.2);
  z-index: 10;
  .arrow {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 0;
    border-left: 15px solid rgba(255, 255, 255, 1);
    cursor: pointer;
    transition: all 0.3s;
  }

  .arrow.left {
    border-left: 0;
    border-right: 15px solid rgba(255, 255, 255, 1);
    // transform: rotate(180deg);
  }
}
.selected {
  font-size: 36px !important;
  color: rgba(105, 255, 246, 1) !important;
}
</style>
