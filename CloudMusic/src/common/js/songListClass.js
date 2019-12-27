export default class songListClass {
  constructor ({ name, alia, id, playCount, author, album, duration, mvId }) {
    this.name = name
    this.alia = alia
    this.id = id
    this.mvId = mvId
    this.playCount = playCount
    this.author = author
    this.album = album
    this.duration = duration
  }
}
