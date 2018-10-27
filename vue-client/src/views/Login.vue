<template>
  <div class="na-view-login">
    <div class="login-box">
      <div class="na-logo">
        <img src="https://icarusion.gitee.io/iview/e1cf12c07bf6458992569e67927d767e.png" alt="NideAdmin">
      </div>
      <Form ref="loginForm" :model="formData" :rules="formRule">
        <FormItem prop="username">
          <Input v-model="formData.username" type="text" size="large" placeholder="用户名">
            <Icon slot="prepend" type="ios-person-outline" size="22"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input v-model="formData.password" type="password" size="large" placeholder="密码">
            <Icon slot="prepend" type="ios-lock-outline" size="22"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="captcha">
          <div class="form-item-captcha">
            <Input style="flex: 1;" v-model="formData.captcha" type="text" size="large" placeholder="验证码">
              <Icon slot="prepend" type="ios-code-working" size="22"></Icon>
            </Input>
            <img @click="onChangeCaptcha" class="captcha-img" :src="captcahUrl"/>
          </div>
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" :loading="loading" long @click="onSubmitLogin">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import config from '../config/config'
import helper from '../libs/helper.js'
import store from '../store.js'
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      captcahUrl: '',
      captchaKey: '',
      formData: {
        username: '',
        password: '',
        captcha: ''
      },
      formRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码不得低于 6 位',
            trigger: 'blur'
          }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            type: 'string',
            len: 4,
            message: '验证码必须为 4 位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmitLogin () {
      const valid = await this.$refs['loginForm'].validate()
      if (!valid) {
        return false
      }
      this.loading = true
      try {
        const result = await this.$axios.post(
          config.adminApiBaseUrl + 'login',
          {
            username: this.formData.username,
            password: this.formData.password,
            captcha: this.formData.captcha,
            key: this.captchaKey
          }
        )
        // 设置导航菜单
        store.commit('setMenus', result.menus)

        await helper.setStorage('admin_token', result.token)
        await helper.setStorage('admin_user', result.user)
        await helper.setStorage('menus', result.menus)
        this.$Message.success('登录成功')
        setTimeout(() => {
          this.loading = false
          this.$router.push({ name: 'home_summary' })
        }, 1000)
      } catch (err) {
        this.onChangeCaptcha()
        this.loading = false
        if (err.message) {
          this.$Message.error(err.message)
        }
      }
    },
    onChangeCaptcha () {
      // 更改验证码，并清空输入的验证码
      this.formData.captcha = ''
      this.captchaKey = helper.uuid()
      this.captcahUrl = config.adminApiBaseUrl + 'login/captcha?key=' + this.captchaKey
    }
  },
  mounted () {
    this.captchaKey = helper.uuid()
    this.captcahUrl = config.adminApiBaseUrl + 'login/captcha?key=' + this.captchaKey
  }
}
</script>
