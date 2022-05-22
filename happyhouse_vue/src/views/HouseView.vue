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
          <b-row style="margin-top:40px">
            <b-col cols="12">
              <div>
                <h3>House Info</h3>
                <p>지역을 선택하면 행정동별 아파트 정보를 제공합니다.</p>
                <hr class="my-2" />
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <house-search-bar></house-search-bar>
            </b-col>
          </b-row>
          <b-row class="mb-5">
            <b-col
              cols="4"
              align="left"
              style="height:500px; overflow:scroll; overflow-x:hidden"
              class="scroll"
            >
              <house-list />
            </b-col>
            <b-col cols="8">
              <house-map />
            </b-col>
          </b-row>
          <b-row v-if="this.housedeals && this.housedeals.length != 0">
            <b-col
              cols="12"
              style="height:600px; overflow:scroll; overflow-x:hidden"
              class="scroll"
            >
              <house-detail-list />
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
import HouseDetailList from "@/components/house/HouseDetailList.vue";
import HouseMap from "@/components/house/HouseMap.vue";

import { mapState } from "vuex";
const houseStore = "houseStore";
export default {
  name: "HouseView",
  bodyClass: "index-page",
  components: {
    HouseSearchBar,
    HouseDetailList,
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
    ...mapState(houseStore, ["housedeals"]),
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
  padding-bottom: 30px;
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
