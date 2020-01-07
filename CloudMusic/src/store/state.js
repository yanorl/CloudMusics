import { loadUser, loadSearch } from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  playlist: [],
  sequenceList: [],
  currentIndex: -1,
  user: loadUser(),
  searchStatus: false,
  searchHistory: loadSearch()
}

export default state
