<template>
  <b-row class="my-2">
    <b-col cols="6" class="align-self-center">
      <div
        class="apt-div gnb"
        style="
      cursor:pointer"
      >
        <span @click="selectHouse"
          >{{ house.apartmentName }}
          <md-tooltip md-direction="top">click! 위치 확인</md-tooltip>
        </span>
      </div>
    </b-col>
    <div style="float:right; display:flex; margin:auto">
      <b-col cols="1" class="icon-div">
        <router-link to="#storelist">
          <i
            @click="selectHouse"
            class="store-icon material-icons"
            style="
      cursor:pointer;"
            >home</i
          >
          <md-tooltip md-direction="top">click! 거래 정보 조회</md-tooltip>
        </router-link>
      </b-col>
      <b-col cols="1" class="icon-div align-self-center">
        <router-link to="#storelist">
          <i @click="searchGas" class="store-icon material-icons"
            >local_gas_station</i
          >
          <md-tooltip md-direction="top">click! 주유소 찾기</md-tooltip>
        </router-link>
      </b-col>
      <b-col cols="1" class="icon-div align-self-center">
        <router-link to="#storelist"
          ><i @click="searchEstate" class="store-icon material-icons"
            >real_estate_agent</i
          >
          <md-tooltip md-direction="top"
            >click! 부동산 찾기</md-tooltip
          ></router-link
        >
      </b-col>
      <b-col cols="1" class="icon-div align-self-center">
        <router-link to="#storelist">
          <i @click="searchCafe" class="store-icon material-icons"
            >local_cafe</i
          >
          <md-tooltip md-direction="top"
            >click! 카페 찾기</md-tooltip
          ></router-link
        >
      </b-col>
    </div>
  </b-row>
</template>

<script>
import { mapActions, mapState } from "vuex";

const houseStore = "houseStore";
const storeStore = "storeStore";

export default {
  name: "HouseListItem",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    house: Object,
    houseicon: {
      type: String,
      default: require("@/assets/img/iconhouse.jpg"),
    },
  },
  methods: {
    ...mapActions(storeStore, [
      "getStoreList",
      "cleanStoreList",
      "showStoreList",
    ]),
    ...mapActions(houseStore, ["detailHouse"]),
    selectHouse() {
      //console.log("listRow : ", this.house);
      // this.$store.dispatch("getHouse", this.house);
      //주석생성

      this.detailHouse(this.house);
    },
    searchEstate() {
      const param = {
        lat: this.house.lat,
        lng: this.house.lng,
        codeType: "typeMainCode",
        code: "L",
        distance: 0.5,
      };
      this.showStoreList();
      //this.cleanStoreList();
      this.getStoreList(param);
    },
    searchCafe() {
      const param = {
        lat: this.house.lat,
        lng: this.house.lng,
        codeType: "typeMiddleCode",
        code: "Q12",
        distance: 0.5,
      };
      this.showStoreList();
      //this.cleanStoreList();
      this.getStoreList(param);
    },
    searchGas() {
      const param = {
        lat: this.house.lat,
        lng: this.house.lng,
        codeType: "typeMiddleCode",
        code: "F16",
        distance: 0.5,
      };
      this.showStoreList();
      //this.cleanStoreList();
      this.getStoreList(param);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}

.mouse-over-bgcolor {
  background-color: lightblue;
}
.img-thumbnail {
  border: white;
}
.store-icon {
  color: #858585;
}
.apt-div {
  font-weight: bold;
  border-left: 3px solid #000000;
  padding-left: 15px;
}
</style>
