<template>
  <div class="aside-wrap">
    <div class="aside-top">
      <div class="avatar-box">
        <span class="avatar-img">
          <i class="fa fa-user-o" aria-hidden="true"></i>
        </span>
        <span class="avatar-name">
          未登录
        </span>
        <i class="fa fa-caret-right" aria-hidden="true"></i>
      </div>
    </div>
    <div class="aside-list">
      <dl>
        <dd class="current">
          <span class="icon">
            <i class="fa fa-music" aria-hidden="true"></i>
          </span>
          发现音乐
        </dd>
        <dd>
          <span class="icon">
            <i class="fa fa-forumbee" aria-hidden="true"></i>
          </span>
          私人FM
        </dd>
        <dd>
          <span class="icon">
            <i class="fa fa-stop-circle-o" aria-hidden="true"></i>
          </span>
          视频
        </dd>
        <dd>
          <span class="icon">
            <i class="fa fa-users" aria-hidden="true"></i>
          </span>
          朋友
        </dd>
      </dl>
      <dl>
        <dt>
          创建的歌单
          <span class="right">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </span>
        </dt>
        <dd>
          <span class="icon">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
          </span>
          我喜欢的音乐
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
    .aside-wrap
      padding: 0 14px 0 0
      box-sizing: border-box
      background: $asid-background
      height: 100%
      .aside-top
        height: 77px
        line-height: 77px
        padding-left: 20px
        .avatar-box
          .avatar-img
            i
              font-size: $font-size-i-big
              display: inline-block
              vertical-align: middle
          .avatar-name
            margin: 0 10px 0 22px
      .aside-list
        height: 100%
        dl
          margin-bottom: 15px
          dt,dd
            padding-left: 25px
          dt
            color: $color-i
            height: 35px
            line-height: 35px
          dd
            color: #c4c4c4
            height: 46px
            line-height: 46px
            &.current
              background: #141414
              color: $color-main
              i
                color: $color-main
            i
              color: $color-i
              margin-right: 10px
</style>
