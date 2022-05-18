<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="brand">
            <h1>Happy House</h1>
            <br />
            <br />
            <h3>SSAFY 7th BUK Java Class 4</h3>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section section-javascript">
        <div class="container">
          <b-row>
            <b-col>
              <house-search-bar></house-search-bar>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6" align="left">
              <house-list />
            </b-col>
            <b-col cols="6">
              <house-detail />
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import HouseList from "@/components/house/HouseList.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";

export default {
  name: "HouseView",
  bodyClass: "index-page",
  components: {
    HouseSearchBar,
    HouseList,
    HouseDetail,
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
