import { mapGetters, mapMutations } from 'vuex'
import { likeList, likeSong } from 'api'
import { ERR_OK } from 'api/config'
import Axios from 'axios'
import Alert from 'base/alert/alert'

export const likeMixin = {
  data () {
    return {
      likeList: [],
      alertFlow: false,
      alert: {
        icon: 'fa-check-circle',
        text: '已添加到我喜欢的音乐！'
      }
    }
  },
  created () {
    this._likeList()
  },
  computed: {
    ...mapGetters([
      'user',
      'watchLike'
    ])
  },
  watch: {
    watchLike () {
      this._likeList()
    }
  },
  components: {
    Alert
  },
  methods: {
    _likeList () {
      likeList({uid: this.user[0].profile.userId, timestamp: (new Date()).valueOf()}).then((res) => {
        if (res.code === ERR_OK) {
          this.likeList = res.ids
        }
      })
    },
    _likeSong (likeId, Boolean, e) {
      likeSong({id: likeId, like: Boolean, timestamp: (new Date()).valueOf()}).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(Boolean)
          e.target.className = ''
          e.target.className = Boolean ? 'fa color-main fa-heart' : 'fa fa-heart-o'
          this.setWatchLike(!this.watchLike)
          if (!Boolean) {
            this.alert.text = '取消喜欢成功!'
          } else {
            this.alert.text = '已添加到我喜欢的音乐！'
          }
          this.alertFlow = true
          setTimeout(() => {
            this.alertFlow = false
          }, 1500)
        }
      })
    },
    className (id) {
      return this.likeList.includes(id) ? 'color-main fa-heart' : 'fa-heart-o'
    },
    clickLike (item, e) {
      if (item.st === 0) {
        let likeId = item.id
        let Boolean = !this.likeList.includes(likeId)
        this._likeSong(likeId, Boolean, e)
      } else {
        this.alertFlow = true
        this.alert.icon = 'fa-times-circle'
        this.alert.text = '因合作方要求，该资源暂时下架>_<'
        setTimeout(() => {
          this.alertFlow = false
        }, 1500)
      }
    },
    ...mapMutations({
      setWatchLike: 'SET_WATCH_LIKE'
    })
  }
}

export const inquireDistrictMixin = {
  data () {
    return {
      district: []
    }
  },
  methods: {
    inquireDistrict (word) {
      if (word) {
        let url = 'https://restapi.amap.com/v3/config/district?key=6c9102c532d23efc69376d4cde74dcc0&subdistrict=0&extensions=base'
        let that = this
        Axios.get(url, {
          params: {
            keywords: word
          },
          withCredentials: false
        }).then(function (res) {
          if (res.data.districts.length > 0) {
            let key = res.data.districts[0].level
            let name = res.data.districts[0].name
            let obj = {}
            obj[key] = name
            if (that.district.length) {
              that.district = Object.assign(that.district[0], obj)
            } else {
              that.district.push(obj)
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
}

export const playerMixin = {
  computed: {
    ...mapGetters([
      'sequenceList',
      'currentIndex',
      'playing',
      'playHistory',
      'currentSong'
    ])
  },
  methods: {
  }
}
