<template>
  <transition name="fade">
    <div class="pop-ups-box" v-show="showPopFlag" @click.stop>
      <div class="pop-ups-wrapper">
        <div class="pop-ups-content">
          <div class="title">
            <span @click="close">X</span>
            <p>{{text}}</p>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'pop-ups',
  props: {
    text: {
      type: String,
      default: '标题'
    }
  },
  data () {
    return {
      showPopFlag: false
    }
  },
  computed: {
  },
  created () {
  },
  components: {
  },
  methods: {
    show () {
      this.showPopFlag = true
    },
    close () {
      this.showPopFlag = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .pop-ups-box
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: rgba(0,0,0,0.7)
    &.fade-enter-active
      animation: fadein 0.3s
      .pop-ups-content
        animation: zoom 0.3s
    .pop-ups-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      .pop-ups-content
        width: 470px
        padding: 20px
        border-radius: 10px
        box-sizing: border-box
        background: #292929
        .title
          position: realtive
          text-align: center
          font-size: $font-size-medium
          margin-bottom: 20px
          span
            color: #565656
            font-size: $font-size-large
            position: absolute
            left: 20px

  @keyframes fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
