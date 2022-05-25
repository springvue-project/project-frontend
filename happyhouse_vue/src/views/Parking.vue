<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <h3 class="underline-steelblue">
          Parking Service
        </h3>
        <a href="#main"
          ><md-button class="btn-down md-just-icon md-round"
            ><md-icon>keyboard_double_arrow_down</md-icon></md-button
          ></a
        >
      </div>
    </div>
    <div class="main main-raised" id="main">
      <div class="section profile-content">
        <div class="container">
          <b-row>
            <b-col cols="12" class="mt-2">
              <h3>Parking Info</h3>
              <p>동별 주차장 정보를 제공합니다.</p>
              <hr class="my-2" />
            </b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col>
              <parking-search-bar></parking-search-bar>
            </b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col
              cols="5"
              style="height:500px; overflow:scroll; overflow-x:hidden"
              class="scroll mt-4"
            >
              <parking-list />
            </b-col>
            <b-col cols="7">
              <parking-map />
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ParkingSearchBar from "@/components/Parking/ParkingSearchBar.vue";
import ParkingList from "@/components/Parking/ParkingList.vue";
import ParkingMap from "@/components/Parking/ParkingMap.vue";

export default {
  components: {
    ParkingSearchBar,
    ParkingList,
    ParkingMap,
  },
  bodyClass: "index-page",
  data() {
    return {};
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/ParkingSearch.jpg"),
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
};
</script>

<style lang="css">
.underline-steelblue {
  color: azure;
  font-size: 5rem;
  font-weight: 600;
  display: inline-block;
  position: relative;
  line-height: 1.15em;
  text-shadow: 0px 15px 102.86px rgb(0 0 0 / 70%),
    0px 15px 40.02px rgb(0 0 0 / 21%);
  text-align: center;
}
.img-bg-white {
  background-color: white;
}
</style>
