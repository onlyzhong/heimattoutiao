<template>
  <div class="result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell border v-for="(item, index) in searchList" :key="index">
        <template #title>
          <!-- 标题 -->
          <h3>{{ item.title }}</h3>
          <!-- 文章图片 -->
          <van-grid v-if="item.cover.type !== 0" :border="false" :column-num="3">
            <van-grid-item v-for="(imgitem, imgindex) in item.cover.images" :key="imgindex">
              <van-image lazy-load :src="imgitem" />
            </van-grid-item>
          </van-grid>
          <!-- 文章信息区域 -->
          <div class="contentbox">
            <div class="left">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }} 条评论</span>
              <span>{{ item.pubdate | timeFilter }}</span>
            </div>
          </div>
          <!-- 宫格区域 -->
          <van-grid :column-num="3">
            <van-grid-item @click="comment" icon="comment-o" :text="item.comm_count.toString()" />
            <van-grid-item @click="zan" icon="like-o" text="点赞" />
            <van-grid-item icon="certificate" text="分享" />
          </van-grid>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 导入搜索结果的接口
import { apiSearch } from '../../../api/search'
export default {
  data () {
    return {
      // 新闻数据加载状态
      loading: false,
      // 数据的完结状态
      finished: false,
      // 得到搜索的关键字
      key: '',
      // 页码
      page: 1,
      // 页容量
      perPage: 10,
      // 搜索结果
      searchList: []
    }
  },
  methods: {
    // 点赞
    zan () {
      window.console.log('点赞')
    },

    // 评论
    comment () {
      console.log('评论')
    },
    // 加载 List 组件时会触发 & 上拉触发也会触发
    async onLoad () {
      // 发送请求得到搜索的结果
      var res = await apiSearch({
        page: this.page,
        perPage: this.perPage,
        key: this.key
      })
      // 保存搜索数据
      this.searchList = [...this.searchList, ...res.data.data.results]
      // 将加载状态设置为 false
      this.loading = false
      window.console.log(this.searchList)
      // 将页码 ++
      this.page++
      // 判断结果是否为空
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    }
  },
  mounted () {
    // 得到搜索的关键字
    this.key = this.$route.query.key
  }
}
</script>

<style lang="less">
i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
  color: #fff;
}

.result {
  .contentbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      span {
        margin-right: 10px;
        color: #999;
        font-size: 12px;
      }
    }
  }
  .van-grid-item__content.van-grid-item__content--center.van-hairline {
    flex-direction: row;
  }
  span.van-grid-item__text {
    margin-top: 0px;
  }
  i.van-icon.van-grid-item__icon {
    font-size: 20px;
    margin-right: 8px;
  }
}
</style>
