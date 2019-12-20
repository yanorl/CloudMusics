import { mapGetters } from 'vuex'
import { playlist } from 'api'
import { ERR_OK } from 'api/config'

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
        let defaultAvatar = item.creator.defaultAvatar
        if (defaultAvatar) {
          this.createdListres.push(item)
        } else {
          this.otherLists.push(item)
        }
      })
    }
  }
}
