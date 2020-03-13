import { loadUser, loadSearch, loadRouter, loadPlay } from 'common/js/cache'
import { playMode } from 'common/js/config'

const state = {
  singer: {},
  sequenceList: [],
  playlist: [],
  mode: playMode.sequence,
  currentIndex: -1,
  playing: false,
  searchStatus: false,
  watchLike: false,
  watchSongListUpdata: false,
  watchPlayListUpdata: false,
  playListRouter: loadRouter(),
  playHistory: loadPlay(),
  user: loadUser(),
  searchHistory: loadSearch()
}

export default state
