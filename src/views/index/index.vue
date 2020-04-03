<template>
  <div class="index">
    <!-- 头部区域 -->

    <!-- 频道区域 -->
    <van-tabs>
      <van-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
        <!-- 文章区域结构 -->
        <div v-for="item in 40" :key="item">我是文章 {{ item }}</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.index{
  margin-top: 92px;
  margin-bottom: 50px;
   .van-tabs__wrap.van-tabs__wrap--scrollable.van-hairline--top-bottom {
    position: fixed;
    margin-right: 24px;
    top: 46px;
    width: 100%;
  }
}
</style>
