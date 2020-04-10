<template>
  <div class="more">
    <van-popup class="mypop" v-model="show">
      <van-cell-group v-if="!isReport">
        <van-cell @click="dislike" icon="bill-o" border title="不感兴趣" />
        <van-cell @click="isReport=true" icon="info-o" is-link border title="反馈垃圾内容" />
        <van-cell @click="blackList" icon="delete" border title="拉黑作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell @click="isReport=false" icon="arrow-left"></van-cell>
        <van-cell
          @click="report(item.id)"
          v-for="(item, index) in reportType"
          :key="index"
          :title="item.type"
        ></van-cell>
      </van-cell-group>
      {{ artid }} || {{autid}}
    </van-popup>
  </div>
</template>

<script>
// 导入操作文章的接口
import { apiDisLike, apiReport } from '../../../api/article'

// 导入操作用户的接口
import { apiBlackList } from '../../../api/user'
export default {
  // artid：当前要操作的文章的 id
  props: ['artid', 'autid'],
  data () {
    return {
      // 面板显示与隐藏
      show: false,
      // 举报类型
      reportType: [{ id: 1, type: '标题夸张' },
        { id: 2, type: '低俗色情' },
        { id: 3, type: '错别字多' },
        { id: 4, type: '旧闻重复' },
        { id: 5, type: '广告软文' },
        { id: 6, type: '内容不实' },
        { id: 7, type: '涉嫌违法犯罪' },
        { id: 8, type: '侵权' },
        { id: 0, type: '其他问题' }],

      // 控制显示更多界面或举报列表
      isReport: false
    }
  },
  methods: {
    // 隐藏更多操作组件
    closeMore () {
      this.show = false
    },

    // 拉黑作者
    async blackList () {
      try {
        await apiBlackList(this.autid)
        this.$toast.success('操作成功')
        // this.$emit('rushList')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.closeMore()
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
    },

    // 举报
    async report (id) {
      try {
        await apiReport({
          artid: this.artid,
          type: id
        })
        this.$toast.success('举报成功')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      // 关闭面板
      this.closeMore()
      // 切换回"更多操作面板"
      this.isReport = false
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
