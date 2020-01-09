export const singer = state => state.singer
export const playing = state => state.playing
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const playListRouter = state => state.playListRouter
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
export const user = state => state.user
export const searchStatus = state => state.searchStatus
export const searchHistory = state => state.searchHistory
