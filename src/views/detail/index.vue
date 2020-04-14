<template>
    <div class="detail">
        <!-- 页面标题 -->
        <van-nav-bar fixed left-arrow title="文章详情" @click-left="onClickLeft" />
        <!-- 文章标题 -->
        <h2 class="title">{{ detailObj.title }}</h2>
        <!-- 作者信息 -->
        <van-sticky :offset-top="46">
            <div class="aut">
                <div class="autimg">
                    <img :src="detailObj.aut_photo" alt="">
                </div>
                <div class="autmsg">
                    <div class="autname">{{ detailObj.aut_name }}</div>
                    <div class="time">{{ detailObj.pubdate | timeFilter }}</div>
                </div>
                <div class="autbtn">
                    <van-button @click="follow" v-if="detailObj.is_followed === false" type="info">+ 关注</van-button>
                    <van-button @click="unfollow" v-if="detailObj.is_followed === true" type="info">已关注</van-button>
                </div>
            </div>
        </van-sticky>
        <!-- 文章内容 -->
        <van-cell>
            <template #title>
                <div v-html="detailObj.content"></div>
            </template>
        </van-cell>
        <!-- 点赞 & 不喜欢 -->
        <div class="btnbox">
            <van-button round type="default">
                <van-icon class="myicon" name="like" />点赞
            </van-button>
            <van-button round type="default">
                <van-icon class="myicon" name="delete" />不喜欢
            </van-button>
        </div>
        <!-- 评论区域：上拉加载更多的功能 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!-- 文章的评论 -->
            <comment :isReplay="false" @changeShow="v=>show=v" :item="item" v-for="(item, index) in commentList" :key="index" />
        </van-list>
        <!-- 发布评论区域 -->
        <write @addComment="addComment" />
        <!-- 回复组件 -->
        <!-- <reply :value="show" @input="v=>show=v" /> -->
        <reply v-model="show" />
    </div>
</template>

<script>
// 导入评论组件
import comment from './com/comment'
import write from './com/write'
import reply from './com/reply'
// 导入得到文章的方法
import { apiGetDetail } from '../../api/article'
// 导入操作用户的方法
import { apiFollow, apiUnFollow } from '../../api/user'
// 导入操作评论的方法
import { apiGetComment } from '../../api/comment'

export default {
  data () {
    return {
      // 加载状态
      loading: false,
      // 数据源是否加载完毕
      finished: false,
      // 文章 id
      artid: 0,
      // 创建一个保存详情的对象
      detailObj: {},
      // 评论分页的关键字：下一页的关键字
      offset: null,
      // 最后一页的关键字
      endid: 0,
      // 页容量
      limit: 10,
      // 文章的评论数据
      commentList: [],
      // 控制回复面板的显示与隐藏
      show: false
    }
  },
  methods: {
    // 用来接收添加评论之后组件中返回的数据
    addComment (obj) {
      // 将返回的数据添加到 commentList 中就可以了
      this.commentList.unshift(obj)
    },
    // list 组件的加载事件
    async onLoad () {
      // 请求服务器接口得到文章的评论数据
      var res = await apiGetComment({
        artid: this.artid,
        offset: this.offset,
        limit: this.limit
      })
      // 保存评论数据:从覆盖改为拼接
      this.commentList = [...this.commentList, ...res.data.data.results]
      // 保存下一页的标识
      this.offset = res.data.data.last_id
      // 保存最后页的标识
      this.endid = res.data.data.end_id
      // 判断 list 数据是否加载完毕
      if (this.offset === this.endid) {
        this.finished = true
      }
      // 将 list 的加载状态改为 false
      this.loading = false
    },
    // 取关作者
    async unfollow () {
      // 得到作者的 id
      var autid = this.detailObj.aut_id
      // 提交到服务器
      await apiUnFollow(autid)
      // 手动将关注状态设置为 false
      this.detailObj.is_followed = false
    },
    // 关注作者：
    async follow () {
      // 得到作者的 id
      var autid = this.detailObj.aut_id
      // 提交到服务器
      await apiFollow(autid)
      // 手动将用户的关注状态设置为 true
      this.detailObj.is_followed = true
    },
    onClickLeft () {
      this.$router.back()
    }
  },
  async mounted () {
    // 得到文章 id
    this.artid = this.$route.query.artid
    // 根据文章 id 发送请求到服务器得到文章详情
    var res = await apiGetDetail(this.artid)
    // 保存对象
    this.detailObj = res.data.data
  },
  components: {
    comment,
    write,
    reply
  }
}
</script>

<style lang="less">
.van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;
    .van-nav-bar__title {
        color: #fff;
    }
}

i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
}

.detail {
    margin-bottom: 54px;
    margin-top: 64px;
    .title {
        margin: 20px 10px;
        text-align: center;
    }
    .aut {
        display: flex;
        background-color: #fff;
        .autimg {
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin: 0px 20px;
            }
        }
        .autmsg {
            flex: 1;
            .autname {}
            .time {}
        }
        .autbtn {
            margin-right: 20px;
        }
    }
    .btnbox {
        display: flex;
        justify-content: space-around;
        margin: 40px 0px;
        .myicon {
            margin-right: 10px;
        }
    }
}
</style>
