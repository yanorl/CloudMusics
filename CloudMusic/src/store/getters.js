export const singer = state => state.singer
export const sequenceList = state => state.sequenceList
export const playlist = state => state.playlist
export const currentIndex = state => state.currentIndex
export const mode = state => state.mode
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
export const playing = state => state.playing
export const searchStatus = state => state.searchStatus
export const watchLike = state => state.watchLike
export const watchPlayListUpdata = state => state.watchPlayListUpdata
export const watchSongListUpdata = state => state.watchSongListUpdata
export const playListRouter = state => state.playListRouter
export const playHistory = state => state.playHistory
export const user = state => state.user
export const searchHistory = state => state.searchHistory
