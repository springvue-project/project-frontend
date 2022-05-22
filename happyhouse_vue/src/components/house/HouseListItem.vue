<template>
  <b-row
    class="my-2"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col cols="7" class="align-self-center">
      <div class="apt-div">
        <span @click="selectHouse">{{ house.apartmentName }}</span>
      </div>
    </b-col>
    <b-col cols="1" class="icon-div align-self-center">
      <i @click="selectHouse" class="store-icon material-icons">home</i>
    </b-col>
    <b-col cols="1" class="icon-div align-self-center">
      <i @click="searchGas" class="store-icon material-icons"
        >local_gas_station</i
      >
    </b-col>
    <b-col cols="1" class="icon-div align-self-center">
      <i @click="searchEstate" class="store-icon material-icons"
        >real_estate_agent</i
      >
    </b-col>
    <b-col cols="1" class="icon-div align-self-center">
      <i @click="searchCafe" class="store-icon material-icons">local_cafe</i>
    </b-col>
    <b-col cols="1" class="icon-div align-self-center">
      <i class="store-icon material-icons">favorite_border</i>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";

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
    ...mapActions(storeStore, ["getStoreList", "cleanStoreList"]),
    ...mapActions(houseStore, ["detailHouse"]),
    selectHouse() {
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
      this.cleanStoreList();
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
      this.cleanStoreList();
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
      this.cleanStoreList();
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
