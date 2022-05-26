<template>
  <div class="wrapper">
    <div id="navigation">
      <div class="navigation-example" :style="bgImage">
        <div class="md-layout">
          <div class="md-layout-item">
            <div class="brand">
              <h1 style="margin-top:0.5em; text-shadow: 2px 2px 2px black;">
                Search by Marker
              </h1>
              <div style="text-align:center; margin-top: 8em">
                <h4 style="text-shadow: 2px 2px 2px black;">
                  선호하는 위치를 마커로 표시하고 중심지 주변 아파트를 조회할 수
                  있습니다.
                </h4>
                <router-link to="/aroundapt">
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
      default: require("@/assets/img/HouseArround.jpg"),
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
