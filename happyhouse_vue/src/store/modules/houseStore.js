import {
  sidoList,
  gugunList,
  houseList,
  dongList,
  houseDealList,
  aroundHouseList,
  SearchNameHouseList,
} from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
    housedeals: [],
    searchType: null,
    isLoading: false,
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST: (state, dongs) => {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_DONG_LIST: (state) => {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },

    SET_HOUSE_LIST: (state, houses) => {
      console.log(houses);
      state.houses = houses;
    },
    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
    SET_HOUSEDEAL_LIST: (state, housedeals) => {
      state.housedeals = housedeals;
    },
    CLEAR_HOUSEDEAL_LIST: (state) => {
      state.housedeals = [];
    },
    CLEAR_HOUSE_LIST: (state) => {
      state.houses = [];
    },
    LOADING_FINISH: (state) => {
      state.isLoading = false;
    },
    LOADING_START: (state) => {
      state.isLoading = true;
    },
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getDong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      dongList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getHouseList: ({ commit }, dongCode) => {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      //   const SERVICE_KEY =
      //     "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
      const params = {
        dong: dongCode,
      };
      houseList(
        params,
        (response) => {
          //console.log(response.data);
          commit("SET_HOUSE_LIST", response.data);
          commit("CLEAR_HOUSEDEAL_LIST");
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getAroundHouseList: ({ commit }, latlng) => {
      commit("LOADING_START");
      aroundHouseList(
        latlng,

        (response) => {
          //console.log(response.data);
          commit("SET_HOUSE_LIST", response.data);
          commit("LOADING_FINISH");
          commit("CLEAR_HOUSEDEAL_LIST");
        },
        (error) => {
          console.log(error);
        },
      );
    },
    // 추가5/25
    getSearchNameHouseList: ({ commit }, param) => {
      const params = {
        dongCode: param.dongCode,
        aptName: param.aptName,
      };
      console.log("dfdf", params);
      SearchNameHouseList(
        params,

        (response) => {
          //console.log(response.data);
          commit("CLEAR_HOUSE_LIST");
          commit("SET_HOUSE_LIST", response.data);

          commit("CLEAR_HOUSEDEAL_LIST");
        },
        (error) => {
          console.log(error);
        },
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      //주석생성
      commit("SET_DETAIL_HOUSE", house);
      const params = {
        aptCode: house.aptCode,
      };
      houseDealList(
        params,
        (response) => {
          //console.log(response.data);
          commit("SET_HOUSEDEAL_LIST", response.data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getHouseDealList: ({ commit }, aptCode) => {
      const params = {
        aptCode: aptCode,
      };
    },
    resetHouseDealList: ({ commit }) => {
      commit("CLEAR_HOUSEDEAL_LIST");
    },

    resetHouseList: ({ commit }) => {
      commit("CLEAR_HOUSE_LIST");
    },
  },
};

export default houseStore;
