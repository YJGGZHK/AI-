import { createStore } from 'vuex'

export default createStore({
  state: {
    isAudioPlaying: false,
    // 题库收藏
    collections: [],
    // 题库做题记录
    testRecording: [
      {
        bank: '原理',
        subbank: [
          {
            text: '知识点',
            title: [
              {
                text: '人工智能',
                subtitle: [
                  {
                    text: '发展历程',
                    category: [],
                    color: '#fff',
                  },
                  {
                    text: '拓展介绍',
                    category: [],
                    color: '#fff',
                  },
                ],
              },
              {
                text: 'AI绘画',
                subtitle: [
                  {
                    text: '入门原理',
                    category: [
                      {
                        text: '绘制过程',
                        color: '#fff',
                      },
                      {
                        text: '使用原理',
                        color: '#fff',
                      },
                    ],
                  },
                  {
                    text: '进阶原理',
                    category: [
                      {
                        text: '提示词',
                        color: '#fff',
                      },
                      {
                        text: '噪声图',
                        color: '#fff',
                      },
                      {
                        text: '前向扩散',
                        color: '#fff',
                      },
                      {
                        text: '后向扩散',
                        color: '#fff',
                      },
                      {
                        text: '采样图',
                        color: '#fff',
                      },
                      {
                        text: 'U-Net模型',
                        color: '#fff',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            text: '测试',
            title: [
              {
                text: '1',
                color: '#fff',
                subtitle: [
                  {
                    text: '',
                    category: [],
                  },
                ],
              },
              {
                text: '2',
                color: '#fff',
                subtitle: [
                  {
                    text: '',
                    category: [],
                  },
                ],
              },
              {
                text: '3',
                color: '#fff',
                subtitle: [
                  {
                    text: '',
                    category: [],
                  },
                ],
              },
              {
                text: '4',
                color: '#fff',
                subtitle: [
                  {
                    text: '',
                    category: [],
                  },
                ],
              },
              {
                text: '5',
                color: '#fff',
                subtitle: [
                  {
                    text: '',
                    category: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        bank: '实操',
        subbank: [
          {
            text: '测试',
            title: [
              {
                text: '1',
                color: '#fff',
                subtitle: [
                  {
                    text: '',
                    category: [],
                  },
                ],
              },
              {
                text: '2',
                color: '#fff',
                subtitle: [
                  {
                    text: '',
                    category: [],
                  },
                ],
              },
              {
                text: '3',
                color: '#fff',
                subtitle: [
                  {
                    text: '',
                    category: [],
                  },
                ],
              },
              {
                text: '4',
                color: '#fff',
                subtitle: [
                  {
                    text: '',
                    category: [],
                  },
                ],
              },
              {
                text: '5',
                color: '#fff',
                subtitle: [
                  {
                    text: '',
                    category: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  mutations: {
    // 全局背景音乐
    setAudioPlaying(state, isPlaying) {
      state.isAudioPlaying = isPlaying
    },
    // 题库收藏
    setCollections(state, data) {
      state.collections = data
    },
    // 本来想做 题库记录 的存储
    // setTestRecording(state, data) {
    //   state.testRecording = data
    // },
  },
  actions: {
    playAudio({ commit }) {
      commit('setAudioPlaying', true)
    },
    stopAudio({ commit }) {
      commit('setAudioPlaying', false)
    },
    async fetchAndSetCollections({ commit }) {
      // 在这里执行异步操作，比如从 API 获取数据
      try {
        const response = await fetch('your_api_endpoint')
        const data = await response.json()

        // 提交 mutation 将数据设置到 collections
        commit('setCollections', data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    // async fetchAndSetData({ commit }) {
    //   try {
    //     const testRecordingResponse = await fetch('testRecording_api_endpoint')
    //     const testRecordingData = await testRecordingResponse.json()

    //     // 提交 mutations 将数据设置到对应的状态中
    //     commit('setTestRecording', testRecordingData)
    //   } catch (error) {
    //     console.error('Error fetching data:', error)
    //   }
    // },
  },
  getters: {
    audioIsPlaying(state) {
      return state.isAudioPlaying
    },
  },
})
