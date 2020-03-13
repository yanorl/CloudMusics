<template>
  <div class="creat-playlist-box">
    <pop-ups ref="popUps" text="新建歌单">
      <div class="creat-list-box">
        <div class="creat-list-form">
          <div class="form-group">
            <input type="text" autocomplete="off" required="required" class="form-control" id="creatName" v-model="listName" placeholder="请输入新歌单标题">
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" class="checkbox" v-model="agreeCheck" value="true">
              <span class="books">设置为隐私歌单</span>
            </label>
          </div>
          <div class="btn-tex"><span @click="creatBtn" :class="{'disabled': disabledButton}">创建</span></div>
        </div>
      </div>
    </pop-ups>
  </div>
</template>

<script>
import PopUps from 'base/pop-ups/pop-ups'
import { playlistCreate } from 'api'
import { ERR_OK } from 'api/config'

export default {
  name: 'creat-playlist',
  data () {
    return {
      listName: '',
      disabledButton: false,
      agreeCheck: []
    }
  },
  watch: {
    listName (newData, oldData) {
      if (newData) {
        this.disabledButton = true
      } else {
        this.disabledButton = false
      }
    }
  },
  computed: {
  },
  created () {
  },
  components: {
    PopUps
  },
  methods: {
    createList () {
      this.$refs.popUps.show()
    },
    _playlistCreate (privacy) {
      let that = this
      that.disabledButton = false
      playlistCreate({privacy, name: this.listName, timestamp: (new Date()).valueOf()}).then((res) => {
        if (res.code === ERR_OK) {
          setTimeout(function () {
            that.disabledButton = true
            that.$emit('successCreat', res.id)
            that.$refs.popUps.close()
          }, 1000)
        }
      })
    },
    creatBtn () {
      if (this.disabledButton) {
        if (this.agreeCheck.length > 0) {
          this._playlistCreate(10)
        } else {
          this._playlistCreate()
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .creat-playlist-box
    .creat-list-box
      .creat-list-form
        .form-group
          margin-top: 10px
          input:not([type="checkbox"])
            width: 100%
            height: 30px
            padding: 10px
            box-sizing: border-box
            border: none
            background: #373737
            border-radius: 5px
          .books
            font-size: $font-size-small
        .btn-tex
          margin: 30px 0 10px
          text-align: center
          span
            display: inline-block
            padding: 5px 30px
            background: #8c302e
            border-radius: 30px
            box-sizing: border-box
            &.disabled
              background: $color-main
              color: #fff
</style>
