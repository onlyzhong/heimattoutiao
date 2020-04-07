<template>
  <div>
    <van-popup v-model="show" position="bottom" :style="{ height: '90%' }">
      <!-- 我的频道 -->
      <!-- 我的频道 - 标题 -->
      <van-cell title="我的频道">
        <template #default>
          <van-button
            v-if="isEdit===false"
            round
            plain
            size="mini"
            type="danger"
            @click="isEdit=true"
          >编辑</van-button>
          <van-button
            v-if="isEdit===true"
            round
            plain
            size="mini"
            type="danger"
            @click="isEdit=false"
          >完成</van-button>
        </template>
      </van-cell>
      <!-- 我的频道 - 列表 -->
      <van-grid>
        <van-grid-item @click="changeChannel(index)" class="myitem" v-for="(item, index) in channelsList" :key="index">
          <template #text>
            <span :class="{ active: index === active }">{{ item.name }}</span>
            <van-icon @click.stop="deleteChannel(index)" v-if="isEdit" class="cross" name="clear" />
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 频道推荐 -->
      <!-- 频道推荐 - 标题 -->
      <van-cell title="频道推荐"></van-cell>
      <!-- 频道推荐 - 列表 -->
      <van-grid>
        <van-grid-item
          @click="addChannel(item)"
          :text="item.name"
          v-for="(item, index) in tuijianChannels"
          :key="index"
        />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
// 导入操作频道的方法
import { apiGetAllChannels, apiResetChannels } from '../../../api/channle'
import { setLocal } from '../../../utils/mytoken'
export default {
  // 接收父组件传入的数据
  props: ['channelsList', 'active'],
  data () {
    return {
      // 控制面板的显示与隐藏
      show: false,
      // 是否处于编辑状态
      isEdit: false,
      // 用以保存所有频道数据
      allChannelsList: []
    }
  },
  methods: {
    // 获取所有频道
    async getAllChannels () {
      var res = await apiGetAllChannels()
      // 保存
      this.allChannelsList = res.data.data.channels
      window.console.log(this.allChannelsList)
    },

    // 改变显示的频道
    changeChannel (index) {
      // 将数据传回到父组件，在父组件进行修改
      // this.$emit('changeactive', index)
      // 将修改的事件名作出一些调整
      this.$emit('update:active', index)
    },
    // 添加频道
    async addChannel (item) {
      // 将被点击的元素添加到我的频道中
      // this.channelsList.push(item)
      this.$emit('addChannelsList', item)
      // 判断是否登录
      var token = this.$store.state.userInfo.token
      if (!token) {
        setLocal('channels', this.channelsList)
      } else {
        var channels = this.channelsList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        try {
          await apiResetChannels(channels)
        } catch {
          this.$toast('添加失败')
        }
      }
    },

    // 删除频道
    async deleteChannel (index) {
      // 将index对应的频道删除
      this.channelsList.splice(index, 1)
      // 和添加类似
      // 判断是否登录
      var token = this.$store.state.userInfo.token
      if (!token) {
        setLocal('channels', this.channelsList)
      } else {
        var channels = this.channelsList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        try {
          await apiResetChannels(channels)
        } catch {
          this.$toast('添加失败')
        }
      }
    }
  },
  mounted () {
    // 获取所有的频道数据
    this.getAllChannels()
  },
  computed: {
    // 计算属性定义一个推荐频道数据
    tuijianChannels: function () {
      var ids = this.channelsList.map(item => {
        return item.id
      })
      var newArr = this.allChannelsList.filter(item => {
        return !ids.includes(item.id)
      })
      return newArr
    }
  }
}
</script>

<style lang="less">
.myitem {
  position: relative;
  .cross {
    position: absolute;
    top: 5px;
    right: 10px;
  }
  .van-grid-item__content.van-grid-item__content--center.van-hairline {
    color: #646566;
    font-size: 12px;
  }
  .active {
    color: red;
  }
}
</style>
