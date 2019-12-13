import * as types from './mutation-types'
import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'

export const searchFlag = function ({commit}, boolean) {
  commit(types.SET_SEARCH_STATUS, boolean)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
