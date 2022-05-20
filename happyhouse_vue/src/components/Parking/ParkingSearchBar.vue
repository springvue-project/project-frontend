<template>
  <div class="form-group form-inline justify-content-center">
    <label class="mr-2" for="sido">시도 : </label>
    <div>
      <b-select
        style="width:100%"
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      ></b-select>
    </div>
    <label class="mr-2 ml-3" for="gugun">구군 : </label>
    <div>
      <b-select
        style="width:100%"
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      ></b-select>
    </div>
    <label class="mr-2 ml-3" for="dong">읍면동 : </label>
    <div>
      <b-select
        style="width:100%"
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
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
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "houses"]),
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
    ...mapActions(houseStore, ["getSido", "getGugun", "getHouseList"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchApt() {
      if (this.gugunCode) this.getHouseList(this.gugunCode);
    },
  },
};
</script>

<style></style>
