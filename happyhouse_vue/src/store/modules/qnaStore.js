const qnaStore = {
  namespaced: true,
  state: {
    qnas: [],
    qna: null,
  },
  getters: {},
  mutations: {
    SET_QNA_LIST: (state, qnas) => {
      //   console.log(houses);
      state.qnas = qnas;
    },
  },
  actions: {},
};

export default qnaStore;
