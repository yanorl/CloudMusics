import { loadSearch } from 'common/js/cache'

const state = {
  singer: {},
  searchStatus: false,
  searchHistory: loadSearch()
}

export default state
