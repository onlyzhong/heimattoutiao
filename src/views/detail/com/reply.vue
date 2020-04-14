<template>
    <van-popup :value="value" @input="v=>$emit('input', v)" position="bottom" :style="{ height: '70%' }">
        <!-- 当前评论 -->
        <van-cell title="当前评论"></van-cell>
        <comment :isReplay="true" :item="currentComment" />
        <!-- 评论的回复 -->
        <van-cell title="评论的回复"></van-cell>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <comment :isReplay="true" :item="item" v-for="(item, index) in replayList" :key="index" />
        </van-list>
    </van-popup>
</template>

<script>
// 导入评论组件
import comment from './comment'
// 导入 bus
import bus from '../../../utils/bus'
// 导入操作评论的方法
import { apiGetReplay } from '../../../api/comment'
export default {
  // 接收一个属性：控制面板的显示和隐藏的属性
  props: ['value'],
  data () {
    return {
      loading: false,
      finished: false,
      // 当前评论数据
      currentComment: {},
      // 分页的标识
      offset: null,
      // 结束的标识
      endid: 0,
      // 页容量
      limit: 10,
      // 回复列表
      replayList: []
    }
  },
  methods: {
    async onLoad () {
      // console.log(this.currentComment.com_id.toString())
      // 得到评论的回复数据
      var res = await apiGetReplay({
        commid: this.currentComment.com_id.toString(), // 评论的 id
        offset: this.offset,
        limit: this.limit
      })
      // 得到评论的回复列表
      this.replayList = [...this.replayList, ...res.data.data.results]
      this.endid = res.data.data.end_id
      this.offset = res.data.data.last_id
      // 判断数据是否加载完毕
      if (this.endid === this.offset) {
        this.finished = true
      }
      // 关闭加载状态
      this.loading = false
    }
  },
  mounted () {
    // 得到 bus 数据
    bus.$on('passItem', item => {
      this.currentComment = item
    })
  },
  components: {
    comment
  }
}
</script>

<style>

</style>
