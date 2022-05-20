<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <h3 class="underline-steelblue">
          Parking Service
        </h3>
      </div>
    </div>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <b-row>
            <b-col>
              <parking-search-bar></parking-search-bar>
            </b-col>
          </b-row>
          <parking-list />
          <!-- 맵띄우기 -->
          <!-- <house-map /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ParkingSearchBar from "@/components/Parking/ParkingSearchBar.vue";
import ParkingList from "@/components/Parking/ParkingList.vue";
export default {
  components: {
    ParkingSearchBar,
    ParkingList,
  },
  bodyClass: "login-page",
  data() {
    return {};
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/HappyApart.jpg"),
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

<style lang="css"></style>
