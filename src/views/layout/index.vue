<template>
  <div>
    <div class="inputBox">
      <!-- <img @click="openPopup" src="../../assets/63485483_p0.jpg" alt /> -->
      <van-icon class="channelMenu" name="wap-nav" color="#fff" size="24" @click="openPopup" />
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
      <!-- <img src="../../assets/63485483_p0.jpg" alt /> -->
      <van-icon v-if="!isOpenSearch" class="channelMenu" name="gift-o" color="#fff" size="24" />
    </div>
    <router-view
      ref="sonRouter"
      :value="value"
      :isOpenSearch="isOpenSearch"
      @changeisOpenSearch="changeisOpenSearch"
      @changeisSearchIng="changeisSearchIng"
    />
    <van-tabbar route>
      <van-tabbar-item to="/index" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
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
    changeisOpenSearch (a) {
      this.isOpenSearch = a
    },
    changeisSearchIng (a) {
      this.isSearchIng = a
    },

    // 选择频道
    openPopup () {
      // window.console.log(this.$route.path)
      if (this.$route.path === '/index') {
        this.$refs.sonRouter.openPopup()
      }
    },
    // 按下enter键
    onSearch () {
      window.console.log('==========')
      if (this.$route.path === '/search') {
        this.$refs.sonRouter.onSearch(this.value)
      }
      this.isOpenSearch = false
    },
    // 取消按钮
    onCancel () {
      window.console.log('++++++++++')
    },
    think () {
      if (this.$route.path === '/search') {
        this.$refs.sonRouter.think()
      }
    },
    // 打开搜索按钮
    openSearch () {
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
