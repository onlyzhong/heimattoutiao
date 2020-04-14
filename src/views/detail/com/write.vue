<template>
    <div class="write">
        <van-search left-icon="edit" background="#4fc08d" v-model="value" show-action @search="onSearch">
            <template #action>
                <div class="mybtn" @click="onSearch">发送</div>
            </template>
        </van-search>
    </div>
</template>

<script>
// 导入操作评论的方法
import { apiAddComment } from '../../../api/comment'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onSearch () {
      // 得到输入框中的内容： this.value
      // 将内容提交到服务器
      var res = await apiAddComment({
        artid: this.$route.query.artid,
        content: this.value
      })
      // 接收服务器返回的数据：有一个 new_obj -> 它是整个服务器返回的评论信息
      // 得到返回的 new_obj
      var obj = res.data.data.new_obj
      // 将返回的评论数据渲染到页面上
      this.$emit('addComment', obj)
      // 清空评论输入框的内容
      this.value = ''
    }
  }
}
</script>

<style lang="less">
.write {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    .mybtn {
        color: #fff;
    }
    .van-search__action:active {
        background-color: #ccc;
    }
}
</style>
