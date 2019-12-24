import { mapGetters } from 'vuex'
import { playlist } from 'api'
import { ERR_OK } from 'api/config'
import Axios from 'axios'

export const songListMixin = {
  data () {
    return {
      createdListres: [],
      otherLists: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created () {
    if (this.user.length) {
      this._playlist()
    }
  },
  methods: {
    _playlist () {
      playlist({uid: this.user[0].profile.userId}).then((res) => {
        if (res.code === ERR_OK) {
          this._normalizeList(res.playlist)
        }
      })
    },
    _normalizeList (list) {
      list.forEach((item) => {
        let subscribed = item.subscribed
        if (!subscribed) {
          this.createdListres.push(item)
        } else {
          this.otherLists.push(item)
        }
      })
    }
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
      let url = 'https://restapi.amap.com/v3/config/district?key=6c9102c532d23efc69376d4cde74dcc0&subdistrict=0&extensions=base'
      let that = this
      Axios.get(url, {
        params: {
          keywords: word
        },
        withCredentials: false
      }).then(function (res) {
        let key = res.data.districts[0].level
        let name = res.data.districts[0].name
        let obj = {}
        obj[key] = name
        if (that.district.length) {
          that.district = Object.assign(that.district[0], obj)
        } else {
          that.district.push(obj)
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
