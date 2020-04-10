<template>
  <div class="search">
    <!-- 头部搜索框 -->
    <!-- v-model：搜索框中双向绑定的值 -->
    <!-- show-action：显示右侧的按钮 -->
    <!-- search：点击回车时触发的事件 -->
    <!-- cancel: 点击取消按钮时触发 -->
    <div v-if="isSearchIng">
      <!-- 联想区域 -->
      <van-cell-group v-if="thinklist.length !== 0">
        <van-cell title="联想区域" />
        <van-cell
          @click="onSearch(item.oldItem)"
          v-for="(item, index) in thinklist"
          :key="index"
          icon="search"
        >
          <template #title>
            <div v-html="item.newItem"></div>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 搜索历史 -->
      <van-cell-group v-else>
        <van-cell title="历史记录">
          <template #default>
            <van-icon @click="clearHistoryData" name="delete" />
          </template>
        </van-cell>
        <van-cell
          v-for="(item, index) in historyList"
          @click="onSearch(item)"
          :key="index"
          icon="browsing-history-o"
          :title="item"
        >
          <template #default>
            <van-icon name="cross" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <searchResult v-else></searchResult>
  </div>
</template>

<script>
// 导入搜索组件
import searchResult from './com/searchresult'
// 导入搜索的方法
import { apiThink } from '../../api/search'
// 导入操作token的方法
import { setLocal, getLocal, removeLocal } from '../../utils/mytoken'
export default {
  props: ['value'],
  data () {
    return {
      // 保存联想结果
      thinklist: [],
      // 判断是否处于正在搜索输入状态
      isSearchIng: true,
      // 全局定时器
      timer: null,
      // 保存搜索历史
      historyList: getLocal('history') || []
    }
  },
  components: {
    searchResult
  },
  methods: {

    // 清空历史数据
    clearHistoryData () {
      // 提示框
      this.$dialog.confirm({
        title: '警告',
        message: '您是否确定删除历史记录'
      }).then(() => {
        // 点击确定时触发的函数
        // 将 historyList 清空
        this.historyList = []
        // 将本地的记录也清除
        removeLocal('history')
      }).catch(() => {
        // 点击取消时触发的函数
        console.log('取消')
      })
    },
    // 删除历史数据
    deleteHistoryData (index) {
      // 删除历史数据
      this.historyList.splice(index, 1)
      // 将数据重新保存到本地
      setLocal('history', this.historyList)
    },

    // 联想方法
    think () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // 判断输入框中的内容是否为空
        if (this.value.trim().length === 0) {
          // 说明内容为空
          // 将联想框中的内容清空
          this.thinklist = []
          // 不再发送请求
          return // 结束后续的代码
        }
        // 发送请求到服务器得到联想的数据
        var res = await apiThink(this.value)
        this.thinklist = res.data.data.options
        console.log(this.thinklist)
        // 遍历 thikList ，将里面的所有元素中的关键字改为红色
        this.thinklist = this.thinklist.map(item => {
          return {
            oldItem: item,
            newItem: item.replace(this.value, `<span style="color: red">${this.value}</span>`)
          }
        })
        console.log(this.thinklist)
      }, 500)
    },

    // 点击回车时触发的事件(如果在手机上：点击完成按钮触发)
    onSearch (value) {
      // 离开正在输入搜索状态
      this.isSearchIng = false
      // 跳转到搜索结果页面：将搜索的关键字传入到目标页面中
      this.$router.push('/search/result?key=' + value)
      // 将搜素结果保存到historyList中
      this.historyList.unshift(value)
      // 利用set去重
      this.historyList = [...new Set(this.historyList)]
      // 将 historyList 保存到 localstorage 中
      setLocal('history', this.historyList)
    },
    // 点击取消按钮时触发
    onCancel () {
      console.log('onCancel')
    }
  }
}
</script>

<style lang="less">
.search {
  margin-top: 46px;
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background-color: #ccc;
  }
}
</style>
