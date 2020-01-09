import { loadUser, loadSearch, loadRouter } from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  playlist: [],
  sequenceList: [],
  currentIndex: -1,
  playListRouter: loadRouter(),
  user: loadUser(),
  searchStatus: false,
  searchHistory: loadSearch()
}

export default state
