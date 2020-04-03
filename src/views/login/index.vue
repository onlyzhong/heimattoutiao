<template>
  <div>
    <!-- 头部标题 -->
    <van-nav-bar title="登录" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        :error-message="msg.phone"
        left-icon="fire-o"
        v-model="obj.phone"
        placeholder="请输入手机号"
      >
        <template #left-icon>
          <i style="font-size: 20px" class="iconfont icon-shoujihao"></i>
        </template>
      </van-field>
      <van-field
        :error-message="msg.code"
        left-icon="smile-o"
        v-model="obj.code"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button class="codeBtn" round color="#ededed" size="small" type="primary">发送验证码</van-button>
        </template>
        <template #left-icon>
          <i class="iconfont icon-lock"></i>
        </template>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="boxbtn">
      <van-button size="large" @click="login" type="info">登录</van-button>
    </div>
    <!-- <i class="iconfont icon-shoujihao"></i>
    <i class="iconfont icon-lock"></i>-->
  </div>
</template>

<script>
// 导入操作用户的方法
import { apiLogin } from '../../api/user'
export default {
  data () {
    return {
      obj: {
        phone: '18611111111',
        code: '246810'
      },
      msg: {
        phone: '',
        code: ''
      }
    }
  },
  methods: {
    async login () {
      if (this.checkData()) {
        let res = await apiLogin({
          mobile: this.obj.phone,
          code: this.obj.code
        })
        window.console.log(res.data.data)
        this.$router.push('/index')
      } else {
        window.console.log('验证不通过')
      }
    },
    checkData () {
      var checkArr = []
      if (this.obj.phone.length !== 11) {
        this.msg.phone = `手机号不符合规范`
        checkArr.push(false)
      } else {
        this.msg.phone = ''
        checkArr.push(true)
      }
      if (this.obj.code.length !== 6) {
        this.msg.code = `验证码长度错误`
        checkArr.push(false)
      } else {
        this.msg.code = ''
        checkArr.push(true)
      }
      if (!checkArr.includes(false)) {
        return true
      } else {
        return false
      }
    }
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
.codeBtn span.van-button__text {
  color: #999;
}
.boxbtn {
  margin: 30px 20px;
}
</style>
