import storage from 'good-storage'

const USER_KEY = '_user_'

const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 15

const ROUTER_KEY = '_router_'

const PLAY_KEY = '_play_'
const PLAY_MAX_LENGTH = 100

// function inseartArray (arr, val, maxLen) {
//   const index = arr.findIndex((item) => {
//     return item === val
//   })
//   if (index === 0) {
//     return
//   }
//   if (index > 0) {
//     arr.splice(index, 1)
//   }
//   arr.unshift(val)
//   if (maxLen && arr.length > maxLen) {
//     arr.pop()
//   }
// }

// function deleteFormArray (arr, val) {
//   const index = arr.findIndex((item) => {
//     return item === val
//   })
//   if (index > -1) {
//     arr.splice(index, 1)
//   }
// }

function inseartArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  // console.log(index)
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFormArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// *********************播放记录功能*********************************
export function savePlay (song) {
  let songs = storage.get(PLAY_KEY, [])
  inseartArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay () {
  return storage.get(PLAY_KEY, [])
}

export function clearPlay () {
  storage.remove(PLAY_KEY)
  return []
}
// *********************router功能*********************************
export function saveRouter (router) {
  storage.set(ROUTER_KEY, router)
  return router
}

export function loadRouter () {
  return storage.get(ROUTER_KEY, [])
}
// *********************用户功能*********************************
export function saveUser (user) {
  storage.set(USER_KEY, user)
  return user
}

export function loadUser () {
  return storage.get(USER_KEY, [])
}

export function exit () {
  storage.remove(USER_KEY)
  return []
}
// *********************搜索功能*********************************
export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  inseartArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  console.log(searches)
  return searches
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFormArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}
