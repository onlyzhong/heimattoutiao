<template>
  <div>
    <div class="inputBox">
      <img @click="openPopup" src="../../assets/63485483_p0.jpg" alt />
      <input class="searchInput" type="text" />
      <img src="../../assets/63485483_p0.jpg" alt />
    </div>
    <router-view ref="sonRouter" />
    <van-tabbar route>
      <van-tabbar-item to="/index" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  methods: {
    openPopup () {
      this.$refs.sonRouter.openPopup()
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
  img {
    // width: 46px;
    flex: 1;
    height: 46px;
  }
  .searchInput {
    height: 30px;
    margin: 0 20px;
    border: 0;
    border-radius: 15px;
    flex: 5;
  }
}
</style>
