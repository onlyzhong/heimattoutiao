<template>
  <div class="more">
    <van-popup class="mypop" v-model="show">
      <van-cell-group>
        <van-cell @click="dislike" icon="bill-o" border title="不感兴趣" />
        <van-cell icon="info-o" is-link border title="反馈垃圾内容" />
        <van-cell icon="delete" border title="拉黑作者" />
      </van-cell-group>
      {{ artid }}
    </van-popup>
  </div>
</template>

<script>
// 导入操作文章的接口
import { apiDisLike } from '../../../api/article'

export default {
  // artid：当前要操作的文章的 id
  props: ['artid'],
  data () {
    return {
      // 面板显示与隐藏
      show: false
    }
  },
  methods: {
    // 隐藏更多操作组件
    closeMore () {
      this.show = false
    },

    // 不感兴趣
    async dislike () {
      // 1.0 将 artid 对应的文章数据从页面上删除：
      // 问题：不感兴趣是在 more 页面中执行的，但是我们却要在 首页中删除数据
      // 首页与 more 页面之间是父子关系：将 artId 传回到父组件中，在父组件中进行删除
      this.$emit('delArt', this.artid)
      // 2.0 将 artid 对应的文章数据提交到服务器标识为不喜欢
      try {
        var res = await apiDisLike(this.artid)
        this.closeMore()
      } catch {
        this.$toast('操作失败')
      }
      console.log(res)
    }
  }
}
</script>

<style lang="less">
.more {
  .mypop {
    width: 85%;
    border-radius: 5px;
  }
}
</style>
