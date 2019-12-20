import OriginAxios from 'common/js/axios'

// 手机登录
export function loginPhone (params) {
  const url = '/login/cellphone'
  return OriginAxios(url, params)
}

// 退出登录
export function signOut (params) {
  const url = '/logout'
  return OriginAxios(url, params)
}

// 获取用户详情
export function userDetail (params) {
  const url = '/user/detail'
  return OriginAxios(url, params)
}

// 获取用户歌单
export function playlist (params) {
  const url = '/user/playlist'
  return OriginAxios(url, params)
}

export function checkPhone (params) {
  const url = '/cellphone/existence/check'
  return OriginAxios(url, params)
}

// banner
export function TypeBanner () {
  const url = '/banner'
  // 0: pc 1: android 2: iphone 3: ipad
  return OriginAxios(url, {type: 2})
}

// 推荐歌单
export function personalized (params) {
  const url = '/personalized'
  return OriginAxios(url, params)
}

// 独家放送
export function privatecontent (params) {
  const url = '/personalized/privatecontent'
  return OriginAxios(url, params)
}

// 最新音乐
export function newsong (params) {
  const url = '/personalized/newsong'
  return OriginAxios(url, params)
}

// 推荐mv
export function recommendMv (params) {
  const url = '/personalized/mv'
  return OriginAxios(url, params)
}

// 推荐电台
export function recommendDj (params) {
  const url = '/dj/recommend'
  return OriginAxios(url, params)
}

// 热门搜索
export function searchHot (params) {
  const url = '/search/hot'
  return OriginAxios(url, params)
}

// 搜索建议 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
export function searchSuggest (params) {
  const url = '/search/suggest'
  return OriginAxios(url, params)
}

// 获取用户动态
export function userEvent (params) {
  const url = '/user/event'
  return OriginAxios(url, params)
}

// 获取用户关注列表
export function userFollows (params) {
  const url = '/user/follows'
  return OriginAxios(url, params)
}

// 获取用户粉丝列表
export function userFolloweds (params) {
  const url = '/user/followeds'
  return OriginAxios(url, params)
}
