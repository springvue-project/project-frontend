import { storeList } from "@/api/store.js";

const storeStore = {
  namespaced: true,
  state: {
    type: null,
    code: null,
    stores: [],
    store: null,
  },

  getters: {},

  mutations: {
    SET_STORE_LIST: (state, stores) => {
      state.stores = stores;
    },
    SET_DETAIL_STORE: (state, store) => {
      state.store = store;
    },
    SET_STORE_TYPE: (state, type) => {
      state.type = type;
    },
    SET_STORE_CODE: (state, code) => {
      state.code = code;
    },
    CLEAR_STORE_LIST: (state) => {
      state.stores = [];
    },
    CLEAR_DETAIL_STORE: (state) => {
      state.store = null;
    },
  },

  actions: {
    getStoreList: ({ commit }, param) => {
      var storeType = "";
      if (param.code == "L") storeType = "부동산";
      else if (param.code == "Q12") storeType = "카페";
      else if (param.code == "F16") storeType = "주유소/충전소";

      storeList(
        param,
        (response) => {
          console.log(response.data);
          commit("SET_STORE_LIST", response.data);
          commit("SET_STORE_CODE", param.code);
          commit("SET_STORE_TYPE", storeType);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    cleanStoreList: ({ commit }) => {
      commit("CLEAR_STORE_LIST");
    },
    getStoreDetail: ({ commit }, store) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_STORE", store);
    },
  },
};

export default storeStore;
