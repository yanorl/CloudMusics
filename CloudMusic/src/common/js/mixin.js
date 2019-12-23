import { mapGetters } from 'vuex'
import { playlist, userRecord } from 'api'
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

export const userRecordMixin = {
  data () {
    return {
      userRecord: [],
      type: 0
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created () {
    this._userRecord()
  },
  methods: {
    _userRecord () {
      userRecord({uid: this.user[0].profile.userId, type: this.type}).then((res) => {
        if (res.code === ERR_OK) {
          this.userRecord = res.allData
          console.log(this.userRecord.length)
        }
      })
    }
  }
}
