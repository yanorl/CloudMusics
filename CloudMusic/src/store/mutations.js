import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_SEARCH_STATUS] (state, boolean) {
    state.searchStatus = boolean
  },
  [types.SET_WATCH_LIKE] (state, boolean) {
    state.watchLike = boolean
  },
  [types.SET_PLAY_LIST_ROUTER] (state, router) {
    state.playListRouter = router
  },
  [types.SET_PLAY_HISTORY] (state, play) {
    state.playHistory = play
  },
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  }
}

export default mutations
