import OriginAxios from 'common/js/axios'

export function login (params) {
  const url = '/login/cellphone'
  return OriginAxios(url, params)
}

export function checkPhone (params) {
  const url = '/cellphone/existence/check'
  return OriginAxios(url, params)
}
