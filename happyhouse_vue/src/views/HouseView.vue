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
              <house-search-bar></house-search-bar>
            </b-col>
          </b-row>
          <b-row class="mb-5">
            <b-col
              cols="4"
              align="left"
              style="height:500px; overflow:scroll; overflow-x:hidden"
            >
              <house-list />
            </b-col>
            <b-col cols="8">
              <!-- <house-detail />0 -->
              <house-map />
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
import HouseMap from "@/components/house/HouseMap.vue";

export default {
  name: "HouseView",
  bodyClass: "index-page",
  components: {
    HouseSearchBar,
    // HouseDetail,
    HouseList,
    HouseMap,
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/HappyApart.jpg"),
    },
  },
  data() {
    return {};
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
<style lang="scss" scoped>
.brand h3 {
  color: white;
  font-size: 5.5rem;
  font-weight: 600;
  display: inline-block;
  position: relative;
  line-height: 1.15em;
  text-shadow: 0px 15px 102.86px rgb(0 0 0 / 70%),
    0px 15px 40.02px rgb(0 0 0 / 21%);
}
.section {
  padding: 0;
}
.img-bg-white {
  background-color: white;
}
.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
