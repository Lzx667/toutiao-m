<template>
  <div class="login-container">
    <!-- 头部标题 -->
    <van-nav-bar class="page-nav-bar" title="登录" fixed />
    <!-- 登录表单 -->
    <div class="main">
      <van-form @submit="onSubmit" ref="loginForm">
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="userFormRules.mobile"
          type="number"
          maxlength="11"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
          v-model="user.code"
          name="code"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
          type="number"
          maxlength="6"
        >
          <template #left-icon>
            <i class="toutiao toutiao-yanzhengma"></i>
          </template>
          <!-- 下面写法也可 -->
          <!-- <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i> -->
          <template #button>
            <!-- CountDown倒计时组件 format时间格式-->
            <!-- @finish事件 倒计时完成触发 -->

            <van-button
              class="send-sms-btn"
              size="small"
              type="default"
              round
              native-type="button"
              @click="onSendsms"
            >
              <van-count-down
                :time="time"
                v-if="isCountDownShow"
                format="ss s"
                @finish="isCountDownShow = false"
              />
              <span v-else>发送验证码</span>
            </van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
//* 目标:实现基本登录功能
// 1.注册点击登录的事件
// 2.获取表单数据(v-model双向绑定)
// 3.表单验证
// 4.发送请求
// 5.根据结果做下一步处理

// * 导入loginAPI
import { loginAPI, getSmsCodeAPI } from '@/api'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码 246810
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            // 手机号正则校验
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      time: 1000 * 6, // 验证码倒计时
      isCountDownShow: false // 用于倒计时显示和隐藏
    }
  },
  methods: {
    async onSubmit () {
      // 1 获取表单数据
      const user = this.user
      // todo 2.表单验证(待做)

      // loading 转圈圈提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 3.发送请求
      try {
        const res = await loginAPI(user)
        console.log('登录成功', res)
        // *当再次调用this.$toast时 转圈圈就会停止了
        this.$toast.success('登录成功')

        // * 登录成功--将token存入到vuex 仓库 和本地
        this.$store.commit('user/changeUserToken', res.data.data)
      } catch (err) {
        if (err.response.status === 400) {
          // console.log("登录失败", err);
          this.$toast.fail('手机号或验证码错误')
        } else {
          //   console.log("登录失败请稍后重试", err);
          this.$toast.fail('登录失败请稍后重试')
        }
      }
    },
    async onSendsms () {
      // 防止多次触发
      if (this.isCountDownShow) {
        return
      }

      // 1.校验手机号
      try {
        // *通过validate 验证表单，支持传入 name 来验证单个或部分表单项 ,返回一个promise实例
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 2.校验通过显示倒计时
      this.isCountDownShow = true

      // 3.请求发送验证码
      try {
        const res = await getSmsCodeAPI(this.user.mobile)
        console.log(res)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败,关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .main {
    padding-top: 128px;
    .toutiao {
      font-size: 37px;
      margin-right: 20px;
    }
    .send-sms-btn {
      // width: 160px; 让宽度自适应
      height: 50px;
      background-color: #ededed;
      border-radius: 23px;
      font-size: 20px;
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
}
</style>
