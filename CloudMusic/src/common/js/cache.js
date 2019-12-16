import storage from 'good-storage'

const USER_KEY = '_user_'
const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 15

function inseartArray (arr, val, maxLen) {
  const index = arr.findIndex((item) => {
    return item === val
  })
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFormArray (arr, val) {
  const index = arr.findIndex((item) => {
    return item === val
  })
  if (index > -1) {
    arr.splice(index, 1)
  }
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
  inseartArray(searches, query, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  console.log(searches)
  return searches
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFormArray(searches, query)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}
