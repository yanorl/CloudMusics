<template>
  <div class="search-result-box">
    <div class="search-result-wrap">
      <!-- 歌手 -->
      <div class="list-type" v-if="searchResult.artists">
        <div class="list-type-title">
          <i class="fa fa-user" aria-hidden="true"></i>
          <span>歌手</span>
        </div>
        <ul>
          <li v-for="item in searchResult.artists" :key="item.id" @click="selectItem(item)">
            <span v-html='changeColor(item.name)'></span>
          </li>
        </ul>
      </div>
      <!-- 单曲 -->
      <div class="list-type" v-if="searchResult.songs">
        <div class="list-type-title">
          <i class="fa fa-music" aria-hidden="true"></i>
          <span>单曲</span>
        </div>
        <ul>
          <li v-for="item in searchResult.songs" :key="item.id">
            <span v-html='changeColor(item.name)'>
            </span>
            <b v-if="item.alias[0]">({{item.alias[0]}})</b>
            <i>-</i>
            <span v-for="list in item.artists" :key="list.id" v-html='changeColor(list.name)'></span>
          </li>
        </ul>
      </div>
      <!-- 专辑 -->
      <div class="list-type" v-if="searchResult.albums">
        <div class="list-type-title">
          <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
          <span>专辑</span>
        </div>
        <ul>
          <li v-for="item in searchResult.albums" :key="item.id">
            <span v-html='changeColor(item.name)'></span>
            <i>-</i>
            <span v-html='changeColor(item.artist.name)'></span>
          </li>
        </ul>
      </div>
      <!--视频 -->
      <div class="list-type" v-if="searchResult.mvs">
        <div class="list-type-title">
          <i class="fa fa-youtube-play" aria-hidden="true"></i>
          <span>视频</span>
        </div>
        <ul>
          <li v-for="item in searchResult.mvs" :key="item.id">
            <span v-html='changeColor(item.name)'></span>
            <i>-</i>
            <span v-html='changeColor(item.artistName)'></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { searchSuggest } from 'api'
import { ERR_OK } from 'api/config'

export default {
  name: 'search-result',
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchResult: []
    }
  },
  watch: {
    query () {
      this._searchSuggest()
    }
  },
  created () {},
  components: {},
  methods: {
    _searchSuggest () {
      this.query = this.query.trim()
      if (this.query !== '') {
        searchSuggest({ keywords: this.query }).then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res)
            this.searchResult = res.result
          }
        })
      }
    },
    selectItem (item) {
      this.$emit('select')
      console.log(2)
    }
  },
  computed: {
    changeColor () {
      return function (value) {
        if (this.query && this.query.length > 0) {
          const result = value.replace(new RegExp(this.query, 'g'), `<p style="display: inline-block; color: #94d9ff;">${this.query}</p>`)
          return result
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-result-wrap
    .list-type
      .list-type-title
        margin: 20px 0 10px 15px
      ul li
        padding: 10px 25px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        cursor: pointer
        &:hover
          background: #444
          color: #fff
        span
          margin: 0 3px
          display: inline-block
        b
          font-size: $font-size-small
          color: #7b7b7b
          margin-left: 3px
</style>
