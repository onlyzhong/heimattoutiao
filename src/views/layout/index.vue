<template>
  <div>
    <div class="inputBox">
      <!-- 左侧按钮 -->
      <!-- <img @click="openPopup" src="../../assets/63485483_p0.jpg" alt /> -->
      <van-icon class="channelMenu" name="wap-nav" color="#fff" size="24" @click="openPopup" />

      <!-- 中间搜索框 -->
      <!-- <input class="searchInput" type="text" /> -->
      <van-search
        background="skyblue"
        class="searchInput"
        v-model="value"
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
        @click="openSearch"
        @input="think"
      />

      <!-- 右侧按钮 -->
      <!-- <img src="../../assets/63485483_p0.jpg" alt /> -->
      <van-icon v-if="!isOpenSearch" class="channelMenu" name="gift-o" color="#fff" size="24" />
    </div>
    <!-- 子组件 -->
    <router-view
      ref="sonRouter"
      :value="value"
      :isOpenSearch="isOpenSearch"
      @changeisOpenSearch="changeisOpenSearch"
      @changeisSearchIng="changeisSearchIng"
    />
    <van-tabbar route>
      <van-tabbar-item to="/index" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/search" @click="openSearch" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      isOpenSearch: false,
      isSearchIng: true
    }
  },
  methods: {
    // 改变打开搜索框的状态
    changeisOpenSearch (a) {
      this.isOpenSearch = a
    },

    // 判断是否在搜索
    changeisSearchIng (a) {
      this.isSearchIng = a
    },

    // 选择频道
    openPopup () {
      // window.console.log(this.$route.path)
      // 如果是在index页面,则让其按钮生效
      if (this.$route.path === '/index') {
        // 触发index组件的频道按钮
        this.$refs.sonRouter.openPopup()
      }
    },

    // 按下enter键
    onSearch () {
      // window.console.log('==========')
      // 如果是在search页面,则触发子组件search的enter事件
      if (this.$route.path === '/search') {
        this.$refs.sonRouter.onSearch(this.value)
      }
      // enter后收起搜索框
      this.isOpenSearch = false
    },
    // 取消按钮
    onCancel () {
      window.console.log('++++++++++')
    },

    // 联想
    think () {
      // 如果在search页面,则触发子组件的联想事件
      if (this.$route.path === '/search') {
        this.$refs.sonRouter.think()
      }
    },
    // 打开搜索按钮
    openSearch () {
      // 点击搜索框如果此时页面不是search,则跳转到search页面
      this.isOpenSearch = true
      if (this.$route.path !== '/search') {
        this.$router.push('/search')
      }
      this.$refs.sonRouter.isSearchIng = true
    }
  }

}
</script>

<style lang="less">
.inputBox {
  display: flex;
  position: fixed;
  top: 0;
  height: 46px;
  width: 100%;
  z-index: 3;
  background-color: skyblue;
  align-items: center;
  justify-content: space-around;

  .channelMenu {
    // width: 46px;
    flex: 1;
    // height: 46px;
    text-align: center;
  }
  .searchInput {
    height: 30px;
    // margin: 0 20px;
    // border: 0;
    // border-radius: 15px;
    flex: 5;
  }
}
</style>
