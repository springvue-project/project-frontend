<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <b-input-group prepend="아파트이름" class="mt-3">
      <b-form-input
        v-model="aptName"
        placeholder="아파트 이름을 입력하세요.."
        >{{ this.aptName }}</b-form-input
      >
      <b-input-group-append>
        <b-button variant="outline-success" @click="searchName">검색</b-button>
      </b-input-group-append>
    </b-input-group>
    <house-list-item
      v-for="(house, index) in houses"
      :key="index"
      :house="house"
    />
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseListItem from "@/components/house/HouseListItem.vue";
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListItem,
  },
  data() {
    return {
      aptName: "",
    };
  },
  computed: {
    ...mapState(houseStore, ["dongs", "houses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
    //주성생성
  },
  methods: {
    ...mapActions(houseStore, ["getHouseList", "getSearchNameHouseList"]),
    searchName() {
      var aptName = this.aptName;
      var dongCode = sessionStorage.getItem("dongCode");
      var params = {
        dongCode: dongCode,
        aptName: aptName,
      };
      if (!dongCode) {
        alert("주소 검색 시에만 이용 가능합니다!!");
        return;
      }
      //this.resetHouseList();
      if (this.aptName === "") {
        this.getHouseList(dongCode);
      } else {
        //this.resetHouseList();
        this.getSearchNameHouseList(params);
        this.aptName = "";
      }
    },
  },
};
</script>

<style scoped></style>
