import { loadUser, loadSearch, loadRouter, loadPlay } from 'common/js/cache'

const state = {
  singer: {},
  sequenceList: [],
  playlist: [],
  currentIndex: -1,
  playing: false,
  searchStatus: false,
  watchLike: false,
  playListRouter: loadRouter(),
  playHistory: loadPlay(),
  user: loadUser(),
  searchHistory: loadSearch()
}

export default state
