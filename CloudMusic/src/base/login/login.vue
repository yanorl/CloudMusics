<template>
  <div class="login-box">
    <div class="personal-form">
      <div class="login-wrap">
        <div class="form-content">
          <div class="form-group">
            <label for="firstLabel">
              <span class="icon-form">
                <i class="fa fa-phone-square" aria-hidden="true"></i>
              </span>
            </label>
            <input type="tel" class="form-control" id="firstLabel" v-model="formTel" :placeholder="placeholder.tel">
          </div>
          <div class="form-group">
            <div class="form-group-left">
              <label for="secondLabel">
                <span class="icon-form">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </label>
              <input type="password" class="form-control" id="secondLabel" v-model="formPassword" :placeholder="placeholder.password">
            </div>
            <span class="reset-password">
              重设密码
            </span>
          </div>
        </div>
        <button type="submit" class="btn" @click="login">登陆</button>
        <div class="btn-tex"><span @click="registeredPage">注册</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginPhone } from 'api'
import { ERR_OK } from 'api/config'
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      formTel: '',
      formPassword: '',
      placeholder: {
        tel: '请输入手机号',
        password: '请输入密码'
      }
    }
  },
  created () {
  },
  components: {
  },
  methods: {
    login () {
      loginPhone({phone: this.formTel, password: this.formPassword}).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.setUser(res)
          this.hide()
          // this.hotList = res.result.hots
        }
      })
    },
    ...mapActions([
      'setUser'
    ]),
    hide () {
      this.$emit('hide')
    },
    registeredPage () {
      this.$emit('registeredPage')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .personal-form
    .btn
      width: 100%
      padding: 10px
      background: $color-main
      border-radius: 5px
      color: #fff
    .btn-tex
      margin: 15px 0
      text-align: center
      color: #4f4f4f
      span
        cursor: pointer
    .form-content
      margin: 40px 0
      border: 1px solid #e1e1e1
      border-radius: 5px
      .form-group
        border-bottom: 1px solid #e1e1e1
        padding: 13px 10px
        position: relative
        display: flex
        .form-group-left
          flex: 1
        .reset-password
          cursor: pointer
        input
          width: 100%
          height: 20px
          padding:0 10px 0 25px
          box-sizing: border-box
          border: none
          font-weight: bold
          color: #000
        label
          position: absolute
          .icon-form
            font-size: $font-size-medium-x
        &:last-child
          border-bottom: none
</style>
