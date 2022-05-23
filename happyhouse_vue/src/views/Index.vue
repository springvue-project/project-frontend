<template>
  <div class="wrapper">
    <div class="page-header header-filter" :style="headerStyle">
      <md-card>
        <carousel
          ref="myCarousel"
          :per-page="1"
          loop
          :speed="700"
          autoplay
          :autoplay-timeout="5000"
          :mouse-drag="false"
          navigationEnabled
          navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
          navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
        >
          <slide>
            <div class="carousel-caption">
              <div class="brand" style="margin-bottom:5em">
                <h1>Happy House</h1>
                <h3>SSAFY 7th BUK Java Class 4</h3>
              </div>
            </div>
            <img :src="carousel1" alt="carousel1" class="img" />
          </slide>
          <slide>
            <div class="carousel-caption">
              <h1 style="margin-bottom:3em">
                HouseSearch Service
              </h1>
            </div>
            <img :src="carousel2" alt="carousel2" class="img" />
          </slide>
          <slide>
            <div class="carousel-caption">
              <h1 style="margin-bottom:3em">
                Parking Service
              </h1>
            </div>
            <img :src="carousel3" alt="carousel3" class="img" />
          </slide>
          <slide>
            <div class="carousel-caption">
              <h1 style="margin-bottom:3em">
                Search Arround Service
              </h1>
            </div>
            <img :src="carousel4" alt="carousel4" class="img" />
          </slide>
        </carousel>
      </md-card>
    </div>
    <div class="main main-raised">
      <div class="section section-javascript">
        <div class="container">
          <javascript-components></javascript-components>
        </div>
      </div>
      <div
        id="index_house_search"
        class="bg-dark"
        style="padding-bottom:5em; padding-top:5em"
      >
        <index-house-search />
      </div>
      <div
        id="index_parking_search"
        class="bg-dark"
        style="padding-bottom:5em; padding-top:5em"
      >
        <index-parking-search />
      </div>
      <div
        id="index_house_arround"
        class="bg-dark"
        style="padding-bottom:5em; padding-top:5em"
      >
        <index-house-arround />
      </div>
    </div>
  </div>
</template>

<script>
import JavascriptComponents from "./components/JavascriptComponentsSection";
import IndexHouseSearch from "@/components/Index/IndexHouseSearch.vue";
import IndexParkingSearch from "@/components/Index/IndexParkingSearch.vue";
import IndexHouseArround from "@/components/Index/IndexHouseArround.vue";

export default {
  components: {
    JavascriptComponents,
    IndexHouseSearch,
    IndexParkingSearch,
    IndexHouseArround,
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    // image: {
    //   type: String,
    //   default: require("@/assets/img/HappyApart.jpg"),
    // },
    // leaf2: {
    //   type: String,
    //   default: require("@/assets/img/leaf2.png"),
    // },
  },
  data() {
    return {
      leafShow: false,
      carousel1: require("@/assets/img/HappyApart.jpg"),
      carousel2: require("@/assets/img/HouseSearch.jpg"),
      carousel3: require("@/assets/img/ParkingSearch.jpg"),
      carousel4: require("@/assets/img/HouseArround.jpg"),
    };
  },
  methods: {},
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  },
  methods: {
    prev() {
      this.$refs.myCarousel.prev();
    },
    next() {
      this.$refs.myCarousel.next();
    },
  },
};
</script>
<style lang="scss">
.carousel-caption {
  margin-bottom: 20em;
}
// .img {
//   object-fit: cover;
// }
</style>
