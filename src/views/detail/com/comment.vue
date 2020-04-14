<template>
    <van-cell>
        <template #title>
            <div class="comment">
                <div class="com-img">
                    <img :src="item.aut_photo" alt="">
                </div>
                <div class="com-msg">
                    <div class="com-name">{{ item.aut_name }}</div>
                    <div class="com-content">{{ item.content }}</div>
                    <div class="com-btn">
                        <span>{{ item.pubdate | timeFilter }}</span>
                        <span v-if="isReplay===false" @click="openrepaly" class="reply">回复 {{ item.reply_count }}</span>
                    </div>
                </div>
                <div class="like">
                    <van-icon name="like" /> {{ item.like_count }}
                </div>
            </div>
        </template>
    </van-cell>
</template>

<script>
// 导入 bus
import bus from '../../../utils/bus'
export default {
  // 接收传入的参数
  // item：传入的评论数据对象
  // isReplay：判断是否是在回复面板中使用的这个属性
  props: ['item', 'isReplay'],
  methods: {
    openrepaly () {
      // 打开回复组件
      this.$emit('changeShow', true)
      // 将参数传入到 bus 中
      bus.$emit('passItem', this.item)
    }
  }
}
</script>

<style lang="less">
.comment {
    display: flex;
    .com-img {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
    .com-msg {
        flex: 1;
        .com-content {
            margin: 10px 0px 10px 10px;
        }
        .com-btn {
            .reply {
                background: #ccc;
                padding: 3px 5px;
                border-radius: 10px;
                margin-left: 10px;
            }
        }
    }
}
</style>
