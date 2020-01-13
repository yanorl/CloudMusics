import * as types from './mutation-types'
import { saveUser, exit, saveSearch, deleteSearch, clearSearch, saveRouter, savePlay } from 'common/js/cache'

export const setUser = function ({commit}, user) {
  commit(types.SET_USER, saveUser(user))
}

export const clearUser = function ({commit}) {
  commit(types.SET_USER, exit())
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
}

export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const savePlayListRouter = function ({commit}, router) {
  commit(types.SET_PLAY_LIST_ROUTER, saveRouter(router))
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
