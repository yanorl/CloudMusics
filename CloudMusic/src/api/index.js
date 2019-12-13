import OriginAxios from 'common/js/axios'

export function login (params) {
  const url = '/login/cellphone'
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
