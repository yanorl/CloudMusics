<template>
  <div class="search-box">
    <search-wrap @hiddenContent="hiddenContent" @showContent="showContent" @query="onQueryChange"></search-wrap>
    <div class="search-content-wrap" v-show="showFlag">
      <div class="search-content" v-show="!query">
        <div class="hot-key search-list">
          <div class="search-title">热门搜索</div>
          <ul>
            <li v-for="item in hotList" :key="item.first">{{item.first}}</li>
          </ul>
        </div>
        <div class="search-history search-list">
          <div class="search-title">
            <span class="text">搜索历史</span>
            <span class="clear right">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </span>
          </div>
          <ul>
            <li v-for="item in searchHistory" :key="item">
              {{item}} 
              <span @click.stop="deleteItem(item)"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>
          </ul>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <search-result :query="query" @select="saveSearch"></search-result>
      </div>
    </div>
  </div>
</template>

<script>
import { searchHot } from 'api'
import { ERR_OK } from 'api/config'
import SearchWrap from 'base/search-wrap/search-wrap'
import SearchResult from 'components/search/search-result/search-result'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'search',
  data () {
    return {
      hotList: [],
      showFlag: false,
      query: ''
    }
  },
  created () {
    this._searchHot()
  },
  computed: {
    ...mapGetters([
      'searchHistory'
      ])
  },
  components: {
    SearchWrap,
    SearchResult
  },
  methods: {
    _searchHot () {
      searchHot().then((res) => {
        if (res.code === ERR_OK) {
          this.hotList = res.result.hots
        }
      })
    },
    hiddenContent () {
      this.showFlag = false
    },
    showContent () {
      this.showFlag = true
    },
    onQueryChange (query) {
      this.query = query
    },
    deleteItem (item) {
      this.deleteSearchHistory(item)
    },
    saveSearch () {
      console.log(this.query)
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
    .search-box
      float: right
      margin-right: 30px
      .search-content-wrap
        position: absolute
        right: 0
        top: 76px
        z-index: 10
        width: 360px
        height: 100%
        background: #292929
        .search-content
          padding 0 25px
          .search-list
            margin-bottom: 30px
            .search-title
              padding: 15px 0 20px
            ul
              margin-left: -10px
              overflow: hidden
              li
                padding: 5px 20px
                border-radius: 20px
                border: 1px solid #464646
                font-size: $font-size-small
                float: left
                margin: 10px 0 0 10px
                position: relative
                cursor: pointer
                i
                  position: absolute
                  right: -5px
                  top: -5px
                  font-size: $font-size-medium-x
                  opacity: 0
                &:hover
                  background: #434141
                  color: #fff
                  i
                    opacity: 1
</style>
