<template>
  <div class="wrapper">
    <div id="navigation">
      <div class="navigation-example" :style="bgImage">
        <div class="md-layout">
          <div class="md-layout-item">
            <div class="brand">
              <h1 style="margin-top:0.5em">Find Parking</h1>
              <div style="text-align:center; margin-top: 8em">
                <h4>
                  설정한 지역의 중심지를 기준으로 주변 주차장 목록을 조회할 수
                  있습니다!
                </h4>
                <router-link to="/parking">
                  <b-button variant="primary" style="margin-top:1em"
                    >바로가기</b-button
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    image: {
      type: String,
      default: require("@/assets/img/ParkingSearch.jpg"),
    },
  },
  computed: {
    bgImage() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
  },
};
</script>

<style lang="css"></style>
