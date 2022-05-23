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
