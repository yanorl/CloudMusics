<template>
  <div class="sound-bar-box">
    <div class="sound-bar-wrap">
      <div class="sound-bar-content" ref="soundBarContent" @click="soundClick">
        <div class="sound-box" ref="soundBox"></div>
        <div class="sound-btn-box" ref="soundBtnBox" @mousedown="ondragstart">
          <div class="sound-btn" ref="soundBtn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'sound-bar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  computed: {
  },
  created () {
    this.touch = {}
  },
  components: {
  },
  mounted () {
    document.addEventListener('mousemove', this.ondrag)
    document.addEventListener('mouseup', this.ondragend)
    const barHeight = this.$refs.soundBarContent.clientHeight - this.$refs.soundBtn.clientHeight
    const offsetHeight = this.percent * barHeight
    this._offset(offsetHeight)
  },
  methods: {
    soundClick (e) {
      const rect = this.$refs.soundBarContent.getBoundingClientRect()
      const heigth = this.$refs.soundBarContent.clientHeight - this.$refs.soundBtn.clientHeight
      const offsetHeight = Math.min(rect.bottom - e.pageY, heigth)
      this._offset(offsetHeight)
      this._triggerPercent()
    },
    _offset (offsetHeight) {
      this.$refs.soundBox.style.height = `${offsetHeight}px`
      this.$refs.soundBtnBox.style.bottom = `${offsetHeight}px`
    },
    ondragstart (e) {
      // console.log('开始拖拽')
      this.touch.initiated = true
      this.touch.startY = e.pageY
      this.touch.bottom = this.$refs.soundBox.clientHeight
    },
    ondrag (e) {
      // console.log('拖拽中')
      if (!this.touch.initiated) {
        return
      }
      const deltaY = this.touch.startY - e.pageY
      const offsetHeight = Math.min(this.$refs.soundBarContent.clientHeight - this.$refs.soundBtn.clientHeight, Math.max(0, this.touch.bottom + deltaY))
      this._offset(offsetHeight)
    },
    ondragend () {
      // console.log('拖拽结束')
      if (!this.touch.initiated) {
        return
      }
      this.touch.initiated = false
      this._triggerPercent()
    },
    _triggerPercent () {
      const barHeight = this.$refs.soundBarContent.clientHeight - this.$refs.soundBtn.clientHeight
      const percent = this.$refs.soundBox.clientHeight / barHeight
      this.$emit('soundChange', percent)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .sound-bar-box
    .sound-bar-wrap
      position: absolute
      left: 0
      right: 0
      margin: 0 auto
      width: 4px
      height: 100%
      z-index:1
      .sound-bar-content
        position: relative
        background: #404040
        height: 100%
        cursor: pointer
        .sound-box
          position: absolute
          bottom: 0
          width: 100%
          background: $color-main
          z-index: 11
        .sound-btn-box
          position: absolute
          width: 20px
          height: 20px
          left: -10px
          bottom: -9px
          .sound-btn
            width: 10px
            height: 10px
            border-radius: 50%
            background: $color-main
            position: relative
            right: -7px
            bottom: -10px
</style>
