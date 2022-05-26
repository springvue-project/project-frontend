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
    <b-col cols="6" style="float:right; display:flex; margin:auto">
      <b-col cols="1" class="icon-div">
        <router-link to="#housedetaillist">
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
      <b-col cols="1" class="icon-div align-self-center">
        <a to="#">
          <i
            v-if="myHouses.includes(house.aptCode)"
            @click="removeHouse(house.aptCode)"
            class="store-icon material-icons"
            >favorite</i
          >
          <i
            v-else
            @click="registMyHouse(house.aptCode)"
            class="store-icon material-icons"
            >favorite_border</i
          >
          <md-tooltip v-if="myHouses.includes(house.aptCode)" md-direction="top"
            >clcick! 관심아파트 해제</md-tooltip
          >
          <md-tooltip v-else md-direction="top"
            >clcick! 관심아파트 등록</md-tooltip
          >
        </a>
      </b-col>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import {
  registInterest,
  listInterest,
  deleteInterest,
} from "@/api/interest.js";

const houseStore = "houseStore";
const storeStore = "storeStore";
const userStore = "userStore";

export default {
  name: "HouseListItem",
  data() {
    return {
      isColo1r: false,
    };
  },
  props: {
    house: Object,
    houseicon: {
      type: String,
      default: require("@/assets/img/iconhouse.jpg"),
    },
  },
  computed: {
    ...mapState(userStore, ["userInfo", "myHouses"]),
  },
  wathed: {
    myHouses: function() {},
  },
  mounted() {
    console.log(this.userInfo.userId);
    listInterest(
      this.userInfo.userId,
      ({ data }) => {
        data.forEach((house) => {
          if (this.myHouses.indexOf(house.aptCode) < 0) {
            this.myHouses.push(house.aptCode);
          }
        });
        console.log(this.myHouses);
      },
      (err) => {
        console.log(err);
      },
    );
  },
  methods: {
    ...mapActions(storeStore, [
      "getStoreList",
      "cleanStoreList",
      "showStoreList",
    ]),
    ...mapMutations(userStore, ["ADD_MY_HOUSES", "SET_MY_HOUSES"]),
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
    getMyHouse() {
      listInterest(
        this.userInfo.userId,
        ({ data }) => {
          data.forEach((house) => {
            this.myHouseList.push(house.aptCode);
          });
          console.log(this.myHouses);
        },
        (err) => {
          console.log(err);
        },
      );
    },
    registMyHouse(aptCode) {
      const param = {
        userid: this.userInfo.userId,
        aptCode: aptCode,
      };
      console.log(param.userid);
      registInterest(
        param,
        (data) => {
          console.log(data);
          if (data.status == 204) {
            alert("이미 등록된 아파트 입니다.");
          } else {
            alert("관심아파트로 등록완료");
          }
          listInterest(
            this.userInfo.userId,
            (data) => {
              if (data.status == 200) {
                this.ADD_MY_HOUSES(aptCode);
                console.log(this.myHouses);
              }
            },
            (err) => {
              console.log(err);
            },
          );
        },
        (err) => {
          console.log(err);
        },
      );
    },
    removeHouse(aptCode) {
      console.log(aptCode);
      const param = {
        userid: this.userInfo.userId,
        aptCode: aptCode,
      };
      console.log(param);
      deleteInterest(
        param,
        (data) => {
          console.log("del", data);
          var aptCodes = [];
          data.data.forEach((house) => {
            aptCodes.push(house.aptCode);
          });
          this.SET_MY_HOUSES(aptCodes);
        },
        (err) => {
          console.log(err);
        },
      );
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
