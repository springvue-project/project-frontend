<template>
  <div class="form-group form-inline justify-content-center">
    <label class="mr-2" for="sido">시/도 : </label>
    <div>
      <b-select
        style="width:100%"
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      ></b-select>
    </div>
    <label class="mr-2 ml-3" for="gugun">구/군 : </label>
    <div>
      <b-select
        style="width:100%"
        v-model="gugunCode"
        :options="guguns"
        @change="dongList"
      ></b-select>
    </div>
    <label class="mr-2 ml-3" for="dong">읍/면/동 : </label>
    <div>
      <b-select
        style="width:100%"
        v-model="dongCode"
        :options="dongs"
        @change="searchParking"
      ></b-select>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const parkingStrore = "parkingStore";

export default {
  name: "ParkingSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
    };
  },
  computed: {
    ...mapState(parkingStrore, ["sidos", "guguns", "dongs", "parkings"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(parkingStrore, [
      "getSido",
      "getGugun",
      "getDong",
      "getParkingList",
    ]),
    ...mapMutations(parkingStrore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
    ]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList() {
      console.log(this.gugunCode);
      this.CLEAR_DONG_LIST();
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    searchParking() {
      console.log(this.dongCode);
      if (this.dongCode) this.getParkingList(this.dongCode);
    },
  },
};
</script>

<style></style>
