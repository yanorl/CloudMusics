import { durationStamp } from 'common/js/util'
import { getPlayUrl } from 'api'
import { ERR_OK } from 'api/config'
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
*/
export default class songListClass {
  constructor ({ name, alia, id, playCount, author, album, duration, mvId, image, st }) {
    this.name = name
    this.alia = alia
    this.id = id
    this.mvId = mvId
    this.playCount = playCount
    this.author = forArray(author)
    this.album = album
    this.duration = durationStamp(duration)
    this.noFormatDuration = duration
    this.image = image
    this.st = st
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
}

function forArray (array) {
  let other = array.map((d, i) => {
    return d.name
  })
  return other.join(' / ')
}
