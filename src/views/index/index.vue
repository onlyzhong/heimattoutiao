<template>
  <div class="index">
    <!-- 频道区域 -->
    <van-tabs v-model="active">
      <van-tab v-for="(item,index) in channelsList" :key="index" :title="item.name">
        <!-- 文章区域结构 -->
        <!-- <div v-for="item in 40" :key="item">我是文章 {{ item }}</div> -->
        <van-pull-refresh v-model="item.isLoading" :head-height="80" @refresh="onRefresh">
          <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
          <template #pulling="props">
            <img
              class="doge"
              src="../../assets/25512212c92c50930c6e3fb9a0758db3.jpeg"
              :style="{ transform: `scale(${props.distance / 80})` }"
            />
          </template>

          <!-- 释放提示 -->
          <template #loosing>
            <img class="doge" src="../../assets/f3aa11fda75036e7524769057dac9e63.jpg" />
          </template>

          <!-- 加载提示 -->
          <template #loading>
            <img class="doge" src="../../assets/25512212c92c50930c6e3fb9a0758db3.jpeg" />
          </template>
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="(subitem, subindex) in item.articleList"
              :key="subindex"
              :title="subitem.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 频道操作按钮 -->
    <div class="channelBtn" @click="openPopup">
      <van-icon name="wap-nav" />
    </div>
    <!-- 频道操作面板 -->
    <!-- 将频道列表数据从 index/index 中传入到 channel 中 -->
    <channel :channelsList="channelsList" @addChannelsList="changChannelsList" ref="channel" />
  </div>
</template>
<script>
// 导入得到频道的方法
import { apiGetChannels } from '../../api/channle'
// 导入操作 localstorage 的方法
import { getLocal } from '../../utils/mytoken'
// 导入操作文章的方法
import { apiGetArticleList } from '../../api/article'

import channel from './com/channel.vue'

export default {
  data () {
    return {
      // 保存频道数据
      channelsList: [],
      // 当前选中的 tab 的下标
      active: 0
    }
  },
  methods: {
    changChannelsList (item) {
      this.channelsList.push(item)
      this.addOtherProps()
      window.console.log(this.channelsList)
    },
    // 打开频道操作面板
    openPopup () {
      this.$refs.channel.show = true
    },
    // list 组件上拉触底时执行
    async onLoad () {
      // 得到当前频道
      var currenChannel = this.channelsList[this.active]
      // 1.0 得到当前频道的 id
      var id = currenChannel.id
      // 2.0 根据频道 id 得到当前频道下的数据源
      var res = await apiGetArticleList({
        channelid: id,
        timestamp: Date.now() // 当前时间戳
      })
      // 将返回的数据源保存起来
      // currenChannel.articleList = res.data.data.results
      // 这里不应该是覆盖，应该是拼接
      currenChannel.articleList = [...currenChannel.articleList, ...res.data.data.results]
      // 将当前 list 的加载状态设置为 false
      currenChannel.loading = false
      if (res.data.data.results.length === 0) {
        // 说明没有数据了
        currenChannel.finished = true
      }
      window.console.log(this.channelsList)
    },
    // 下拉刷新时触发的事件
    onRefresh () {
      // 得到当前频道
      var currenChannel = this.channelsList[this.active]
      // 1.0 清除当前频道下的所有数据
      currenChannel.articleList = []
      currenChannel.loading = false
      currenChannel.finished = false
      currenChannel.isLoading = false
      // 2.0 重新加载数据
      this.onLoad()
      this.onLoad()
    },
    // 得到频道数据
    async getChannels () {
      // 判断用户是否登录：判断
      var token = this.$store.state.userInfo.token
      try {
        if (token) {
          // 说明已经登录
          // 请求服务器接口
          var res = await apiGetChannels()
          // 保存频道数据
          this.channelsList = res.data.data.channels
        } else {
          // 说明未登录：判断 localstorage 中是否存在频道数据
          // 得到 localstorage 中的频道数据
          var localChannel = getLocal('channels')
          if (localChannel) {
            // 说明 localstorage 中存在频道数据
            this.channelsList = localChannel
          } else {
            // 说明 localstorage 中不存在频道数据
            // 请求服务器接口
            var resNoLogin = await apiGetChannels()
            // 保存频道数据
            this.channelsList = resNoLogin.data.data.channels
          }
        }
      } catch {
        this.$toast('请求有误')
      }
      // 给频道数据源中再添加一个属性 articleList
      this.addOtherProps()
    },
    // 给频道数据源中添加其它的属性
    addOtherProps () {
      this.channelsList.forEach(item => {
        // // 给频道数据源中的每个成员添加一个新的属性 articleList 属性
        // var strName = '我是' + item.name + '中的 articleList'
        // item.articleList = [strName]
        // // 还需要动态添加上拉属性，下拉属性，数据加载完毕属性
        // item.isLoading = false // 下拉刷新组件的刷新状态
        // item.loading = false // list 组件中的加载状态
        // item.finished = false // list 组件的数据源加载完毕的状态
        this.$set(item, 'articleList', [])
        this.$set(item, 'isLoading', false)
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
      })
      // window.console.log(this.channelsList)
    }
  },
  // 打开页面时，应该在这里得到频道数据
  mounted () {
    this.getChannels()
  },
  components: {
    channel
  }
}
</script>

<style lang="less">
.index {
  margin-top: 92px;
  margin-bottom: 50px;
  .van-tabs__wrap.van-tabs__wrap--scrollable.van-hairline--top-bottom {
    position: fixed;
    margin-right: 24px;
    z-index: 2;
    top: 46px;
    width: 100%;
  }
  .channelBtn {
    display: none;
    position: fixed;
    top: 46px;
    right: 0px;
    height: 44px;
    width: 10%;
    text-align: center;
    line-height: 44px;
    background-color: #ccc;
    color: #fff;
  }
}
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>
