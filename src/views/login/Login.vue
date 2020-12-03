<template>
  <div class="login-container">
    <!-- 导航部分 -->
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon name="cross" slot="left" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <!-- 手机号框 -->
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont toutiao-shouji"></i>
      </van-field>
      <!-- 验证码框 -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
          :time="1000 * 5"
          format="ss s"
          v-if="isCountDown"
          @finish="isCountDown=false"/>
          <van-button
          v-else
          native-type="button"
          class="send-sms-btn"
          round size="small"
          type="default"
          @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入登录请求
import { login, sendSms } from '@/api/user'
export default {
  name: 'Login',
  components: {

  },
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 预校验表单
      userFormRules: {
        mobile: [
          { required: true, message: '请填写用户名' },
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '请填写正确的手机号' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请填写正确的验证码' }
        ]
      },
      // 控制倒计时变量
      isCountDown: false
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    //   发送请求
    async onSubmit (values) {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        console.log(data)
        this.$toast.success('登录成功')
        // 跳转到我的页面
        this.$router.push('/my')
      } catch (e) {
        this.$toast.success('登录失败')
        console.log('error', e.toString)
        console.dir(e)
        if (e.response.status === 400) {
          console.log('前台出错')
        } else {
          console.log('后天出错')
        }
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        // 只对手机号做验证
        await this.$refs.loginFormRef.validate('mobile')
      } catch (error) {
        console.log('手机号错误', error)
      }
      // 开启倒计时
      this.isCountDown = true

      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDown = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
