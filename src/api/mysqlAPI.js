import request from '@/utiles/request'

// 数据库请求（得自己配啦）
export function getUsersData() {
  return request.get('/mysql/usersdata')
}
export function postUsersData(id, data) {
  console.log(data)
  return request.post(`/mysql/usersdata?id=${id}`, data)
}
export function putUsersData(id, data) {
  return request.put(`/mysql/usersdata?id=${id}`, data)
}
export function deleteUsersData(id) {
  return request.delete(`/mysql/usersdata?id=${id}`)
}
// https://github.com/Daniel-Awe/artificialintelligence.git
