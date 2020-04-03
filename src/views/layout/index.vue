<template>
  <div>
    <div class="inputBox">
      <!-- <img src="../../assets/63485483_p0.jpg" alt=""> -->
    </div>
    <router-view />
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

}
</script>

<style lang="less">
.inputBox{
  position: fixed;
  top: 0;
  height: 46px;
  width: 100%;
  z-index: 3;
  background-color: skyblue;
}
</style>
