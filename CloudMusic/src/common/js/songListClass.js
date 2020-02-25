import { getPlayUrl, getLyric } from 'api'
import { ERR_OK } from 'api/config'
// import { Base64 } from 'js-base64'

/*
name: 歌曲名
alia: 歌曲别名
id： 歌曲id
playCount: 歌曲播放次数
author：歌曲演唱者
album： 专辑名
duration： 歌曲时长
mvId： 歌曲mv的id
image: 歌曲图片
st: 歌曲是否可播放
source: 来源
*/
export default class songListClass {
  constructor ({ name, alia, id, playCount, author, album, duration, mvId, image, st, source }) {
    this.name = name
    this.alia = alia
    this.id = id
    this.mvId = mvId
    this.playCount = playCount
    this.author = forArray(author)
    this.album = album
    this.duration = duration
    this.image = image
    this.st = st
    this.source = source
  }

  _playUrl () {
    if (this.playUrl) {
      return Promise.resolve(this.playUrl)
    }
    return new Promise((resolve, reject) => {
      getPlayUrl({id: this.id}).then((res) => {
        if (res.code === ERR_OK) {
          this.playUrl = res.data[0].url
          resolve(this.playUrl)
        } else {
          reject(new Error('no playing url'))
        }
      })
    })
  }

  _getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric({id: this.id}).then((res) => {
        if (res.code === ERR_OK) {
          // this.lyric = Base64.decode(res.lrc.lyric)
          this.lyric = res.lrc.lyric
          // console.log(res.lrc.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

function forArray (array) {
  if (Array.isArray(array)) {
    let other = array.map((d, i) => {
      return d.name
    })
    return other.join(' / ')
  } else {
    return array
  }
}
