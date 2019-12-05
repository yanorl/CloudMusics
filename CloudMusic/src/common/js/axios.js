import Axios from 'axios'
import { baseURL } from 'api/config'

export default function OriginAxios (url, data) {
  url = baseURL + url
  return new Promise((resolve, reject) => {
    Axios(url, {params: data})
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
