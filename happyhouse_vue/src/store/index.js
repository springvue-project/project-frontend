import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import userStore from "@/store/modules/userStore.js";
import qnaStore from "@/store/modules/qnaStore.js";
import houseStore from "@/store/modules/houseStore.js";
import parkingStore from "@/store/modules/parkingStore.js";

import storeStore from "@/store/modules/storeStore.js";

import commentStore from "@/store/modules/commentStore.js";


const store = new Vuex.Store({
  modules: {
    userStore,
    qnaStore,
    houseStore,
    parkingStore,

    storeStore,

    commentStore,

  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      //주석생성
      storage: sessionStorage,
    }),
  ],
});

export default store;
