<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <h3 class="underline-steelblue">
          Search Around
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
            <b-col cols="12">
              <div>
                <h3>Search Around</h3>
                <p>
                  지도를 선택하면 마커가 표시됩니다.<br />
                  지도에 표시한 마커 중심으로 아파트 정보를 제공합니다.
                </p>
                <hr class="my-2" />
              </div>
            </b-col>
          </b-row>
          <b-row style="margin-top:40px">
            <b-col cols="12">
              <around-marking-map></around-marking-map>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AroundMarkingMap from "@/components/Around/AroundMarkingMap.vue";
export default {
  components: {
    AroundMarkingMap,
  },

  data() {
    return {};
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/HouseArround.jpg"),
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

<style lang="css" scoped></style>
