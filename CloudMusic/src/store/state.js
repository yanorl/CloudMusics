import { loadUser, loadSearch } from 'common/js/cache'

const state = {
  singer: {},
  user: loadUser(),
  searchStatus: false,
  searchHistory: loadSearch()
}

export default state
