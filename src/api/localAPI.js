import DemoDatas from '@/assets/demo/datas.js'

const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

const requestTime = () => Math.random() * 1000

export const getTestsDatas = async () => {
  await sleep(requestTime())
  return DemoDatas.exercises
}
